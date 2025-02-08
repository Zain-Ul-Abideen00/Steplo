"use client";

import { Product } from "@/types/product";
import { Button } from "../ui/Button";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useWishlist } from "@/context/WishlistContext";
import { ReviewSection } from "./ReviewSection";
import { formatPrice } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const { addItem } = useCartStore();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Get user on component mount
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, [supabase.auth]);

  // Sample sizes - you can modify based on your needs
  const sizes = [
    { size: "M 7 / W 8.5", available: true },
    { size: "M 7.5 / W 9", available: true },
    { size: "M 8 / W 9.5", available: true },
    { size: "M 8.5 / W 10", available: true },
    { size: "M 9 / W 10.5", available: true },
    { size: "M 9.5 / W 11", available: false },
    // Add more sizes as needed
  ];

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    try {
      // Get current user (if logged in)
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const cartItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        image: product.imageUrl,
        description: product.description,
        color: product.colors,
      };

      // Add to cart - will work for both guest and logged-in users
      await addItem(cartItem, user || null);

      toast.success("Added to cart", {
        description: "Product has been added to your cart",
      });
    } catch (err) {
      toast.error("Error", {
        description: "Failed to add item to cart",
      });
      console.error(err);
    }
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error("Please sign in", {
        description: "You need to be signed in to add items to your wishlist",
      });
      return;
    }

    try {
      if (isInWishlist(product._id)) {
        await removeFromWishlist(product._id);
        toast.success("Success", {
          description: "Item removed from wishlist",
        });
      } else {
        await addToWishlist(product._id, product);
        toast.success("Success", {
          description: "Item added to wishlist",
        });
      }
    } catch (err) {
      toast.error("Error", {
        description: "Failed to update wishlist",
      });
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Category Badge */}
      <h3
        className={`font-medium text-lg ${
          product.isNew ? "text-orange-700" : "text-orange-700"
        }`}
      >
        {product.isNew ? "Just In" : "Promo Exclusion"}
      </h3>

      {/* Product Title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium text-gray-900">{product.name}</h1>
        <div className="text-base text-gray-600">{product.category}</div>
      </div>

      {/* Price */}
      <div className="text-lg font-semibold text-gray-900">
        {formatPrice(product.price)}
      </div>

      {/* Size Selection */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-base font-medium">Select Size</span>
          <button className="text-sm text-gray-600 hover:text-black">
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sizes.map((sizeOption) => (
            <button
              key={sizeOption.size}
              className={`
                py-3 px-4 text-sm border rounded
                ${
                  selectedSize === sizeOption.size
                    ? "border-black"
                    : "border-gray-300"
                }
                ${
                  !sizeOption.available
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-gray-600"
                }
              `}
              disabled={!sizeOption.available}
              onClick={() => setSelectedSize(sizeOption.size)}
            >
              {sizeOption.size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart and Favorite Buttons */}
      <div className="flex flex-col gap-2 mt-4">
        <Button
          className="w-full py-6 bg-black hover:bg-gray-800"
          onClick={handleAddToCart}
        >
          Add to Bag
        </Button>
        <Button
          variant="outline"
          className="w-full py-6 flex items-center justify-center gap-2"
          onClick={handleWishlistToggle}
        >
          <Heart
            className={`h-5 w-5 ${isInWishlist(product._id) ? "fill-red-500 text-red-500" : ""}`}
          />
          {isInWishlist(product._id)
            ? "Remove from Wishlist"
            : "Add to Wishlist"}
        </Button>
      </div>

      {/* Product Description */}
      <div className="mt-6">
        <p className="text-base text-gray-600">{product.description}</p>
      </div>

      {/* Accordions Section */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="shipping">
          <AccordionTrigger className="text-2xl font-medium">
            Shipping & Returns
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                Free standard shipping on orders Rs 14,000+ and free 30-day
                returns for Steplo Members. &nbsp;
                <Link
                  href="/help"
                  className="font-semibold underline underline-offset-2"
                >
                  Learn more
                </Link>
              </p>
              <p>
                <Link
                  href="/help"
                  className="font-semibold underline underline-offset-2"
                >
                  Return policy exclusions apply.
                </Link>
              </p>
              <p>
                <Link
                  href="/location"
                  className="font-semibold underline underline-offset-2"
                >
                  Pick-up available at select Steplo Stores
                </Link>
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reviews">
          <AccordionTrigger className="text-base font-medium">
            Reviews
          </AccordionTrigger>
          <AccordionContent>
            <ReviewSection productId={product._id} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
