"use client";

import CartSummary from "@/components/cart/cart-summary";
import CartItem from "@/components/cart/cart-item";
import DeliveryBanner from "@/components/cart/delivery-banner";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShoppingBag } from "lucide-react";
import { ErrorState } from "@/components/ui/error-state";
import { CartSkeleton } from "@/components/cart/cart-skeleton";
import { RelatedProducts } from "@/components/products/RelatedProducts";

export default function CartPage() {
  const { items, isLoading, error } = useCartStore();

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load cart"
        message="There was an error loading your shopping cart"
        retry={() => window.location.reload()}
      />
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-center">
          Your shopping bag is empty
        </h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven&apos;t added anything to your bag yet. Explore
          our collection and find something you&apos;ll love!
        </p>
        <Link href="/products">
          <Button className="min-w-[200px] h-12 text-lg flex items-center gap-2 bg-black hover:bg-gray-800">
            <ShoppingBag className="h-5 w-5" />
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Shopping Bag</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <DeliveryBanner className="mb-8" />

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="sticky top-4">
              <CartSummary />
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-2">
                  Shipping and taxes will be calculated at checkout.
                </p>
                <p>
                  Free standard shipping on orders over Rs 14,000.
                  <Link
                    href="/shipping"
                    className="underline ml-1 hover:text-black"
                  >
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <RelatedProducts pageType="cart" limit={3} />
      </div>
    </div>
  );
}
