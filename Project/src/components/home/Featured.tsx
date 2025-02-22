"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export const Featured = () => {
  const router = useRouter();

  const handleFindShoe = () => {
    router.push("/products?category=shoes");
  };

  return (
    <section className="mx-auto px-5 sm:px-10 py-16 sm:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl text-[#111111] font-semibold mb-6 sm:mb-10"
      >
        Featured
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        {/* Container for responsive layout */}
        <div className="flex flex-col">
          {/* Hero Image Container */}
          <div className="relative w-full h-[400px] sm:h-[600px] lg:h-[700px] overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 hidden md:block" />
            <div className="relative w-full h-full">
              <Image
                src="/Hero/featured.png"
                alt="Featured Nike Shoes"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>

            {/* Content Container - Only visible on md and up */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hidden md:flex absolute inset-0 z-20 flex-col items-center justify-end text-center pb-24 px-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl leading-tight font-bold text-white max-w-4xl mb-6 sm:mb-8">
                STEP INTO WHAT FEELS GOOD
              </h1>

              <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl">
                Cause everyone should know the feeling of running in that perfect pair.
              </p>

              <div className="flex gap-4 flex-wrap justify-center">
                <Button
                  onClick={handleFindShoe}
                  className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Find Your Shoe
                </Button>
                <Button
                size="lg"
                variant="outline"
                className="bg-black/30 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-black/50 hover:border-white hover:text-white rounded-full px-8 py-6 text-lg font-medium transition-all duration-300"
              >
                Browse Collections
              </Button>
              </div>
            </motion.div>
          </div>

          {/* Content Container - Only visible on mobile */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:hidden flex flex-col items-center justify-end text-center mt-8 px-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl leading-tight font-bold text-black max-w-4xl mb-6 sm:mb-8">
              STEP INTO WHAT FEELS GOOD
            </h1>

            <p className="text-lg sm:text-xl text-black/80 mb-8 sm:mb-10 max-w-2xl">
              Cause everyone should know the feeling of running in that perfect pair.
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <Button
                onClick={handleFindShoe}
                className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-lg"
              >
                Find Your Shoe
              </Button>
              <Link href="/products?category=shoes">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-black text-black hover:bg-black/10 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300"
              >
                Browse Collection
              </Button>
            </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
