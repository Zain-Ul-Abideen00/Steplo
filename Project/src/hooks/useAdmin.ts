"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/lib/services/admin.service";
import { UserRole } from "@/types/admin";
import { toast } from "sonner";

export function useAdmin() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [userRoles, userPermissions] = await Promise.all([
          adminService.getCurrentUserRoles(),
          adminService.getCurrentUserPermissions(),
        ]);
        setRoles(userRoles);
        setPermissions(userPermissions);
      } catch (error) {
        toast.error("Error loading admin data");
        console.error("Admin data loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  const isAdmin = roles.includes("admin");
  const isManager = roles.includes("manager");
  const isEditor = roles.includes("editor");

  const hasPermission = (permission: string) =>
    permissions.includes(permission);

  return {
    roles,
    permissions,
    isAdmin,
    isManager,
    isEditor,
    hasPermission,
    loading,
  };
}
