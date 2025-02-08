import { NextResponse } from "next/server";
import { ShippingService } from "@/lib/services/shipping.service";

interface CartItem {
  weight: number;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    const { address, items } = await req.json();
    console.log("Calculating rates for:", { address, items });

    // Create parcel from cart items
    const parcel = {
      length: "20",
      width: "15",
      height: "10",
      weight: items
        .reduce(
          (total: number, item: CartItem) =>
            total + (item.weight || 0.5) * item.quantity,
          0
        )
        .toString(),
      massUnit: "kg",
      distanceUnit: "cm",
    };

    const { rates } = await ShippingService.createShipment({
      ...address,
      parcels: [parcel],
    });
    console.log("Received rates:", rates);

    return NextResponse.json({
      rates: rates.map((rate) => ({
        id: rate.objectId,
        provider: rate.provider,
        service: rate.servicelevel.name,
        price: parseFloat(rate.amount),
        currency: rate.currency,
        estimated_days: rate.estimatedDays,
        duration_terms: rate.durationTerms,
      })),
    });
  } catch (error: Error | unknown) {
    console.error("Shipping rate calculation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to calculate shipping rates",
      },
      { status: 500 }
    );
  }
}
