"use client";

import {
  FiHeart,
  FiShoppingBag,
  FiClipboard,
  FiMapPin,
  FiHelpCircle,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/context/AuthContext";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const cartItems = useCartStore((state) => state.items);
  const { user: authUser, loading: authLoading, signOut } = useAuth();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Add loading state to UI
  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  // Use user state for debugging
  console.debug("Current user state:", user);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-[320px] p-0">
        <SheetHeader className=" p-4 flex items-start justify-between border-b border-[#F5F5F5]">
          <SheetTitle className="justify-start text-[18px] font-bold">
            Menu
          </SheetTitle>
        </SheetHeader>

        <div className="h-full overflow-y-auto pb-[120px]">
          {/* Mobile Search */}

          {/* Mobile Navigation Links */}
          <nav className="px-4">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/products"
                  className="block text-[24px] text-[#111111] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  New
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="block text-[24px] text-[#111111] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="block text-[24px] text-[#111111] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="block text-[24px] text-[#111111] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Kids
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="block text-[24px] text-[#111111] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Jordan
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="block text-[24px] text-[#111111] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Sale
                </Link>
              </li>
            </ul>
          </nav>

          {/* Brand Links */}
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2 py-2"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="/jordan.svg"
                alt="Jordan"
                width={24}
                height={24}
                className="w-auto h-auto"
              />
              <span className="text-[16px] text-[#111111] font-medium">
                Jordan
              </span>
            </Link>
          </div>

          {/* Steplo Member Message */}
          <div className="px-4 py-6 space-y-4 border-t border-[#F5F5F5]">
            {!authLoading && (
              <>
                {authUser ? (
                  <div className="space-y-4">
                    <p className="text-[16px]">
                      Hi, {authUser.user_metadata.full_name || authUser.email}
                    </p>
                    <button
                      onClick={async () => {
                        await signOut();
                        setIsOpen(false);
                      }}
                      className="px-5 py-2 border border-[#CACACC] rounded-full text-[16px] font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-[16px] text-[#707072]">
                      Become a Steplo Member for the best products, inspiration
                      and stories in sport.{" "}
                      <Link href="/help" className="text-black underline">
                        Learn more
                      </Link>
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href="/join-us"
                        className="px-5 py-2 bg-black text-white rounded-full text-[16px] font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Join Us
                      </Link>
                      <Link
                        href="/login"
                        className="px-5 py-2 border border-[#CACACC] rounded-full text-[16px] font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Link>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Utility Links */}
          <div className="px-4 py-4 space-y-4 border-t border-[#F5F5F5]">
            <Link
              href="/cart"
              className="flex items-center gap-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              <FiClipboard className="w-6 h-6 text-[#111111]" />
              <span className="text-[16px] text-[#111111]">Orders</span>
            </Link>
            <Link
              href="/help"
              className="flex items-center gap-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              <FiHelpCircle className="w-6 h-6 text-[#111111]" />
              <span className="text-[16px] text-[#111111]">Help</span>
            </Link>
            <Link
              href="/location"
              className="flex items-center gap-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              <FiMapPin className="w-6 h-6 text-[#111111]" />
              <span className="text-[16px] text-[#111111]">Find a Store</span>
            </Link>
          </div>
        </div>

        {/* Mobile Bottom Icons */}
        <SheetFooter className="fixed bottom-0 right-0 w-[320px] border-t border-[#F5F5F5]">
          <div className="h-[60px] px-4 bg-white w-full flex items-center justify-around">
            <Link
              href="/wishlist"
              className="w-[40px] h-[40px] rounded-full hover:bg-[#F5F5F5] flex items-center justify-center"
            >
              <FiHeart className="w-6 h-6 text-[#111111]" />
            </Link>
            <Link
              href="/cart"
              className="w-[40px] h-[40px] rounded-full hover:bg-[#F5F5F5] flex items-center justify-center relative"
            >
              <FiShoppingBag className="w-6 h-6 text-[#111111]" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
