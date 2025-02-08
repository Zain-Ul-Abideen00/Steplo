import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const signature = headersList.get("Shippo-Signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    const payload = await req.json();
    const supabase = await createClient();

    // Verify webhook signature (if needed)
    // ShippingService.verifyWebhookSignature(signature, payload);

    if (payload.event === "track_updated") {
      const { tracking_number, carrier, tracking_status } = payload.data;

      // Update shipments table
      await supabase
        .from("shipments")
        .update({
          status: tracking_status.status,
          updated_at: new Date().toISOString(),
          estimated_delivery: tracking_status.eta || null,
        })
        .eq("tracking_number", tracking_number)
        .eq("carrier", carrier);

      // Store tracking event
      await supabase.from("shipment_tracking").upsert({
        tracking_number,
        carrier,
        status: tracking_status.status,
        status_details: tracking_status.status_details,
        location: tracking_status.location?.city,
        updated_at: new Date().toISOString(),
      });

      // Notify connected clients via Supabase realtime
      await supabase.from("shipping_updates").insert({
        tracking_number,
        carrier,
        status: tracking_status.status,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
