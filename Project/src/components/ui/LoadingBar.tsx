"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start loading animation
    setIsVisible(true);
    const timer = setTimeout(() => {
      setProgress(100);
      // Hide the loading bar after completion
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.8,
            }}
            className="h-1 bg-gradient-to-r from-[#111111] via-[#666666] to-[#111111] rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
