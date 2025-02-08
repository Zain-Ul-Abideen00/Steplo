import { CartItem } from "@/types/product";

export const calculateTotal = (cart: CartItem[]) => {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const tax = Math.round(subtotal * 0.05); // 5% tax
  return subtotal + shipping + tax;

};

export function calculateSubtotal(items: CartItem[]): number {
  return calculateTotal(items);
}

export function calculateTax(items: CartItem[]): number {
  return Math.round(calculateSubtotal(items) * 0.05); // 5% GST
}


