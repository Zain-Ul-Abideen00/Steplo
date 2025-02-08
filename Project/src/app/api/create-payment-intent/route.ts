// disable eslint for this file
/* eslint-disable */

import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, items, userId } = body;

    console.log("Request payload:", {
      amount,
      itemsCount: items?.length,
      userId,
      stripeKey: process.env.STRIPE_SECRET_KEY?.slice(0, 8) + "...",
    });

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Invalid amount", received: amount },
        { status: 400 }
      );
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "pkr",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          userId: userId || "guest",
          orderItems: JSON.stringify(items || []),
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (stripeError: any) {
      console.error("Stripe API error:", {
        message: stripeError.message,
        type: stripeError.type,
        code: stripeError.code,
      });

      return NextResponse.json({ error: stripeError.message }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
