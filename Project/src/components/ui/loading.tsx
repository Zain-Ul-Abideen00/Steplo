"use client";

import { cn } from "@/lib/utils";
import { Loader2, LoaderCircle, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingProps {
  // Different loading variants
  variant?:
    | "spinner"
    | "dots"
    | "pulse"
    | "skeleton"
    | "productCard"
    | "productGrid"
    | "cartSkeleton"
    | "productDetailsSkeleton"
    | "checkoutSkeleton"
    | "bounce"
    | "wave"
    | "gradient"
    | "circular"
    | "progress"
    | "shimmer";
  size?: "xs" | "sm" | "default" | "lg" | "xl";
  className?: string;
  text?: string;
  count?: number;
  // For skeleton loading
  lines?: number;
  // For circular progress
  progress?: number;
  // Custom color
  color?: string;
}

// Enhanced animations
const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const bounceAnimation = {
  animate: {
    y: ["0%", "-35%", "0%"],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const waveAnimation = {
  animate: {
    x: ["-100%", "100%"],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  },
};

// New shimmer effect
const shimmerAnimation = {
  animate: {
    x: ["-100%", "100%"],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "linear",
    },
  },
};

export function Loading({
  variant = "spinner",
  size = "default",
  className,
  text,
  count = 1,
  lines = 3,
  progress = 0,
  color = "currentColor",
}: LoadingProps) {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  const containerClasses = cn(
    "flex items-center justify-center",
    {
      "flex-col": variant === "circular" || variant === "progress",
    },
    className
  );

  const ProductCardSkeleton = () => (
    <motion.div
      className="animate-pulse relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center bg-[#e3e0e0] aspect-square rounded-sm mb-4 relative overflow-hidden">
        <ImageIcon className="w-10 h-10 text-[#c1bfbf]" />
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={shimmerAnimation}
          animate="animate"
        />
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-[#e3e0e0] rounded w-3/4 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            variants={shimmerAnimation}
            animate="animate"
          />
        </div>
        <div className="h-4 bg-[#e3e0e0] rounded w-1/2 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            variants={shimmerAnimation}
            animate="animate"
          />
        </div>
        <div className="h-4 bg-[#e3e0e0] rounded w-1/4 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            variants={shimmerAnimation}
            animate="animate"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderLoading = () => {
    switch (variant) {
      case "spinner":
        return (
          <motion.div
            className={containerClasses}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Loader2
              className={cn(
                "animate-spin",
                sizeClasses[size]
              )}
              style={{ color }}
            />
            {text && (
              <motion.span
                className="ml-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {text}
              </motion.span>
            )}
          </motion.div>
        );

      case "dots":
        return (
          <div className={containerClasses}>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "rounded-full mx-1",
                  sizeClasses[size]
                )}
                style={{
                  backgroundColor: color,
                  originY: 0.5,
                }}
                variants={bounceAnimation}
                animate="animate"
                transition={{ delay: i * 0.15 }}
              />
            ))}
            {text && (
              <motion.span
                className="ml-3 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {text}
              </motion.span>
            )}
          </div>
        );

      case "pulse":
        return (
          <div className={containerClasses}>
            <motion.div
              className={cn(
                "rounded-full",
                sizeClasses[size]
              )}
              style={{ backgroundColor: color }}
              animate={pulseAnimation.animate}
            />
            {text && <span className="ml-2 text-sm text-muted-foreground">{text}</span>}
          </div>
        );

      case "skeleton":
        return (
          <div className="w-full space-y-3">
            {[...Array(lines)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "animate-pulse rounded",
                  i === 0 ? "w-3/4" : i === lines - 1 ? "w-1/4" : "w-1/2"
                )}
                style={{
                  height: size === "xs" ? "0.5rem" :
                         size === "sm" ? "0.75rem" :
                         size === "lg" ? "1.5rem" :
                         size === "xl" ? "2rem" : "1rem",
                  backgroundColor: "rgb(229, 231, 235)"
                }}
              />
            ))}
          </div>
        );

      case "bounce":
        return (
          <div className={containerClasses}>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "mx-1 rounded-full",
                  sizeClasses[size]
                )}
                style={{ backgroundColor: color }}
                animate={bounceAnimation.animate}
                transition={{ delay: i * 0.15 }}
              />
            ))}
          </div>
        );

      case "wave":
        return (
          <div className={cn(
            "relative overflow-hidden",
            containerClasses
          )}>
            <div
              className={cn(
                "h-1 w-full rounded-full",
                "bg-gray-200"
              )}
            >
              <motion.div
                className="h-full w-1/3 rounded-full"
                style={{ backgroundColor: color }}
                animate={waveAnimation.animate}
              />
            </div>
            {text && <span className="mt-2 text-sm text-muted-foreground">{text}</span>}
          </div>
        );

      case "gradient":
        return (
          <div className={containerClasses}>
            <div
              className={cn(
                "rounded-full bg-gradient-to-r from-transparent via-current to-transparent animate-gradient",
                sizeClasses[size]
              )}
              style={{ color }}
            />
            {text && <span className="ml-2 text-sm text-muted-foreground">{text}</span>}
          </div>
        );

      case "circular":
        return (
          <div className={containerClasses}>
            <div className="relative">
              <LoaderCircle
                className={cn(
                  "animate-spin",
                  sizeClasses[size]
                )}
                style={{ color }}
              />
              {text && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {progress}%
                </span>
              )}
            </div>
            {text && <span className="mt-2 text-sm text-muted-foreground">{text}</span>}
          </div>
        );

      case "progress":
        return (
          <div className={containerClasses}>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {text && <span className="mt-2 text-sm text-muted-foreground">{text}</span>}
          </div>
        );

      case "productCard":
        return <ProductCardSkeleton />;

      case "productGrid":
        return (
          <motion.div
            role="status"
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-[60px] mb-10 pb-10 border border-gray-200 rounded-sm shadow-sm",
              className
            )}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[...Array(count || 9)].map((_, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <ProductCardSkeleton />
              </motion.div>
            ))}
            <span className="sr-only">Loading...</span>
          </motion.div>
        );

      case "cartSkeleton":
        return (
          <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
              {/* Header Skeleton */}
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-2">
                  <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
              </div>

              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                {/* Cart Items Skeleton */}
                <div className="lg:col-span-8">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="space-y-6">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex gap-4 py-6 border-b last:border-0"
                        >
                          <div className="h-24 w-24 bg-gray-200 rounded animate-pulse" />
                          <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                              <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary Skeleton */}
                <div className="lg:col-span-4 mt-8 lg:mt-0">
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between">
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                        </div>
                      ))}
                    </div>
                    <div className="h-12 w-full bg-gray-200 rounded animate-pulse mt-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "productDetailsSkeleton":
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery Skeleton */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Product Info Skeleton */}
              <div className="space-y-6">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="h-12 bg-gray-200 rounded animate-pulse"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-4 pt-6">
                  <div className="h-12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-12 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2 pt-6">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        );

      case "shimmer":
        return (
          <div className={cn("relative overflow-hidden", containerClasses)}>
            <div className="h-full w-full bg-gray-200 rounded-md">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                variants={shimmerAnimation}
                animate="animate"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderLoading();
}
