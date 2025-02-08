"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export function useCart() {
  const { items, syncWithSupabase } = useCartStore();
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (session?.user) {
          await syncWithSupabase(session.user.id);
        }
      } catch (error) {
        toast.error("Failed to sync cart");
        console.error("Cart sync error:", error);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, syncWithSupabase]);

  return { items };
}
