import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { WishlistButton } from "./WishlistButton";
import { motion } from "framer-motion";
import { fadeInUp, imageZoom } from "@/lib/animation-variants";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Fallback image URL if imageUrl is missing
  const imageUrl = product.imageUrl || "/path/to/fallback-image.jpg";

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Product Card Container */}
        <div className="product-card transition-opacity duration-300 group-hover:opacity-90">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <motion.div
              variants={imageZoom}
              initial="initial"
              whileHover="hover"
              className="relative h-full w-full"
            >
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover w-auto h-auto"
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
                priority
              />
            </motion.div>
            {/* Product Badge */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`absolute top-2 left-2 px-2 py-1 text-sm ${
                product.isNew ? "" : "bg-orange-700 text-white"
              }`}
            >
              {product.isNew ? "" : "Promo Exclusion"}
            </motion.span>
            {/* Add WishlistButton in top-right corner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-2 right-2"
            >
              <WishlistButton productId={product._id} product={product} />
            </motion.div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 space-y-1"
          >
            <h3
              className={`font-medium text-lg ${
                product.isNew ? "text-orange-700" : "text-orange-700"
              }`}
            >
              {product.isNew ? "Just In" : "Promo Exclusion"}
            </h3>
            <h3 className="font-medium text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-sm text-gray-500">
              {product.colors} {product.colors === 1 ? "Color" : "Colors"}
            </p>
            <p className="font-medium">
              MRP : Rs {product.price.toLocaleString()}
            </p>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
