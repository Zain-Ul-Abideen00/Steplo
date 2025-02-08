import { Filter } from "lucide-react";
import { Button } from "../ui/Button";
import { ProductSort } from "./ProductSort";
import { Product } from "@/types/product";

interface ProductHeaderProps {
  totalProducts: number;
  onFilterToggle: () => void;
  isFilterVisible: boolean;
  products: Product[];
  onSortChange: (sortedProducts: Product[]) => void;
  isLoading: boolean;
}

export function ProductHeader({
  totalProducts,
  onFilterToggle,
  isFilterVisible,
  products,
  onSortChange,
  isLoading,
}: ProductHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white mt-4 pb-3">
      <div className="h-[51px] flex items-end justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            {isLoading ? (
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
            ) : (
              `New (${totalProducts})`
            )}
          </h2>
        </div>

        <div className="flex lg:flex-row flex-col lg:items-center items-end gap-4">
          {/* Filter Toggle Button */}
          <Button
            variant="ghost"
            onClick={onFilterToggle}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden lg:inline">
              {isFilterVisible ? "Hide Filters" : "Show Filters"}
            </span>
            <span className="lg:hidden">
              {isFilterVisible ? "Show Filters" : "Hide Filters"}
            </span>
          </Button>

          {/* Sort Dropdown */}
          <ProductSort products={products} onSortChange={onSortChange} />
        </div>
      </div>
    </header>
  );
}
