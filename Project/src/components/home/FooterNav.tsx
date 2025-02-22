"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, listItem, staggerContainer, buttonHover } from "@/lib/animation-variants";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const pathname = usePathname();

  // Reset open sections when route changes
  useEffect(() => {
    setOpenSections([]);
  }, [pathname]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <motion.nav
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mx-auto px-5 sm:px-10 py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop View */}
        <motion.div
          variants={fadeInUp}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16"
        >
          {navItems.map((section, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="space-y-8"
              onHoverStart={() => setActiveSection(index)}
              onHoverEnd={() => setActiveSection(null)}
            >
              <motion.h3
                className="text-[#111111] text-xl font-semibold relative inline-block"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {section.title}
                {activeSection === index && (
                  <motion.div
                    layoutId="sectionHighlight"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-black rounded-full"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.h3>
              <motion.ul
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-5"
              >
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    variants={listItem}
                    whileHover={{ x: 4 }}
                    onHoverStart={() => setHoveredLink(link.name)}
                    onHoverEnd={() => setHoveredLink(null)}
                    className="transform-gpu"
                  >
                    <Link
                      href={link.href}
                      className="relative text-gray-600 text-[15px] hover:text-black transition-colors duration-200 block py-1"
                    >
                      {link.name}
                      {hoveredLink === link.name && (
                        <motion.div
                          layoutId="linkUnderline"
                          className="absolute left-0 right-0 h-0.5 bg-black bottom-0"
                          initial={{ opacity: 0, width: "0%" }}
                          animate={{ opacity: 1, width: "100%" }}
                          exit={{ opacity: 0, width: "0%" }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View */}
        <motion.div
          variants={fadeInUp}
          className="md:hidden space-y-3"
        >
          {navItems.map((section, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="border-b border-gray-200 last:border-b-0"
              initial={{ backgroundColor: "transparent" }}
              animate={{
                backgroundColor: openSections.includes(index) ? "rgba(249, 250, 251, 0.5)" : "transparent",
                borderRadius: openSections.includes(index) ? "1rem" : "0"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                variants={buttonHover}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleSection(index)}
                className="w-full py-6 px-4 flex justify-between items-center group"
              >
                <motion.h3
                  className="text-[#111111] text-lg font-medium group-hover:text-black transition-colors flex items-center gap-3"
                  animate={{
                    color: openSections.includes(index) ? "#000000" : "#111111"
                  }}
                >
                  {openSections.includes(index) && (
                    <motion.div
                      layoutId="activeDot"
                      className="w-1.5 h-1.5 bg-black rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  {section.title}
                </motion.h3>
                <motion.div
                  animate={{
                    rotate: openSections.includes(index) ? 180 : 0,
                    scale: openSections.includes(index) ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3, ease: "anticipate" }}
                  className="w-5 h-5 text-gray-600 group-hover:text-black"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="w-full h-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence mode="wait">
                {openSections.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2, delay: 0.1 }
                      }
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    className="overflow-hidden bg-gray-50/50 rounded-b-xl"
                  >
                    <motion.ul
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                      className="space-y-4 px-6 py-4"
                    >
                      {section.links.map((link, linkIndex) => (
                        <motion.li
                          key={linkIndex}
                          variants={listItem}
                          whileHover={{ x: 4 }}
                          className="transform-gpu"
                        >
                          <Link
                            href={link.href}
                            className="text-gray-600 text-[15px] hover:text-black transition-colors duration-200 block py-2"
                          >
                            {link.name}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};
