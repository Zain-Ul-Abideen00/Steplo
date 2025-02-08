"use client";

import { useCart } from "@/hooks/useCart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  useCart(); // This will handle cart synchronization
  return <>{children}</>;
}
