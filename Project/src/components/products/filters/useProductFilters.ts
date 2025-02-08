import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { FilterState } from "./types";
import { priceRanges } from "./constants";

export function useProductFilters(
  products: Product[],
  onFilterChange: (filteredProducts: Product[]) => void
) {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedCategories: [],
    selectedPriceRanges: [],
    selectedGenders: [],
    selectedTopLink: null,
  });

  // Memoize the filter function
  const filterProducts = useCallback(() => {
    let filteredProducts = [...products];

    const { selectedTopLink, selectedCategories, selectedGenders, selectedPriceRanges } = filterState;

    // Apply top link filter
    if (selectedTopLink) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category.toLowerCase().includes(selectedTopLink.toLowerCase())
      );
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.some((category) => {
          const productCategory = product.category.toLowerCase().trim();
          const selectedCategory = category.toLowerCase().trim();
          return productCategory === selectedCategory;
        })
      );
    }

    // Apply gender filters
    if (selectedGenders.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        const productCategory = product.category.toLowerCase();
        return selectedGenders.some((gender) => {
          switch (gender) {
            case "men":
              return productCategory.startsWith("men") && !productCategory.includes("women");
            case "women":
              return productCategory.includes("women");
            case "kids":
              return productCategory.includes("kids");
            default:
              return false;
          }
        });
      });
    }

    // Apply price range filters
    if (selectedPriceRanges.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId);
          return range ? product.price >= range.min && product.price <= range.max : false;
        })
      );
    }

    return filteredProducts;
  }, [products, filterState]);

  // Apply filters when dependencies change
  useEffect(() => {
    const filteredProducts = filterProducts();
    onFilterChange(filteredProducts);
  }, [filterProducts, onFilterChange]);

  // Handlers
  const handleTopLinkClick = useCallback((category: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedTopLink: prev.selectedTopLink === category ? null : category,
    }));
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }));
  }, []);

  const handlePriceRangeChange = useCallback((priceRange: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedPriceRanges: prev.selectedPriceRanges.includes(priceRange)
        ? prev.selectedPriceRanges.filter((p) => p !== priceRange)
        : [...prev.selectedPriceRanges, priceRange],
    }));
  }, []);

  const handleGenderChange = useCallback((gender: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedGenders: prev.selectedGenders.includes(gender)
        ? prev.selectedGenders.filter((g) => g !== gender)
        : [...prev.selectedGenders, gender],
    }));
  }, []);

  return {
    ...filterState,
    handleTopLinkClick,
    handleCategoryChange,
    handlePriceRangeChange,
    handleGenderChange,
  };
} 