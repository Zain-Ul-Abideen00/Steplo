import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animation-variants";

export function LoginHeader() {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col items-center space-y-8 mb-8"
    >
      {/* Logo Container */}
      <motion.div
        whileHover="hover"
        initial="initial"
        animate="animate"
        className="relative"
      >
        {/* Animated Background Ring */}
        <motion.div
          className="absolute -inset-2 rounded-full opacity-25"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Logo */}
        <motion.div
          variants={{
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            hover: { scale: 1.05, transition: { duration: 0.2 } }
          }}
        >
          <Image
            src="/nike.svg"
            alt="Nike Logo"
            width={50}
            height={50}
            className="w-auto h-auto"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <div className="text-center">
        <motion.h1
          variants={{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 }
          }}
          className="text-2xl font-bold tracking-tight text-black mb-3"
        >
          Welcome back
        </motion.h1>
        <motion.p
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1 }
          }}
          className="text-sm text-gray-500 max-w-[280px] mx-auto"
        >
          Sign in to stay up to date with your order history.
        </motion.p>
      </div>
    </motion.div>
  );
}
