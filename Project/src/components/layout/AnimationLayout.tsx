import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animation-variants";

interface AnimationLayoutProps {
  children: React.ReactNode;
}

export function AnimationLayout({ children }: AnimationLayoutProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
