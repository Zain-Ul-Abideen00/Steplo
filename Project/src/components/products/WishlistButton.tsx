"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { toastService } from "@/lib/services/toast.service";

interface WishlistButtonProps {
  productId: string;
  product: Product;
}

export function WishlistButton({ productId, product }: WishlistButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toastService.auth.signInRequired();
      return;
    }

    setLoading(true);
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
        toastService.wishlist.removed(product.name);
      } else {
        await addToWishlist(productId, product);
        toastService.wishlist.added(product.name);
      }
    } catch (err) {
      toastService.error.action("update wishlist");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={loading}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
        loading ? "opacity-50" : ""
      }`}
      aria-label={
        isInWishlist(productId) ? "Remove from wishlist" : "Add to wishlist"
      }
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          isInWishlist(productId)
            ? "fill-red-500 text-red-500"
            : "text-gray-600"
        }`}
      />
    </button>
  );
}
