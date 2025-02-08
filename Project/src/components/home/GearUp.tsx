"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "../products/ProductCard";
import { getProducts } from "@/lib/sanity.queries";
import { Product } from "@/types/product";

export const GearUp = () => {
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Fetch all products from Sanity
        const products = await getProducts();

        // Filter products for men's tops and shorts
        const mensProducts = products
          .filter((product: Product) => {
            const category = product.category.toLowerCase();
            return (
              (category === "mens-top" || category === "mens-shorts") &&
              !category.includes("womens")
            );
          })
          .slice(0, 6);

        // Filter products for women's tops and shorts
        const womensProducts = products
          .filter(
            (product: Product) =>
              product.category.toLowerCase().includes("womens-top") ||
              product.category.toLowerCase().includes("womens-shorts")
          )
          .slice(0, 6); // Limit to 6 products

        // Sort to group tops and shorts together
        const sortedMensProducts = [...mensProducts].sort((a, b) =>
          a.category.localeCompare(b.category)
        );

        const sortedWomensProducts = [...womensProducts].sort((a, b) =>
          a.category.localeCompare(b.category)
        );

        setMenProducts(sortedMensProducts);
        setWomenProducts(sortedWomensProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Consider adding a proper loading skeleton
  }

  return (
    <section className="mx-auto px-5 sm:px-10 mb-8 sm:mb-16">
      <h2 className="text-xl sm:text-[24px] text-[#111111] font-medium mb-4 sm:mb-[25px]">
        Gear Up
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[4%]">
        {/* Men's Section */}
        <div className="w-full lg:w-[666px]">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm sm:text-[16px]">Shop Men&apos;s</span>
              <div className="flex gap-3">
                <CarouselPrevious className="static w-12 h-12 rounded-full bg-[#E5E5E5] hover:bg-[#D4D4D4] translate-y-0" />
                <CarouselNext className="static w-12 h-12 rounded-full bg-[#E5E5E5] hover:bg-[#D4D4D4] translate-y-0" />
              </div>
            </div>

            <CarouselContent className="-ml-2 sm:-ml-4">
              {menProducts.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="pl-2 sm:pl-4 basis-full sm:basis-1/2"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Women's Section */}
        <div className="w-full lg:w-[666px]">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm sm:text-[16px]">Shop Women&apos;s</span>
              <div className="flex gap-3">
                <CarouselPrevious className="static w-12 h-12 rounded-full bg-[#E5E5E5] hover:bg-[#D4D4D4] translate-y-0" />
                <CarouselNext className="static w-12 h-12 rounded-full bg-[#E5E5E5] hover:bg-[#D4D4D4] translate-y-0" />
              </div>
            </div>

            <CarouselContent className="-ml-2 sm:-ml-4">
              {womenProducts.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="pl-2 sm:pl-4 basis-full sm:basis-1/2"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
