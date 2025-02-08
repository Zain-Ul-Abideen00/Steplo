"use client";

import { Product } from "@/types/product";
import { ProductInfo } from "./ProductInfo";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-8">
        {/* Left side - Product Images */}
        <div className="lg:sticky lg:top-[20px] flex-1 w-full h-fit">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-300  ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              priority
            />
          </div>
        </div>

        {/* Right side - Product Information */}
        <div className="flex-1 lg:max-w-[400px] lg:pe-16">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
