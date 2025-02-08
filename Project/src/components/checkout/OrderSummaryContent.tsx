"use client";

import Image from "next/image";
import { CartItem } from "@/types/product";
import { formatPrice, calculateOrderTotal } from "@/lib/utils";

interface OrderSummaryContentProps {
  cart: CartItem[];
  selectedRate?: {
    id: string;
    provider: string;
    service: string;
    price: number;
    currency: string;
    estimated_days: number;
  } | null;
  className?: string;
  variant?: "default" | "review";
}

export default function OrderSummaryContent({
  cart,
  selectedRate,
  className = "",
  variant = "default",
}: OrderSummaryContentProps) {
  const total = calculateOrderTotal(cart, selectedRate);

  return (
    <div className={className}>
      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.productId} className="flex gap-4">
            {variant === "default" && (
              <div className="relative h-20 w-20 overflow-hidden rounded-md">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                Quantity: {item.quantity}
              </p>
              <p className="text-sm font-medium">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details */}
      <div className="space-y-2 pt-4 border-t">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>
            {formatPrice(
              cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{selectedRate ? formatPrice(selectedRate.price) : "-"}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Estimated Tax</span>
          <span>
            {formatPrice(
              cart.reduce(
                (total, item) =>
                  total + Math.round(item.price * item.quantity * 0.05),
                0
              )
            )}
          </span>
        </div>
        <div className="flex justify-between font-medium pt-2 border-t">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {variant === "default" && (
        <div className="space-y-2 pt-4 text-sm text-muted-foreground">
          <p>
            • Delivery within{" "}
            {selectedRate ? selectedRate.estimated_days : "3-5"} business days
          </p>
          <p>• Free returns within 30 days</p>
          <p>• Secure checkout powered by Stripe</p>
        </div>
      )}
    </div>
  );
}
