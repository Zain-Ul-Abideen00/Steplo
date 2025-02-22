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
    const { amount, items, userId, email, metadata } = body;

    console.log("Request payload:", {
      amount,
      itemsCount: items?.length,
      userId,
      email,
      stripeKey: process.env.STRIPE_SECRET_KEY?.slice(0, 8) + "...",
    });

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Invalid amount", received: amount },
        { status: 400 }
      );
    }

    // Validate email for guest users
    if (!userId && !email) {
      return NextResponse.json(
        { error: "Email is required for guest checkout" },
        { status: 400 }
      );
    }

    try {
      const paymentIntentData: Stripe.PaymentIntentCreateParams = {
        amount,
        currency: "pkr",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          userId: userId || "guest",
          orderItems: JSON.stringify(items || []),
          email: email || undefined,
          ...metadata,
        },
      };

      // Add receipt email for guest users
      if (!userId && email) {
        paymentIntentData.receipt_email = email;
      }

      const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

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

      // Return more specific error messages
      const errorMessage = stripeError.message || "Payment processing failed";
      const statusCode = stripeError.statusCode || 400;

      return NextResponse.json(
        {
          error: errorMessage,
          code: stripeError.code,
          type: stripeError.type
        },
        { status: statusCode }
      );
    }
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
