import { Category, Product } from "@/types/product";

export interface FilterState {
  selectedCategories: string[];
  selectedPriceRanges: string[];
  selectedGenders: string[];
  selectedTopLink: string | null;
}

export interface FilterHandlers {
  handleCategoryChange: (category: string) => void;
  handlePriceRangeChange: (priceRange: string) => void;
  handleGenderChange: (gender: string) => void;
  handleTopLinkClick: (category: string) => void;
}

export interface ProductFiltersProps {
  products: Product[];
  categories?: Category[];
  onFilterChange: (filteredProducts: Product[]) => void;
} 