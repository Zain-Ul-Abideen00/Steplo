import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartService } from "@/lib/services/cart.service";
import { User } from "@supabase/supabase-js";
import { CartItem } from "@/types/product"; // Import the unified CartItem type

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  addItem: (item: CartItem, user: User | null) => Promise<void>;
  removeItem: (productId: string, user?: User | null) => Promise<void>;
  updateQuantity: (
    productId: string,
    quantity: number,
    user?: User | null
  ) => Promise<void>;
  clearCart: () => void;
  syncWithSupabase: (userId: string) => Promise<void>;
  handleLogout: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ isLoading: loading }),

      addItem: async (item, user) => {
        const existingItem = get().items.find(
          (i) => i.productId === item.productId
        );
        let newItems;

        if (existingItem) {
          // Update quantity if item exists
          newItems = get().items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        } else {
          // Add new item
          newItems = [...get().items, { ...item, quantity: 1 }];
        }

        set({ items: newItems });

        // Sync with Supabase if user is logged in
        if (user) {
          try {
            await cartService.syncCartToSupabase(user.id, newItems);
          } catch (error) {
            console.error("Error syncing to Supabase:", error);
          }
        }
      },

      removeItem: async (productId, user) => {
        const newItems = get().items.filter((i) => i.productId !== productId);
        set({ items: newItems });

        if (user) {
          try {
            await cartService.removeCartItem(user.id, productId);
            await cartService.syncCartToSupabase(user.id, newItems);
          } catch (error) {
            console.error("Error removing item from Supabase:", error);
          }
        }
      },

      updateQuantity: async (
        productId: string,
        quantity: number,
        user?: User | null
      ) => {
        if (quantity < 1) return;

        const newItems = get().items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        set({ items: newItems });

        if (user) {
          try {
            await cartService.updateCartItem(user.id, productId, quantity);
            await cartService.syncCartToSupabase(user.id, newItems);
          } catch (error) {
            console.error("Error updating quantity in Supabase:", error);
          }
        }
      },

      clearCart: () => set({ items: [] }),

      syncWithSupabase: async (userId) => {
        try {
          const items = await cartService.getCartItems(userId);
          set({ items: items || [] });
        } catch (error) {
          console.error("Error syncing with Supabase:", error);
        }
      },

      handleLogout: () => {
        set({ items: [] }); // Clear cart on logout
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
