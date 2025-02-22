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
import { motion } from "framer-motion";
import { Loading } from "../ui/loading";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const GearUp = () => {
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const products = await getProducts();

        const mensProducts = products
          .filter((product: Product) => {
            const category = product.category.toLowerCase();
            return (
              (category === "mens-top" || category === "mens-shorts") &&
              !category.includes("womens")
            );
          })
          .slice(0, 6);

        const womensProducts = products
          .filter(
            (product: Product) =>
              product.category.toLowerCase().includes("womens-top") ||
              product.category.toLowerCase().includes("womens-shorts")
          )
          .slice(0, 6);

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
    return (
      <div className="mx-auto px-5 sm:px-10 mb-8 sm:mb-16 space-y-4">
        <Loading variant="productGrid" count={4} />
      </div>
    );
  }

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="mx-auto px-5 sm:px-10 mb-8 sm:mb-16"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl text-[#111111] font-semibold"
        >
          Gear Up
        </motion.h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[4%]">
        {/* Men's Section */}
        <motion.div
          className={`w-full lg:w-[666px] transition-opacity duration-500 `}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-base sm:text-lg font-medium">Shop Men&apos;s</span>
              <div className="flex gap-3">
                <CarouselPrevious className="static w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 translate-y-0" />
                <CarouselNext className="static w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 translate-y-0" />
              </div>
            </div>

            <CarouselContent className="-ml-2 sm:-ml-4">
              {menProducts.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="pl-2 sm:pl-4 basis-full sm:basis-1/2"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>

        {/* Women's Section */}
        <motion.div
          className={`w-full lg:w-[666px] transition-opacity duration-500`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-base sm:text-lg font-medium">Shop Women&apos;s</span>
              <div className="flex gap-3">
                <CarouselPrevious className="static w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 translate-y-0" />
                <CarouselNext className="static w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 translate-y-0" />
              </div>
            </div>

            <CarouselContent className="-ml-2 sm:-ml-4">
              {womenProducts.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="pl-2 sm:pl-4 basis-full sm:basis-1/2"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </motion.section>
  );
};
