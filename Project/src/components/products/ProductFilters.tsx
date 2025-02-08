"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TopLinks } from "./filters/TopLinks";
import { FilterSections } from "./filters/FilterSections";
import { useProductFilters } from "./filters/useProductFilters";
import { ProductFiltersProps } from "./filters/types";

export function ProductFilters({
  products,
  categories,
  onFilterChange,
}: ProductFiltersProps) {
  const {
    selectedCategories,
    selectedPriceRanges,
    selectedGenders,
    selectedTopLink,
    handleTopLinkClick,
    handleCategoryChange,
    handlePriceRangeChange,
    handleGenderChange,
  } = useProductFilters(products, onFilterChange);

  return (
    <div className="sticky top-14 w-[260px] flex-shrink-0 border-r">
      <ScrollArea className="h-[calc(100vh-9rem)] pt-5">
        <TopLinks
          selectedTopLink={selectedTopLink}
          onTopLinkClick={handleTopLinkClick}
        />
        <FilterSections
          categories={categories}
          selectedCategories={selectedCategories}
          selectedPriceRanges={selectedPriceRanges}
          selectedGenders={selectedGenders}
          handleCategoryChange={handleCategoryChange}
          handlePriceRangeChange={handlePriceRangeChange}
          handleGenderChange={handleGenderChange}
        />
      </ScrollArea>
    </div>
  );
}
