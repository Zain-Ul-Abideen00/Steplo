"use client";

import { useState } from "react";
import { SortingDropdown } from "./SortingDropdown";
import { Product, SortOption } from "@/types/product";

interface ProductSortProps {
  onSortChange: (sortedProducts: Product[]) => void;
  products: Product[];
}

export function ProductSort({ onSortChange, products }: ProductSortProps) {
  const [currentSort, setCurrentSort] = useState<SortOption>("featured");

  const handleSort = (sortOption: SortOption) => {
    let sortedProducts = [...products];

    switch (sortOption) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price); // Sort by price (low to high)
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price); // Sort by price (high to low)
        break;
      case "newest":
        sortedProducts = sortedProducts.filter(
          (product) => product.isNew === true
        ); // Filter new products
        sortedProducts.sort(
          (a, b) =>
            new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
        ); // Sort by creation date (newest first)
        break;
      case "promo":
        sortedProducts = sortedProducts.filter(
          (product) => product.isNew === false
        ); // Filter promo products
        sortedProducts.sort(
          (a, b) =>
            new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
        ); // Sort by creation date (newest first)
        break;
      default:
        sortedProducts.sort(
          (a, b) =>
            new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
        ); // Default sort by creation date (oldest first)
    }

    setCurrentSort(sortOption);
    onSortChange(sortedProducts);
  };

  return (
    <SortingDropdown currentSort={currentSort} onSortChange={handleSort} />
  );
}
