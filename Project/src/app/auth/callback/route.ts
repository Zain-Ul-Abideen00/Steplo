import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const supabase = await createClient();

  // Handle OAuth callback
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.session) {
      // Store the session
      const cookieStore = await cookies();

      // Extract and store provider tokens if available
      const { provider_token, provider_refresh_token } = data.session;

      if (provider_token) {
        // Store tokens in secure HTTP-only cookies
        cookieStore.set("google_access_token", provider_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 3600, // 1 hour
        });

        if (provider_refresh_token) {
          cookieStore.set("google_refresh_token", provider_refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60, // 30 days
          });
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }

    // OAuth error handling
    console.error("OAuth error:", error);
    return NextResponse.redirect(
      new URL("/login?error=Could not authenticate with Google", request.url)
    );
  }

  // Handle Email OTP verification
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return NextResponse.redirect(
        new URL(
          "/login?message=Email verified successfully! Please sign in.",
          request.url
        )
      );
    }

    console.error("Email verification error:", error);
    return NextResponse.redirect(
      new URL(
        "/login?error=Verification failed. Please try signing up again.",
        request.url
      )
    );
  }

  // No valid authentication parameters found
  return NextResponse.redirect(
    new URL("/login?error=Invalid authentication request", request.url)
  );
}
