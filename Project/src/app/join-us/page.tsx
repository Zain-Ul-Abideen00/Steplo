"use client";

import JoinForm from "@/components/join-us/JoinForm";
import Image from "next/image";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";
import { fadeInUp, staggerContainer } from "@/lib/animation-variants";

export default function JoinUsPage() {
  return (
    <main className="min-h-screen w-full relative overflow-x-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      <div
        className="absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage: 'url("/pattern.svg")',
          backgroundSize: '200px',
          filter: 'contrast(0.95)',
        }}
      />

      {/* Enhanced Floating Shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Top Right Shape */}
        <motion.div
          initial={{ x: 100, y: -100, opacity: 0 }}
          animate={{
            x: 0,
            y: 0,
            opacity: 0.7,
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            scale: {
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }
          }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/[0.08] via-yellow-500/[0.05] to-transparent rounded-full blur-3xl"
        />
        {/* Bottom Left Shape */}
        <motion.div
          initial={{ x: -100, y: 100, opacity: 0 }}
          animate={{
            x: 0,
            y: 0,
            opacity: 0.7,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            scale: {
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut"
            }
          }}
          className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-red-500/[0.08] via-orange-500/[0.05] to-transparent rounded-full blur-3xl"
        />
      </motion.div>

      {/* New Content Layout */}
      <div className="relative min-h-screen flex flex-col items-center justify-start py-8 px-4 md:py-12">
        {/* Header Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="w-full max-w-[420px] text-center mb-6"
        >
          <Image
            src="/nike.svg"
            alt="Nike"
            width={50}
            height={50}
            className="w-auto h-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">
            BECOME A STEPLO MEMBER
          </h1>
          <p className="text-gray-500 text-sm">
            Create your Steplo Member profile and get first access to the very
            best of Steplo products.
          </p>
        </motion.div>

        {/* Main Card Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="w-full max-w-[420px] flex-1 flex flex-col"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 p-6 sm:p-8 hover:shadow-3xl transition-shadow duration-300"
          >
            <Suspense
              fallback={
                <div className="flex justify-center py-12">
                  <Loading variant="spinner" size="lg" className="text-gray-400" />
                </div>
              }
            >
              <JoinForm />
            </Suspense>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50"
          >
            <h3 className="font-semibold mb-4">Member Benefits</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Early Access to Products
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Exclusive Member Offers
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Birthday Rewards
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          variants={fadeInUp}
          className="w-full max-w-[420px] mt-6"
        >
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="hover:text-black transition-colors duration-200"
            >
              Help
            </motion.a>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="hover:text-black transition-colors duration-200"
            >
              Privacy
            </motion.a>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="hover:text-black transition-colors duration-200"
            >
              Terms
            </motion.a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
