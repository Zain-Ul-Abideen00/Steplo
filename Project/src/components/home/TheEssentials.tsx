"use client";

import Image from "next/image";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, buttonHover, imageZoom, staggerContainer } from "@/lib/animation-variants";

interface EssentialCard {
  image: string;
  category: string;
  filterValue: string;
  description: string;
}

const essentials: EssentialCard[] = [
  {
    image: "/Hero/mens-essentials.png",
    category: "Men's",
    filterValue: "mens",
    description: "Elevate your everyday style with our men's collection",
  },
  {
    image: "/Hero/womens-essentials.png",
    category: "Women's",
    filterValue: "womens",
    description: "Discover the perfect blend of comfort and fashion",
  },
  {
    image: "/Hero/kids-essentials.png",
    category: "Kid's",
    filterValue: "kids",
    description: "Fun, comfortable styles for your little ones",
  },
];

export const TheEssentials = () => {
  const router = useRouter();

  const handleCategoryClick = (filterValue: string) => {
    router.push(`/products?category=${filterValue}`);
  };

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mx-auto px-5 sm:px-10 py-16 sm:py-24 bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div className="mx-auto">
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl text-[#111111] font-semibold mb-6 sm:mb-10"
        >
          The Essentials
        </motion.h2>

        {/* Cards Container */}
        <motion.div
          variants={fadeIn}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {essentials.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => handleCategoryClick(item.filterValue)}
            >
              {/* Image Container */}
              <motion.div
                variants={imageZoom}
                initial="initial"
                whileHover="hover"
                className="relative w-full h-[400px] sm:h-[580px]"
              >
                <Image
                  src={item.image}
                  alt={`${item.category} Essentials`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              </motion.div>

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  {item.category}
                </h3>
                <p className="text-white/90 text-base sm:text-lg mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
                <motion.div
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(item.filterValue);
                  }}
                >
                  <Button
                    variant="secondary"
                    className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-4 text-base font-medium transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
                  >
                    Shop {item.category}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
