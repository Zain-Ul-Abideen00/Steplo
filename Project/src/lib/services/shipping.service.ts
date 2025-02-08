import { createClient } from "@/utils/supabase/server";
import { Shippo } from "shippo";
import type {
  Shipment,
  Transaction,
  Track,
  Rate,
  ParcelCreateRequest,
  AddressCreateRequest,
} from "shippo";

const shippoClient = new Shippo({
  apiKeyHeader: process.env.SHIPPO_API_KEY!,
});

// Default parcel template for standard shipments
const DEFAULT_PARCEL: ParcelCreateRequest = {
  length: "10",
  width: "15",
  height: "10",
  weight: "2",
  massUnit: "lb",
  distanceUnit: "cm",
} as const;

export class ShippingService {
  static async createShipment(toAddress: AddressCreateRequest): Promise<{
    shipment: Shipment;
    rates: Rate[];
  }> {
    try {
      const fromAddress = {
        name: process.env.STORE_NAME!,
        street1: process.env.STORE_ADDRESS!,
        city: process.env.STORE_CITY!,
        state: process.env.STORE_STATE!,
        zip: process.env.STORE_ZIP!,
        country: process.env.STORE_COUNTRY!,
        phone: process.env.STORE_PHONE!,
        email: process.env.STORE_EMAIL!,
      };

      const shipmentData = {
        addressFrom: fromAddress,
        addressTo: toAddress,
        parcels: [DEFAULT_PARCEL],
        async: false,
      };

      const shipment = await shippoClient.shipments.create(shipmentData);
      return {
        shipment,
        rates: shipment.rates || [],
      };
    } catch (error) {
      console.error("Shipment creation error:", error);
      throw error;
    }
  }

  static async createLabel(rateId: string): Promise<Transaction> {
    try {
      const transactionData = {
        rate: rateId,
        label_file_type: "PDF_4x6",
        async: false,
      };

      const transaction =
        await shippoClient.transactions.create(transactionData);

      if (transaction.status !== "SUCCESS") {
        const errorMessage =
          transaction.messages?.[0]?.text ||
          "Label creation failed with unknown error";
        throw new Error(errorMessage);
      }

      // Verify required fields exist
      if (
        !transaction.trackingNumber ||
        !transaction.trackingUrlProvider ||
        !transaction.labelUrl
      ) {
        throw new Error(
          "Missing required tracking information in label response"
        );
      }

      return transaction;
    } catch (error) {
      console.error("Label creation error:", error);
      throw error;
    }
  }

  static async trackShipment(
    carrier: string,
    trackingNumber: string
  ): Promise<Track> {
    try {
      const tracking = await shippoClient.trackingStatus.get(
        carrier,
        trackingNumber
      );

      // Store tracking update in database
      const supabase = await createClient();
      await supabase.from("shipment_tracking").upsert({
        tracking_number: trackingNumber,
        carrier,
        status: tracking.trackingStatus?.status,
        location: tracking.trackingStatus?.location?.city,
        status_details: tracking.trackingStatus?.statusDetails,
        updated_at: new Date().toISOString(),
      });

      return tracking;
    } catch (error) {
      console.error("Tracking error:", error);
      throw error;
    }
  }

  static async registerWebhook(
    trackingNumber: string,
    carrier: string
  ): Promise<void> {
    try {
      const apiKey = process.env.SHIPPO_API_KEY;
      const appUrl = process.env.NEXT_PUBLIC_SITE_URL;

      if (!apiKey) {
        throw new Error("SHIPPO_API_KEY is not configured");
      }

      if (!appUrl) {
        throw new Error("NEXT_PUBLIC_SITE_URL is not configured");
      }

      const isTestMode = process.env.NODE_ENV === "development";
      const testData = {
        carrier: "shippo",
        tracking_number: "SHIPPO_TRANSIT",
      };

      const webhookUrl = `${appUrl}/api/shipping/webhook`;

      const response = await fetch("https://api.goshippo.com/v1/tracks/", {
        method: "POST",
        headers: {
          Authorization: `ShippoToken ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carrier: isTestMode ? testData.carrier : carrier.toLowerCase(),
          tracking_number: isTestMode
            ? testData.tracking_number
            : trackingNumber,
          metadata: "Order tracking registration",
          notify: true,
          webhook_url: webhookUrl,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          `Webhook registration failed: ${data.detail || "Unknown error"}`
        );
      }

      console.log("Webhook registered successfully:", {
        carrier: isTestMode ? testData.carrier : carrier,
        tracking_number: isTestMode ? testData.tracking_number : trackingNumber,
        webhook_url: webhookUrl,
        mode: isTestMode ? "test" : "production",
      });
    } catch (error) {
      console.error("Webhook registration error:", error);
      // Don't throw to prevent blocking the success page
    }
  }
}
