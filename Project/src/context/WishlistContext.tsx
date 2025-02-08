"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Product, WishlistItem } from "@/types/product";
import { wishlistService } from "@/lib/services/wishlist.service";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
  addToWishlist: (productId: string, product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshWishlist = async () => {
    if (!user) {
      setItems([]);
      return;
    }

    setLoading(true);
    try {
      const wishlistItems = await wishlistService.getWishlist(user.id);
      setItems(wishlistItems);
      setError(null);
    } catch (err) {
      setError("Failed to load wishlist");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //disable eslint for this line
  /* eslint-disable */

  useEffect(() => {
    refreshWishlist();
  }, [user]);

  const addToWishlist = async (_productId: string, product: Product) => {
    if (!user) return;
    try {
      await wishlistService.addToWishlist(user, product);
      await refreshWishlist();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;
    try {
      await wishlistService.removeFromWishlist(user.id, productId);
      await refreshWishlist();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return items.some((item) => item.product_id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
