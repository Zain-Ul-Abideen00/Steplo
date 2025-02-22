import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animation-variants";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-[60px] mb-10 pb-10"
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </motion.div>
  );
}
