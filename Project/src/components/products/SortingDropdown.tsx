"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SortProps, SortOption } from "@/types/product"

export function SortingDropdown({ onSortChange, currentSort }: SortProps) {
  return (
    <Select value={currentSort} onValueChange={(value: SortOption) => onSortChange(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="promo">Promo</SelectItem>
      </SelectContent>
    </Select>
  )
}