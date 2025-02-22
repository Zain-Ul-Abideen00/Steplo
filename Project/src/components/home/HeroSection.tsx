"use client";

import Image from "next/image";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, buttonHover } from "@/lib/animation-variants";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="relative h-[65vh] sm:h-[85vh]"
      >
        <Image
          src="/hero2 (2).jpeg"
          alt="Hero"
          fill
          className="object-cover brightness-95"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="absolute inset-0 flex items-center backdrop-blur-[2px] justify-center "
      >
        <div className="text-center text-white max-w-4xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight drop-shadow-2xl"
          >
            Step Into Style
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-xl sm:text-2xl mb-10 font-light drop-shadow-md"
          >
            Discover the latest collection of premium footwear
          </motion.p>
          <motion.div
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
            className="flex gap-4 flex-wrap justify-center"
          >
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white/95 text-black hover:bg-white rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-xl"
              >
                Shop Now
              </Button>
            </Link>
            <Link href="/products?category=shoes">
              <Button
                size="lg"
                variant="outline"
                className="bg-black/30 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-black/50 hover:border-white hover:text-white rounded-full px-8 py-6 text-lg font-medium transition-all duration-300"
              >
                View Collections
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
