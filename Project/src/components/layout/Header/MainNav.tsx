"use client";
import { useState, useEffect } from "react";
import { FiHeart, FiMenu } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { getProducts } from "@/lib/sanity.queries";
import { Product } from "@/types/product";
import SearchCommand from "@/components/search/SearchCommand";

interface MainNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const MainNav = ({ isMenuOpen, setIsMenuOpen }: MainNavProps) => {
  const cartItems = useCartStore((state) => state.items);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  return (
    <nav className="bg-white h-[60px] border-b border-[#F5F5F5]">
      <div className="mx-auto px-5 sm:px-10 sm:pe-7 h-full flex items-center justify-between relative">
        {/* Left side with Logo */}
        <Link href="/">
          <Image
            src="/nike.svg"
            alt="Nike"
            width={70}
            height={20}
            className="object-contain w-auto h-auto"
          />
        </Link>

        {/* Center Nav Links - Hidden on Mobile */}
        <div className="hidden lg:flex items-center gap-[24px] absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/products"
            className="text-[16px] text-[#111111] hover:text-black font-semibold"
          >
            New & Featured
          </Link>
          <Link
            href="/products"
            className="text-[16px] text-[#111111] hover:text-black font-semibold"
          >
            Men
          </Link>
          <Link
            href="/products"
            className="text-[16px] text-[#111111] hover:text-black font-semibold"
          >
            Women
          </Link>
          <Link
            href="/products"
            className="text-[16px] text-[#111111] hover:text-black font-semibold"
          >
            Kids
          </Link>
          <Link
            href="/products"
            className="text-[16px] text-[#111111] hover:text-black font-semibold"
          >
            Sale
          </Link>
          <Link
            href="/products"
            className="text-[16px] text-[#111111] hover:text-black font-semibold"
          >
            SNKRS
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-[16px]">
          {/* Search - Visible on all screens */}
          <SearchCommand products={products} />

          {/* Icons - Hidden on Mobile */}
          <Link
            href="/wishlist"
            className="hidden sm:flex w-[40px] h-[40px] rounded-full hover:bg-[#F5F5F5] items-center justify-center"
          >
            <FiHeart className="w-6 h-6 text-[#111111]" />
          </Link>
          <Link
            href="/cart"
            className="hidden sm:flex w-[40px] h-[40px] rounded-full hover:bg-[#F5F5F5] items-center justify-center relative"
          >
            <IoBagHandleOutline className="w-6 h-6 text-[#111111]" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-[40px] h-[40px] rounded-full hover:bg-[#F5F5F5] flex items-center justify-center"
          >
            <FiMenu className="w-6 h-6 text-[#111111]" />
          </button>
        </div>
      </div>
    </nav>
  );
};
