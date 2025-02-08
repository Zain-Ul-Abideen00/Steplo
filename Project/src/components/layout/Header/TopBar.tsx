"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserNav } from "@/components/layout/UserNav";

export const TopBar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { user, loading } = useAuth();

  return (
    <div className="hidden lg:block bg-[#F5F5F5] h-[36px] relative">
      {/* Center - Skip to main content - Only show on home page */}
      {isHomePage && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
          <button
            className="bg-white px-[10px] py-[5px] h-[26px] text-[12px] text-[#111111] hover:underline"
            onClick={() => document.getElementById("main-content")?.focus()}
          >
            Skip to main content
          </button>
        </div>
      )}

      <div className="mx-auto px-5 sm:px-10 h-full flex items-center justify-between">
        {/* Left Side - Jordan Logo */}
        <div className="flex items-center gap-4">
          <Link href="/jordan" className="hover:opacity-75">
            <Image
              src="/jordan.svg"
              alt="Jordan"
              width={24}
              height={24}
              className="text-[#111111] w-auto h-auto"
            />
          </Link>
        </div>

        {/* Right Side - Links */}
        <div className="flex items-center gap-[12px] text-[12px] font-semibold text-[#111111]">
          <Link href="/location" className="hover:opacity-75">
            Find a Store
          </Link>
          <span className="text-[#757575]">|</span>
          <Link href="/help" className="hover:opacity-75">
            Help
          </Link>
          {!loading && (
            <>
              <span className="text-[#757575]">|</span>
              {user ? (
                <UserNav user={user} />
              ) : (
                <>
                  <Link href="/join-us" className="hover:opacity-75">
                    Join Us
                  </Link>
                  <span className="text-[#757575]">|</span>
                  <Link href="/login" className="hover:opacity-75">
                    Sign In
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
