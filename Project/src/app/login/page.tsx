"use client";

import { LoginHeader } from "@/components/login/LoginHeader";
import LoginForm from "@/components/login/LoginForm";
import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";
import { motion} from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animation-variants";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full relative overflow-hidden">
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
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-black/[0.4] via-purple-500/[0.05] to-transparent rounded-full blur-3xl"
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
          className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-black/[0.8] via-blue-500/[0.05] to-transparent rounded-full blur-3xl"
        />
      </motion.div>

      {/* Content Container */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="w-full max-w-[420px]"
        >
          {/* Enhanced Card */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 p-8 sm:p-10 hover:shadow-3xl transition-shadow duration-300"
          >
            <Suspense
              fallback={
                <div className="flex justify-center py-12">
                  <Loading variant="spinner" size="lg" className="text-gray-400" />
                </div>
              }
            >
              <LoginHeader />
              <LoginForm />
            </Suspense>
          </motion.div>

          {/* Enhanced Footer Links */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 text-center"
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
        </motion.div>
      </div>
    </main>
  );
}
