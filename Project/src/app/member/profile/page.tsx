import { createClient } from "@/utils/supabase/server";
import { ProfileForm } from "@/components/member/ProfileForm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Profile Information</h2>
          <p className="text-muted-foreground">
            Update your account profile information and email address.
          </p>
        </div>
        <ProfileForm user={user} initialProfile={profile} />
      </div>
    </div>
  );
}
