"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

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
      toast.error("Please sign in", {
        description: "You need to be signed in to add items to your wishlist",
      });
      return;
    }

    setLoading(true);
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
        toast.success("Success", {
          description: "Item removed from wishlist",
        });
      } else {
        await addToWishlist(productId, product);
        toast.success("Success", {
          description: "Item added to wishlist",
        });
      }
    } catch (err) {
      toast.error("Error", {
        description: "Failed to update wishlist",
      });
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
