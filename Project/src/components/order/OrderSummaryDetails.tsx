import { formatPrice } from "@/lib/utils";

interface OrderSummaryDetailsProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  className?: string;
}

export function OrderSummaryDetails({
  subtotal,
  shipping,
  tax,
  total,
  className = "",
}: OrderSummaryDetailsProps) {
  return (
    <div className={`space-y-2 pt-4 border-t ${className}`}>
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Shipping</span>
        <span>{shipping === 0 ? "-" : formatPrice(shipping)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Estimated Tax</span>
        <span>{formatPrice(tax)}</span>
      </div>
      <div className="flex justify-between font-medium pt-2 border-t">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
