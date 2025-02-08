"use client";

import { useState } from "react";

interface NavItem {
  title: string;
  links: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Icons",
    links: [
      { name: "Air Force 1", href: "/products?category=air-force-1" },
      { name: "Huarache", href: "/products?category=huarache" },
      { name: "Air Max 90", href: "/products?category=air-max-90" },
      { name: "Air Max 95", href: "/products?category=air-max-95" },
    ],
  },
  {
    title: "Shoes",
    links: [
      { name: "All Shoes", href: "/products?category=shoes" },
      { name: "Custom Shoes", href: "/products?category=custom-shoes" },
      { name: "Jordan Shoes", href: "/products?category=jordan-shoes" },
      { name: "Running Shoes", href: "/products?category=running-shoes" },
    ],
  },
  {
    title: "Clothing",
    links: [
      { name: "All Clothing", href: "/products?category=clothing" },
      { name: "Modest Wear", href: "/products?category=modest-wear" },
      {
        name: "Hoodies & Pullovers",
        href: "/products?category=hoodies-and-pullovers",
      },
      { name: "Shirts & Tops", href: "/products?category=shirts-and-tops" },
    ],
  },
  {
    title: "Kids'",
    links: [
      {
        name: "Infant & Toddler Shoes",
        href: "/products?category=infant-and-toddler-shoes",
      },
      { name: "Kids' Shoes", href: "/products?category=kids-shoes" },
      {
        name: "Kids' Jordan Shoes",
        href: "/products?category=kids-jordan-shoes",
      },
      {
        name: "Kids' Basketball Shoes",
        href: "/products?category=kids-basketball-shoes",
      },
    ],
  },
];

export const FooterNav = () => {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <nav className="mx-auto px-5 sm:px-10 py-16">
      {/* Desktop View */}
      <div className="hidden md:flex justify-between">
        {navItems.map((section, index) => (
          <div key={index} className="w-[184px]">
            <h3 className="text-[#111111] text-[16px] font-medium mb-6">
              {section.title}
            </h3>
            <ul className="space-y-3">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={link.href}
                    className="text-[#757575] text-[14px] hover:text-[#111111] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {navItems.map((section, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleSection(index)}
              className="w-full py-4 px-2 flex justify-between items-center"
            >
              <h3 className="text-[#111111] text-[16px] font-medium">
                {section.title}
              </h3>
              <svg
                className={`w-4 h-4 transition-transform ${
                  openSections.includes(index) ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Collapsible Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSections.includes(index)
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-3 px-2 pb-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-[#757575] text-[14px] hover:text-[#111111] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};
