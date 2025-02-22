"use client";

import { Product } from "@/types/product";
import { ProductInfo } from "./ProductInfo";
import Image from "next/image";
import { useState } from "react";
import { Loading } from "@/components/ui/loading";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInUp, scaleUp } from "@/lib/animation-variants";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1000px] mx-auto"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-8">
        {/* Left side - Product Images */}
        <motion.div
          variants={scaleUp}
          initial="initial"
          animate="animate"
          className="lg:sticky lg:top-[20px] flex-1 w-full h-fit"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100"
          >
            {imageLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
              >
                <Loading variant="shimmer" />
              </motion.div>
            )}
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover transition-all duration-300",
                imageLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setImageLoading(false)}
              priority
            />
          </motion.div>
        </motion.div>

        {/* Right side - Product Information */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="flex-1 lg:max-w-[400px] lg:pe-16"
        >
          <ProductInfo product={product} />
        </motion.div>
      </div>
    </motion.div>
  );
}
