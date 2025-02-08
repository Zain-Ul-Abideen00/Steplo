import { motion } from "framer-motion";
import { ExternalLink, Truck, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

interface OrderTrackingInfoProps {
  trackingNumber?: string | null;
  carrier?: string | null;
  labelUrl?: string | null;
  shippingDetails?: {
    provider: string;
    service: string;
    price?: number;
    estimated_days: number;
  } | null;
}

export function OrderTrackingInfo({
  trackingNumber,
  carrier,
  labelUrl,
  shippingDetails,
}: OrderTrackingInfoProps) {
  if (!trackingNumber && !carrier && !labelUrl && !shippingDetails) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Shipping Information</h3>
        {labelUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(labelUrl, "_blank")}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Label
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shipping Method */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Shipping Method</p>
            <p className="font-medium">
              {shippingDetails?.service || carrier || "Standard Shipping"}
            </p>
            {shippingDetails?.price !== undefined && (
              <p className="text-sm text-muted-foreground">
                {formatPrice(shippingDetails.price)}
              </p>
            )}
          </div>
        </motion.div>

        {/* Tracking Number */}
        {trackingNumber && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Tracking Number</p>
              <p className="font-medium">{trackingNumber}</p>
              <p className="text-sm text-muted-foreground">
                {shippingDetails?.provider || carrier}
              </p>
            </div>
          </motion.div>
        )}

        {/* Estimated Delivery */}
        {shippingDetails?.estimated_days && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Estimated Delivery
              </p>
              <p className="font-medium">
                {shippingDetails.estimated_days} business days
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tracking Link - if you want to add a tracking URL later */}
      {trackingNumber && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <Separator className="mb-4" />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // Add tracking URL logic here
              window.open(
                `https://${shippingDetails?.provider?.toLowerCase() || carrier?.toLowerCase()}.com/tracking/${trackingNumber}`,
                "_blank"
              );
            }}
          >
            Track Package
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
