import { CartItem } from "@/types/product";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatOrderId(orderId: string) {
  // Take the last 8 characters of the UUID
  return orderId.slice(-8).toUpperCase();
}

export const calculateOrderTotal = (
  cart: CartItem[],
  selectedRate?: { price: number } | null
) => {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = selectedRate ? selectedRate.price : 0;
  const tax = Math.round(subtotal * 0.05); // 5% tax
  return Math.round(subtotal + shipping + tax); // Ensure we return an integer
};

// Add a new function for Stripe amount
export const calculateStripeAmount = (amount: number) => {
  // For PKR, Stripe expects amount in paisa (1 PKR = 100 paisa)
  return Math.round(amount * 100);
};
