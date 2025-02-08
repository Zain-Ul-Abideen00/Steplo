"use client";

import { calculateOrderTotal, calculateStripeAmount } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const appearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#000000",
    colorBackground: "#ffffff",
    colorText: "#1a1a1a",
    fontFamily: "Inter var, sans-serif",
    borderRadius: "6px",
    spacingUnit: "4px",
  },
};

export default function StripeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = useCartStore((state) => state.items);
  const total = calculateOrderTotal(cart);
  const stripeAmount = calculateStripeAmount(total);

  const options = {
    mode: "payment" as const,
    amount: stripeAmount > 0 ? stripeAmount : undefined,
    currency: "pkr",
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
