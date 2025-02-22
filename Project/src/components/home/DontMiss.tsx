"use client";

import Image from "next/image";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, buttonHover, imageZoom } from "@/lib/animation-variants";
import Link from "next/link";

export const DontMiss = () => {
  const router = useRouter();

  const handleShopClick = () => {
    router.push("/products");
  };

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="mx-auto px-5 sm:px-10 py-16 sm:py-24 bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <motion.div
        variants={fadeIn}
        className=" mx-auto"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl text-[#111111] font-semibold mb-6 sm:mb-10"
        >
          Don&apos;t Miss
        </motion.h2>

        <div className="w-full">
          {/* Main Image Container */}
          <motion.div
            variants={fadeIn}
            className="relative w-full h-[300px] sm:h-[500px] lg:h-[700px] mb-8 sm:mb-12 overflow-hidden rounded-2xl group"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

            {/* Image */}
            <motion.div
              variants={imageZoom}
              initial="initial"
              whileHover="hover"
              className="relative w-full h-full"
            >
              <Image
                src="/Hero/flight-essentials.png"
                alt="Flight Essentials"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover"
              />
            </motion.div>

            {/* Content Overlay - Visible on medium and larger screens */}
            <motion.div
              variants={fadeInUp}
              className="hidden md:flex absolute inset-0 z-20 items-end justify-center pb-16 px-4"
            >
              <div className="text-center text-white max-w-3xl">
                <motion.h3
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
                >
                  FLIGHT ESSENTIALS
                </motion.h3>
                <motion.p
                  variants={fadeInUp}
                  className="text-lg sm:text-xl text-white/90 mb-8 font-light"
                >
                  Your built-to-last, all-week wears—but with style only Jordan Brand
                  can deliver.
                </motion.p>
                <motion.div
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex gap-4 justify-center"
                >
                  <Button
                    onClick={handleShopClick}
                    className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    Shop Collection
                  </Button>
                  <Link href="/products?category=shoes">
                  <Button
                size="lg"
                variant="outline"
                className="bg-black/30 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-black/50 hover:border-white hover:text-white rounded-full px-8 py-6 text-lg font-medium transition-all duration-300"
              >
                Learn More
              </Button>
              </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Content - Only visible on small screens */}
          <motion.div
            variants={fadeInUp}
            className="md:hidden text-center px-4"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold mb-4 text-[#111111]"
            >
              FLIGHT ESSENTIALS
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-gray-700 mb-6"
            >
              Your built-to-last, all-week wears—but with style only Jordan Brand
              can deliver.
            </motion.p>
            <motion.div
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={handleShopClick}
                className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
              >
                Shop Collection
              </Button>
              <Button
                onClick={() => router.push('/products?category=essentials')}
                className="bg-transparent border-2 border-black text-black hover:bg-black/5 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};
