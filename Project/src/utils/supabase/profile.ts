import { createClient } from "./server";

export type Profile = {
  id: string;
  full_name: string;
  date_of_birth: string;
  country: string;
  gender: string;
  newsletter: boolean;
  created_at: string;
};

export async function getProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data as Profile | null;
}
