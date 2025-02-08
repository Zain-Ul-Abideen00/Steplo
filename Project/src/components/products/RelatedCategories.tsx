"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"

const categories = [
  { id: "1", name: "Best Selling Products", href: "/products" },
  { id: "2", name: "Best Shoes", href: "/products" },
  { id: "3", name: "New Basketball Shoes", href: "/products" },
  { id: "4", name: "New Football Shoes", href: "/products" },
  { id: "5", name: "New Men's Shoes", href: "/products" },
  { id: "6", name: "New Running Shoes", href: "/products" },
  { id: "7", name: "Best Men's Shoes", href: "/products" },
  { id: "8", name: "New Jordan Shoes", href: "/products" },
  { id: "9", name: "Best Women's Shoes", href: "/products" },
  { id: "10", name: "Best Training & Gym", href: "/products" },
]

export function RelatedCategories() {
  return (
    <section className="w-full border-t border-gray-200 py-6 my-6">
      <div className="container ">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Related Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={cn(
                "inline-flex items-center px-6 py-2 rounded-full text-sm",
                "bg-white border border-gray-300 hover:border-gray-400",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 