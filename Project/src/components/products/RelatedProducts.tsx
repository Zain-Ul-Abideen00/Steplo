"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";
import { getProducts } from "@/lib/sanity.queries";
import { Product } from "@/types/product";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelatedProductsProps {
  currentProduct?: Product;
  pageType: "product" | "wishlist" | "cart";
  category?: string;
  limit?: number;
}

interface SectionDetails {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
}

type PageTypeDetails = {
  [key in "product" | "wishlist" | "cart"]: SectionDetails;
};

export function RelatedProducts({
  currentProduct,
  pageType,
  category,
  limit = 6,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const getSectionDetails = useCallback(() => {
    const details: PageTypeDetails = {
      product: {
        heading: "You Might Also Like",
        subheading: "Based on your selection",
        ctaText: "View More Like This",
        ctaLink: `/products?category=${category}`,
      },
      wishlist: {
        heading: "Popular Right Now",
        subheading: "Trending products our customers love",
        ctaText: "Shop All Popular",
        ctaLink: "/products?sort=popular",
      },
      cart: {
        heading: "Complete Your Look",
        subheading: "Perfect additions to your cart",
        ctaText: "Explore More",
        ctaLink: "/products",
      },
    };
    return details[pageType] || details.product;
  }, [pageType, category]);

  const fetchRelatedProducts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);
      
      const allProducts = await getProducts();
      let filteredProducts = allProducts.filter((p: Product) => 
        currentProduct ? p._id !== currentProduct._id : true
      );

      if (category) {
        const categoryProducts = filteredProducts.filter((product: Product) =>
          product.category.toLowerCase().includes(category.toLowerCase())
        );
        
        if (categoryProducts.length >= limit) {
          filteredProducts = categoryProducts;
        } else {
          const remainingCount = limit - categoryProducts.length;
          const otherProducts = filteredProducts
            .filter((p: Product) => !categoryProducts.includes(p))
            .sort(() => 0.5 - Math.random())
            .slice(0, remainingCount);
          
          filteredProducts = [...categoryProducts, ...otherProducts];
        }
      }

      const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
      setProducts(shuffled.slice(0, limit));
    } catch (error) {
      console.error("Error fetching related products:", error);
      setError("Failed to load related products");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [currentProduct, category, limit]);

  useEffect(() => {
    fetchRelatedProducts();
  }, [fetchRelatedProducts]);

  const sectionDetails = getSectionDetails();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto px-5 sm:px-10 py-16 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {sectionDetails.heading}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {sectionDetails.subheading}
            </p>
          </motion.div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => fetchRelatedProducts(true)}
              className={cn(
                "rounded-full transition-all duration-300",
                isRefreshing && "animate-spin"
              )}
              disabled={isRefreshing}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => router.push(sectionDetails.ctaLink)}
              className="hidden sm:flex items-center gap-2 rounded-full"
            >
              {sectionDetails.ctaText}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-red-500 mb-4">{error}</p>
              <Button 
                variant="outline"
                onClick={() => fetchRelatedProducts()}
                className="rounded-full"
              >
                Try Again
              </Button>
            </motion.div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-3 sm:-ml-4">
                {isLoading
                  ? Array(limit)
                      .fill(0)
                      .map((_, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                        >
                          <ProductCardSkeleton />
                        </CarouselItem>
                      ))
                  : products.map((product, index) => (
                      <CarouselItem
                        key={product._id}
                        className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                      >
                        <motion.div
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="h-full"
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      </CarouselItem>
                    ))}
              </CarouselContent>

              <div className="flex justify-end items-center gap-2 mt-8">
                <CarouselPrevious className="static w-10 h-10 rounded-full bg-white hover:bg-gray-50 shadow-md" />
                <CarouselNext className="static w-10 h-10 rounded-full bg-white hover:bg-gray-50 shadow-md" />
              </div>
            </Carousel>
          )}
        </AnimatePresence>

        <Button
          onClick={() => router.push(sectionDetails.ctaLink)}
          className="w-full sm:hidden mt-8 rounded-full"
        >
          {sectionDetails.ctaText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.section>
  );
}
