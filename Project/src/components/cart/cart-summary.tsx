"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInUp, buttonHover } from "@/lib/animation-variants";

export default function CartSummary() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4 sm:space-y-6 bg-gray-50 p-4 sm:p-6 rounded-lg"
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-xl sm:text-2xl font-semibold"
      >
        Summary
      </motion.h2>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="space-y-3 sm:space-y-4 text-sm sm:text-base"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-between"
        >
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between"
        >
          <span>Estimated Delivery & Handling</span>
          <span>-</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border-t border-gray-200 pt-4"
        >
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        whileHover="hover"
        whileTap="tap"
        variants={buttonHover}
      >
        <Link href="/checkout">
          <Button className="w-full rounded-full h-[50px] sm:h-[60px]">
            Proceed to Checkout
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
