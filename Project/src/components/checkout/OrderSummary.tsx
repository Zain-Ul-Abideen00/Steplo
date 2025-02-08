"use client";

import OrderSummaryContent from "./OrderSummaryContent";
import { CartItem } from "@/types/product";

interface OrderSummaryProps {
  cart: CartItem[];
  selectedRate?: {
    id: string;
    provider: string;
    service: string;
    price: number;
    currency: string;
    estimated_days: number;
  } | null;
}

export default function OrderSummary({
  cart,
  selectedRate,
}: OrderSummaryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Order Summary</h2>
      <OrderSummaryContent
        cart={cart}
        selectedRate={selectedRate}
        variant="default"
        className="space-y-6"
      />
    </div>
  );
}
