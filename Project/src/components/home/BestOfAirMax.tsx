"use client";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/lib/sanity.queries";
import { Product } from "@/types/product";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

export const BestOfAirMax = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAirMaxProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const allProducts = await getProducts();
        // Filter products to get Air Max products
        const airMaxProducts = allProducts
          .filter((product: Product) =>
            product.name.toLowerCase().includes("air max")
          )
          .slice(0, 6); // Limit to 6 products
        setProducts(airMaxProducts);
      } catch (error) {
        console.error("Error fetching Air Max products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAirMaxProducts();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <section className="w-full py-8 sm:py-[64px]">
      <div className="mx-auto px-5 sm:px-10">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          {/* Header with Navigation */}
          <div className="flex justify-between items-center h-auto sm:h-[52px] mb-4 sm:mb-[12px]">
            <h2 className="text-xl sm:text-[24px] text-[#111111] font-medium">
              Best of Air Max
            </h2>
            <div className="flex gap-2 sm:gap-[12px]">
              <CarouselPrevious
                aria-label="Previous slide"
                className="static w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-full bg-[#E5E5E5] hover:bg-[#DADADA] translate-y-0 flex items-center justify-center"
              />
              <CarouselNext
                aria-label="Next slide"
                className="static w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-full bg-[#E5E5E5] hover:bg-[#DADADA] translate-y-0 flex items-center justify-center"
              />
            </div>
          </div>

          {/* Product Slider */}
          <CarouselContent className="flex -ml-3 sm:-ml-4">
            {isLoading
              ? // Loading skeleton
                Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <ProductCardSkeleton />
                    </CarouselItem>
                  ))
              : products.map((product: Product) => (
                  <CarouselItem
                    key={product._id}
                    className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
