"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function CartSummary() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="space-y-4 sm:space-y-6 bg-gray-50 p-4 sm:p-6 rounded-lg">
      <h2 className="text-xl sm:text-2xl font-semibold">Summary</h2>

      <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Delivery & Handling</span>
          <span>-</span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>

      <div className="">
        <Link href="/checkout">
          <Button className="w-full rounded-full h-[50px] sm:h-[60px]">
            Member Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
