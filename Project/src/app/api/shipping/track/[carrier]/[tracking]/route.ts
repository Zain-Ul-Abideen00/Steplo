import { NextRequest, NextResponse } from "next/server";
import { ShippingService } from "@/lib/services/shipping.service";

type RouteContext = {
  params: Promise<{
    carrier: string;
    tracking: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const tracking = await ShippingService.trackShipment(
      (await context.params).carrier,
      (await context.params).tracking
    );
    return NextResponse.json(tracking);
  } catch (error: unknown) {
    console.error("Tracking fetch error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch tracking",
      },
      { status: 500 }
    );
  }
}
