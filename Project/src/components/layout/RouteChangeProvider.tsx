"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { LoadingBar } from "../ui/LoadingBar";

export function RouteChangeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      <LoadingBar key={pathname + searchParams.toString()} />
      {children}
    </>
  );
}
