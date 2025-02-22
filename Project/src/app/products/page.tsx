"use client";

import { ProductFilters } from "@/components/products/ProductFilters";
import {
  ProductGrid
} from "@/components/products/ProductGrid";
import { ProductHeader } from "@/components/products/ProductHeader";
import { RelatedCategories } from "@/components/products/RelatedCategories";
import { useState, useEffect, useCallback } from "react";
import { Product, Category } from "@/types/product";
import { getProducts } from "@/lib/sanity.queries";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Pagination } from "@/components/ui/pagination";
import { Loading } from "@/components/ui/loading";

const ITEMS_PER_PAGE = 9; // Number of products per page

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from Sanity
  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const products = await getProducts();
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleSortChange = (sortedProducts: Product[]) => {
    setFilteredProducts(sortedProducts);
  };

  const toggleFilter = () => {
    if (window.innerWidth < 1024) {
      setIsMobileFilterVisible(!isMobileFilterVisible);
    } else {
      setIsFilterVisible(!isFilterVisible);
    }
  };

  const categories: Category[] = [
    { id: "1", name: "Men's Shoes", value: "mens-shoes" },
    { id: "2", name: "Women's Shoes", value: "womens-shoes" },
    { id: "3", name: "Men's Shorts", value: "mens-shorts" },
    { id: "4", name: "Women's Shorts", value: "womens-shorts" },
    { id: "5", name: "Men's Top", value: "mens-top" },
    { id: "6", name: "Women's Top", value: "womens-top" },
    { id: "7", name: "Kids", value: "kids" },
  ];

  const handleFilterChange = useCallback((filteredProducts: Product[]) => {
    setFilteredProducts(filteredProducts);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto px-5 sm:px-10 py-8">
      <ProductHeader
        totalProducts={products.length}
        onFilterToggle={toggleFilter}
        isFilterVisible={isFilterVisible}
        products={products}
        onSortChange={handleSortChange}
        isLoading={isLoading}
      />
      <div
        className={`flex gap-8 ${isFilterVisible ? "" : "lg:flex-row-reverse"}`}
      >
        {isFilterVisible && (
          <aside className="w-64 hidden lg:block">
            <ProductFilters
              products={products}
              categories={categories}
              onFilterChange={handleFilterChange}
            />
          </aside>
        )}
        <main className={`flex-1 ${isFilterVisible ? "" : "w-full"}`}>
          {isLoading ? (
            <Loading variant="productGrid" count={9} />
          ) : (
            <>
              <ProductGrid products={paginatedProducts} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={filteredProducts.length}
                showItemsPerPage={true}
              />
            </>
          )}
          <RelatedCategories />
        </main>
      </div>

      {/* Mobile Sheet */}
      <Sheet
        open={isMobileFilterVisible}
        onOpenChange={setIsMobileFilterVisible}
      >
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <ProductFilters
            products={products}
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
