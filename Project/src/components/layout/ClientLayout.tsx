"use client";

import { useRealTimeUpdates } from "@/hooks/useRealTimeUpdates";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRealTimeUpdates();
  return children;
}
