import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Product, WishlistItem } from "@/types/product";
import { toast } from "sonner";

const supabase = createClient();

export const wishlistService = {
  async addToWishlist(user: User, product: Product): Promise<void> {
    const { error } = await supabase
      .from("wishlist_items")
      .insert({
        user_id: user.id,
        user_name: user.email,
        product_id: product._id,
        product_name: product.name,
        price: product.price,
        image_url: product.imageUrl,
      })
      .single();

    if (error) throw error;
    toast.success("Added to wishlist", {
      description: "Item has been added to your wishlist",
    });
  },

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .match({ user_id: userId, product_id: productId })
      .single();

    if (error && error.code !== "PGRST116") throw error;
  },

  async getWishlist(userId: string): Promise<WishlistItem[]> {
    if (!userId) return [];

    const { data, error } = await supabase
      .from("wishlist_items")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    if (!userId || !productId) return false;

    const { data, error } = await supabase
      .from("wishlist_items")
      .select("id")
      .match({ user_id: userId, product_id: productId })
      .maybeSingle();

    if (error && error.code !== "PGRST116") throw error;
    return !!data;
  },
};
