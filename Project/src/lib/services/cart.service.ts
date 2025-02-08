import { createClient } from "@/utils/supabase/client";
import { CartItem} from "@/types/product";
import { toast } from "sonner";

const supabase = createClient();

export const cartService = {
  async getUserName(userId: string) {
    const supabase = createClient();
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.admin.getUserById(userId);
      if (error) throw error;
      return user?.user_metadata?.full_name || user?.email;
    } catch (error) {
      console.error("Error fetching user name:", error);
      return null;
    }
  },

  async syncCartToSupabase(userId: string, items: CartItem[]) {
    const supabase = createClient();

    try {
      // Get user details
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      const userName = user?.user_metadata?.full_name || user?.email;

      // Delete existing items
      await supabase.from("cart_items").delete().eq("user_id", userId);

      // Insert new items with user name
      if (items.length > 0) {
        const { error } = await supabase.from("cart_items").insert(
          items.map((item) => ({
            user_id: userId,
            user_name: userName,
            product_id: item.productId,
            product_name: item.name,
            quantity: item.quantity,
            size: item.size,
            price: item.price * item.quantity, // Calculate total price based on quantity
            image_url: item.image,
          }))
        );

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
      }

      toast.success("Added to cart", {
        description: "Item has been added to your cart",
      });
    } catch (error) {
      console.error("Error syncing cart:", error);
      toast.error("Error", {
        description: "Failed to add item to cart",
      });
      throw error;
    }
  },

  async updateCartItem(userId: string, productId: string, quantity: number) {
    const supabase = createClient();

    try {
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("price, quantity")
        .eq("user_id", userId)
        .eq("product_id", productId)
        .single();

      if (existingItem) {
        const unitPrice = existingItem.price / existingItem.quantity;
        const newPrice = unitPrice * quantity;

        const { error } = await supabase
          .from("cart_items")
          .update({
            quantity: quantity,
            price: newPrice,
            updated_at: new Date().toISOString(),
          })
          .match({ user_id: userId, product_id: productId });

        if (error) throw error;
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  },

  async removeCartItem(userId: string, productId: string) {
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .match({ user_id: userId, product_id: productId });

      if (error) throw error;
    } catch (error) {
      console.error("Error removing cart item:", error);
      throw error;
    }
  },

  async getCartItems(userId: string | null): Promise<CartItem[]> {
    // If no userId, return empty array (for guest users)
    if (!userId) return [];

    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      return (
        data?.map((item) => ({
          productId: item.product_id,
          name: item.product_name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: item.image_url,
          description: "",
          color: 1,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
  },

  async updateQuantity(
    userId: string | null,
    productId: string,
    quantity: number
  ): Promise<void> {
    // Skip database update for guest users
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .match({ user_id: userId, product_id: productId });

      if (error) throw error;
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  },

  async removeItem(userId: string | null, productId: string): Promise<void> {
    // Skip database delete for guest users
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .match({ user_id: userId, product_id: productId });

      if (error) throw error;
    } catch (error) {
      console.error("Error removing item:", error);
    }
  },
};
