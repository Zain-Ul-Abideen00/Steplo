"use client";

import { redirect } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    redirect("/unauthorized");
  }

  return <div className="min-h-screen">{children}</div>;
}
