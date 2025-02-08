"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const supabase = createClient();

interface AuthContextType {
  user: User | null;
  refreshSession: () => Promise<User | null>;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  refreshSession: async () => null,
  loading: true,
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
        toast.success("Welcome back!", {
          description: "You have successfully signed in.",
        });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Error signing in", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast.success("Signed out", {
        description: "You have been successfully signed out.",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Error signing out", {
        description: "Please try again",
      });
      console.error(error);
    }
  };

  const refreshSession = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          scopes: "email profile",
        },
      });

      if (error) throw error;

      if (data) {
        toast.success("Redirecting to Google...");
        // The redirect will happen automatically
      }
    } catch (error) {
      toast.error("Error signing in with Google", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    }
  };

  // Add a new function to handle token storage
  const storeGoogleTokens = async (session: Session) => {
    try {
      const { provider_token, provider_refresh_token } = session;

      if (provider_token) {
        // Store the access token securely
        // You might want to encrypt these before storing
        localStorage.setItem("google_access_token", provider_token);

        if (provider_refresh_token) {
          localStorage.setItem("google_refresh_token", provider_refresh_token);
        }
      }
    } catch (error) {
      console.error("Error storing Google tokens:", error);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session) storeGoogleTokens(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session) storeGoogleTokens(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    refreshSession,
    loading,
    signIn,
    signOut,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
