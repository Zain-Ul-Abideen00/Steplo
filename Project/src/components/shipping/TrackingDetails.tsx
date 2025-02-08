"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Package, Truck, MapPin, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Track } from "shippo";

interface TrackingDetailsProps {
  trackingNumber: string;
  carrier: string;
}

const STATUS_COLORS = {
  PRE_TRANSIT: "bg-gray-500",
  TRANSIT: "bg-blue-500",
  DELIVERED: "bg-green-500",
  FAILURE: "bg-red-500",
  RETURNED: "bg-yellow-500",
  UNKNOWN: "bg-gray-500",
} as const;

const STATUS_ICONS = {
  PRE_TRANSIT: <Package className="w-5 h-5" />,
  TRANSIT: <Truck className="w-5 h-5" />,
  DELIVERED: <CheckCircle className="w-5 h-5" />,
  FAILURE: <Package className="w-5 h-5" />,
  RETURNED: <MapPin className="w-5 h-5" />,
  UNKNOWN: <Package className="w-5 h-5" />,
} as const;

export default function TrackingDetails({
  trackingNumber,
  carrier,
}: TrackingDetailsProps) {
  const [tracking, setTracking] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/shipping/track/${carrier}/${trackingNumber}`
        );
        if (!response.ok) throw new Error("Failed to fetch tracking");
        const data = await response.json();
        setTracking(data);
      } catch (err) {
        toast.error("Failed to load tracking information");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
    // Refresh tracking every 5 minutes
    const interval = setInterval(fetchTracking, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [trackingNumber, carrier]);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-40">
          <div className="animate-pulse text-muted-foreground">
            Loading tracking information...
          </div>
        </div>
      </Card>
    );
  }

  if (!tracking) return null;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Tracking Number</h3>
          <p className="text-sm text-muted-foreground">{trackingNumber}</p>
        </div>
        <Badge
          className={cn(
            "px-3 py-1",
            STATUS_COLORS[
              tracking.trackingStatus?.status as keyof typeof STATUS_COLORS
            ],
            "text-white"
          )}
        >
          {tracking.trackingStatus?.status.replace("_", " ")}
        </Badge>
      </div>

      {tracking.eta && (
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-1">Estimated Delivery</h4>
          <p className="text-sm">
            {format(new Date(tracking.eta), "MMMM d, yyyy")}
          </p>
        </div>
      )}

      <div className="space-y-4">
        <h4 className="font-medium">Tracking History</h4>
        <div className="space-y-4">
          {tracking.trackingHistory.map((event, index) => (
            <div key={index} className="flex items-start gap-4 relative">
              <div
                className={cn(
                  "rounded-full p-1",
                  STATUS_COLORS[event.status as keyof typeof STATUS_COLORS],
                  "text-white"
                )}
              >
                {STATUS_ICONS[event.status as keyof typeof STATUS_ICONS]}
              </div>

              <div className="flex-1">
                <p className="font-medium">{event.statusDetails}</p>
                <div className="flex gap-2 text-sm text-muted-foreground">
                  {event.location && <span>{event.location.city}</span>}
                  <span>•</span>
                  <span>
                    {event.statusDate ? format(new Date(event.statusDate), "MMM d, yyyy h:mm a") : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
