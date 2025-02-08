import { ShippingService } from "@/lib/services/shipping.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { rateId } = await request.json();

    if (!rateId) {
      return NextResponse.json(
        { error: "Rate ID is required" },
        { status: 400 }
      );
    }

    const transaction = await ShippingService.createLabel(rateId);
    return NextResponse.json(transaction);
  } catch (error: Error | unknown) {
    console.error("Shipping label creation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create shipping label" },
      { status: 500 }
    );
  }
}
