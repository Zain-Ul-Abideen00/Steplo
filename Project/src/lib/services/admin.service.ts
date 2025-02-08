import { UserRole, AdminUser, Permission } from "@/types/admin";
import { createClient } from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

interface UserRoleWithEmail {
  user_id: string;
  role: UserRole;
  users: {
    email: string;
  };
}

export const adminService = {
  async getCurrentUserRoles(): Promise<UserRole[]> {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user?.id);

    return roles?.map((r) => r.role) || [];
  },

  async getCurrentUserPermissions(): Promise<string[]> {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: permissions } = await supabase
      .from("permissions")
      .select(
        `
        name,
        role_permissions!inner(role),
        user_roles!inner(user_id)
      `
      )
      .eq("user_roles.user_id", user?.id);

    return permissions?.map((p) => p.name) || [];
  },

  async assignRole(userId: string, role: UserRole) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("user_roles").insert({
      user_id: userId,
      role: role,
      created_by: user?.id,
    });

    if (error) throw error;
    return data;
  },

  async removeRole(userId: string, role: UserRole) {
    const supabase = await createClient();

    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", role);

    if (error) throw error;
  },

  async getAllPermissions(): Promise<Permission[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("permissions").select("*");

    if (error) throw error;
    return data;
  },

  async getAdminUsers(): Promise<AdminUser[]> {
    const supabase = await createClient();

    const { data: users, error } = (await supabase.from("user_roles").select(`
        user_id,
        role,
        users:auth.users!inner(email)
      `)) as {
      data: UserRoleWithEmail[] | null;
      error: PostgrestError | null;
    };

    if (error) throw error;

    const userMap = new Map<string, AdminUser>();
    users?.forEach((user) => {
      if (!userMap.has(user.user_id)) {
        userMap.set(user.user_id, {
          id: user.user_id,
          email: user.users.email,
          roles: [],
          permissions: [],
        });
      }
      userMap.get(user.user_id)?.roles.push(user.role);
    });

    return Array.from(userMap.values());
  },
};
