"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Loading } from "@/components/ui/loading";
import { PasswordInput } from "@/components/ui/password-input";
import { SocialAuthButton } from "@/components/ui/social-auth-button";

interface LoginFormProps {
  redirectPath?: string;
}

export default function LoginForm({ redirectPath }: LoginFormProps) {
  const { signIn, signInWithGoogle } = useAuth();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Get message from URL query parameter
  useEffect(() => {
    const message = searchParams.get("message");
    if (message) setMessage(message);
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      // Use redirectPath if provided, otherwise default to home
      router.push(redirectPath || "/");
    }
  }, [user, router, redirectPath]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  const {
    formState: { isValid, errors, dirtyFields },
  } = form;

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setError(null);

    try {
      await signIn(form.getValues("email"), form.getValues("password"));
    } catch (err) {
      setError("An error occurred during login");
      console.error("Login error:", err);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (googleLoading) return; // Prevent multiple clicks

    setGoogleLoading(true);
    try {
      // Add a small delay to ensure loading state is visible
      await Promise.all([
        signInWithGoogle(),
        new Promise(resolve => setTimeout(resolve, 500))
      ]);
    } catch (err) {
      setError("An error occurred during login");
      console.error("Login error:", err);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleEmailSignIn} className="space-y-6">
        {message && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <SocialAuthButton
            provider="google"
            onClick={handleGoogleSignIn}
            isLoading={googleLoading}
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email address"
                  {...field}
                  disabled={emailLoading}
                  className={`
                    ${dirtyFields.email && !errors.email && "border-green-500"}
                    ${errors.email && "border-red-500"}
                  `}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  {...field}
                  disabled={emailLoading}
                  className={`
                    ${dirtyFields.password && !errors.password && "border-green-500"}
                    ${errors.password && "border-red-500"}
                  `}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between text-sm">
          <Link
            href="/forgot-password"
            className="text-gray-600 hover:text-black"
          >
            Forgot password?
          </Link>
          <Link href="/join-us" className="text-gray-600 hover:text-black">
            Not a Member?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50 h-12"
          disabled={emailLoading || !isValid}
        >
          {emailLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loading variant="spinner" size="default" />
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}
