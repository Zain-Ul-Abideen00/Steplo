"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animation-variants";

export default function NewsletterCheckbox() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200"
    >
      <Checkbox
        id="newsletter"
        className="mt-1 h-5 w-5 rounded-md border-2 border-gray-300 data-[state=checked]:border-black data-[state=checked]:bg-black"
      />
      <div className="space-y-1">
        <label
          htmlFor="newsletter"
          className="text-sm font-medium text-gray-700 leading-tight block cursor-pointer"
        >
          Stay Updated with Steplo
        </label>
        <p className="text-sm text-gray-500 leading-relaxed">
          Sign up for emails to get updates from Steplo on products, offers and your
          Member benefits
        </p>
      </div>
    </motion.div>
  );
}
