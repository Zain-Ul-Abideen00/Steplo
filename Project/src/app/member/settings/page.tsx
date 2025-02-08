import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/member/SettingsForm";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: settings } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Account Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <SettingsForm user={user} initialSettings={settings} />
      </div>
    </div>
  );
}
