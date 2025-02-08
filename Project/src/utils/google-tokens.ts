import { createClient } from "./supabase/client";

interface GoogleTokens {
  access_token: string;
  refresh_token?: string;
}

export async function refreshGoogleTokens(): Promise<GoogleTokens | null> {
  const supabase = createClient();

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      throw error || new Error("No session found");
    }

    const { provider_token, provider_refresh_token } = session;

    if (!provider_token) {
      throw new Error("No Google tokens found");
    }

    return {
      access_token: provider_token as string,
      refresh_token: provider_refresh_token || undefined,
    };
  } catch (error) {
    console.error("Error refreshing Google tokens:", error);
    return null;
  }
}

export async function getGoogleTokens(): Promise<GoogleTokens | null> {
  // First try to get tokens from cookies
  const access_token = document.cookie.match(
    /google_access_token=([^;]+)/
  )?.[1];
  const refresh_token = document.cookie.match(
    /google_refresh_token=([^;]+)/
  )?.[1];

  if (access_token) {
    return {
      access_token: decodeURIComponent(access_token),
      refresh_token: refresh_token
        ? decodeURIComponent(refresh_token)
        : undefined,
    };
  }

  // If not found in cookies, try to refresh from session
  return refreshGoogleTokens();
}
