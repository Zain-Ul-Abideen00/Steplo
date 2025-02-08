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
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
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
  const [loading, setLoading] = useState(false);

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

  async function onSubmit(data: LoginFormData) {
    setLoading(true);
    setError(null);

    try {
      await signIn(data.email, data.password);
      // The redirect will be handled by the useEffect above
    } catch (err) {
      setError("An error occurred during login");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            onClick={() => signInWithGoogle()}
            isLoading={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
          disabled={loading || !isValid}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
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
