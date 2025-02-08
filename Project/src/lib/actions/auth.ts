"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { loginSchema, signupSchema } from "../validations/auth";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const keepSignedIn = formData.get("keepSignedIn") as string;

  const result = loginSchema.safeParse({
    email,
    password,
    keepSignedIn: keepSignedIn === "true",
  });
  if (!result.success) {
    return { error: result.error.format() };
  }

  const supabase = await createClient();

  const { data, error: supabaseError } = await supabase.auth.signInWithPassword(
    {
      email,
      password,
    }
  );

  if (supabaseError) {
    return { error: supabaseError.message };
  }

  if (data?.user) {
    redirect("/");
  }

  return { error: "Something went wrong. Please try again." };
}

export async function signup(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const country = formData.get("country") as string;
    const gender = formData.get("gender") as string;
    const newsletter = formData.get("newsletter") === "true";

    // Validate the data
    const validationResult = signupSchema.safeParse({
      email,
      password,
      fullName,
      dateOfBirth,
      country,
      gender,
      newsletter,
    });

    if (!validationResult.success) {
      return {
        error: "Invalid form data",
        details: validationResult.error.format(),
      };
    }

    const supabase = await createClient();

    // First check if user already exists
    const { data: existingUser } = await supabase
      .from("profiles")
      .select()
      .eq("email", email)
      .single();

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          date_of_birth: dateOfBirth,
          country,
          gender,
          newsletter,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (signUpError) {
      console.error("Signup error:", signUpError);
      return { error: signUpError.message };
    }

    if (data?.user) {
      return {
        success: true,
        message: "Please check your email to confirm your account",
      };
    }

    return { error: "Failed to create account. Please try again." };
  } catch (error) {
    console.error("Unexpected error during signup:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}