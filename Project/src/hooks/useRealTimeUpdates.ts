"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/store/cartStore";
import { createClient } from "@/utils/supabase/client";

export function useRealTimeUpdates() {
  const { refreshSession } = useAuth();
  const { syncWithSupabase } = useCartStore();
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    const handleDatabaseChanges = async () => {
      if (!mounted) return;
      const user = await refreshSession();
      if (user) {
        await syncWithSupabase(user.id);
      }
    };

    // Set up real-time subscription
    const channel = supabase
      .channel("db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public" },
        handleDatabaseChanges
      )
      .subscribe();

    // Cleanup function
    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [refreshSession, syncWithSupabase, supabase]);
}
