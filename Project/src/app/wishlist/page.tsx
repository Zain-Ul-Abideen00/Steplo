"use client";

import { useAuth } from "@/context/AuthContext";
import { ErrorState } from "@/components/ui/error-state";
import WishlistProductCard from "@/components/wishlist/WishlistProductCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { RelatedProducts } from "@/components/products/RelatedProducts";

export default function WishlistPage() {
  const { user } = useAuth();
  const { items, loading, error, removeFromWishlist } = useWishlist();

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4">
        <Heart className="h-16 w-16 text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-center">
          Sign in to view your wishlist
        </h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Join us to keep track of your favorite items
        </p>
        <Link href="/join-us">
          <Button className="min-w-[200px] h-12 text-lg">Sign In</Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-80 bg-gray-200 rounded-lg" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load wishlist"
        message={error}
        retry={() => window.location.reload()}
      />
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4">
        <Heart className="h-16 w-16 text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-center">
          Your wishlist is empty
        </h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Save items you love to your wishlist and revisit them anytime
        </p>
        <Link href="/products">
          <Button className="min-w-[200px] h-12 text-lg flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shop Now
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <WishlistProductCard
            key={item.id}
            item={item}
            onRemove={() => {
              if (user) {
                removeFromWishlist(item.product_id);
              }
            }}
          />
        ))}
      </div>

      <RelatedProducts pageType="wishlist" limit={6} />
    </div>
  );
}
