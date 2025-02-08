import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-[60px]  mb-10 pb-10">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div
      role="status"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-[60px]  mb-10 pb-10 border border-gray-200 rounded-sm shadow-sm animate-pulse"
    >
      {[...Array(9)].map((_, index) => (
        <div key={index}>
          <div className="flex items-center justify-center bg-[#e3e0e0] aspect-square rounded-sm mb-4">
            <svg
              className="w-10 h-10 text-[#c1bfbf]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-[#e3e0e0] rounded w-3/4" />
            <div className="h-4 bg-[#e3e0e0] rounded w-1/2" />
            <div className="h-4 bg-[#e3e0e0] rounded w-1/4" />
          </div>
        </div>
      ))}

      <span className="sr-only">Loading...</span>
    </div>
  );
}
