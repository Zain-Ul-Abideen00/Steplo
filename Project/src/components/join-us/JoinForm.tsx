"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "@/lib/validations/auth";
import GenderSelector from "./GenderSelector";
import NewsletterCheckbox from "./NewsLetter";
import Link from "next/link";
import { signup } from "@/lib/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import zxcvbn from "zxcvbn";
import { PasswordInput } from "@/components/ui/password-input";
import { SocialAuthButton } from "@/components/ui/social-auth-button";
import { useAuth } from "@/context/AuthContext";


export default function JoinForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      dateOfBirth: "",
      country: "",
      gender: "",
      newsletter: false,
    },
    mode: "onChange",
  });

  const {
    formState: { isValid, errors, dirtyFields },
    watch,
  } = form;

  const password = watch("password");
  const passwordStrength = password ? zxcvbn(password) : null;

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0:
        return "bg-red-500 w-[20%]";
      case 1:
        return "bg-orange-500 w-[40%]";
      case 2:
        return "bg-yellow-500 w-[60%]";
      case 3:
        return "bg-blue-500 w-[80%]";
      case 4:
        return "bg-green-500 w-[100%]";
      default:
        return "bg-gray-200 w-0";
    }
  };

  const getStrengthText = (score: number) => {
    switch (score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "Enter Password";
    }
  };

  async function onSubmit(data: SignupFormData) {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const result = await signup(formData);

      if (result.error) {
        setError(result.error);
        console.error("Signup error details:", result.details);
      } else if (result.success) {
        // Redirect to login with success message
        router.push(
          `/login?message=${encodeURIComponent(result.message || "")}`
        );
      }
    } catch (err) {
      setError("An error occurred during signup");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Full Name"
                  {...field}
                  disabled={loading}
                  className={`
                    ${dirtyFields.fullName && !errors.fullName && "border-green-500"}
                    ${errors.fullName && "border-red-500"}
                  `}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  autoComplete="new-password"
                />
              </FormControl>
              {password && (
                <div className="mt-2 space-y-2">
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength
                          ? getStrengthColor(passwordStrength.score)
                          : ""
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span
                      className={`font-medium ${
                        passwordStrength
                          ? `text-${getStrengthColor(passwordStrength.score).split(" ")[0].replace("bg-", "")}`
                          : "text-gray-500"
                      }`}
                    >
                      {passwordStrength
                        ? getStrengthText(passwordStrength.score)
                        : "Enter Password"}
                    </span>
                    <span className="text-gray-500">
                      {password.length} / 12 characters
                    </span>
                  </div>
                  {passwordStrength?.feedback.warning && (
                    <p className="text-xs text-red-500">
                      {passwordStrength.feedback.warning}
                    </p>
                  )}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Date of Birth"
                  {...field}
                  disabled={loading}
                  className={`
                    ${dirtyFields.dateOfBirth && !errors.dateOfBirth && "border-green-500"}
                    ${errors.dateOfBirth && "border-red-500"}
                  `}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Country"
                  {...field}
                  disabled={loading}
                  className={`
                    ${dirtyFields.country && !errors.country && "border-green-500"}
                    ${errors.country && "border-red-500"}
                  `}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <GenderSelector />
        <NewsletterCheckbox />

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50"
          disabled={loading || !isValid}
        >
          {loading ? "Creating account..." : "Join Us"}
        </Button>

        <p className="text-center text-sm">
          Already a Member?{" "}
          <Link href="/login" className="text-black font-semibold underline">
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
}
