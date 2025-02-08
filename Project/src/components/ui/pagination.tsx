import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
  showItemsPerPage?: boolean;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 9,
  totalItems = 0,
  showItemsPerPage = true,
  className,
}: PaginationProps) {
  // Calculate range of items being displayed
  const itemRange = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return { start, end };
  }, [currentPage, itemsPerPage, totalItems]);

  // Memoized pagination range generator
  const generatePaginationNumbers = useCallback(() => {
    const delta = window.innerWidth < 640 ? 1 : 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "dots1");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("dots2", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  }, [currentPage, totalPages]);

  // Navigation Arrow SVGs
  const FirstPageArrow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M18 17l-6-5 6-5M12 17l-6-5 6-5"
      />
    </svg>
  );

  const LastPageArrow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6 17l6-5-6-5M12 17l6-5-6-5"
      />
    </svg>
  );

  const PrevArrow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 18l-6-6 6-6"
      />
    </svg>
  );

  const NextArrow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 18l6-6-6-6"
      />
    </svg>
  );

  const NavigationButton = ({
    onClick,
    disabled,
    children,
    className,
  }: {
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200",
        "hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
        "focus:outline-none focus:ring-2 focus:ring-black/10",
        className
      )}
    >
      {children}
    </button>
  );

  const pageNumbers = useMemo(
    () => generatePaginationNumbers(),
    [generatePaginationNumbers]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex flex-col items-center gap-6 my-12", className)}
    >
      {/* Items Info */}
      {showItemsPerPage && totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground"
        >
          Showing {itemRange.start}-{itemRange.end} of {totalItems} items
        </motion.div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <NavigationButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <FirstPageArrow />
        </NavigationButton>

        {/* Previous */}
        <NavigationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <PrevArrow />
        </NavigationButton>

        {/* Page Numbers */}
        <AnimatePresence mode="wait">
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => {
              if (page === "dots1" || page === "dots2") {
                return (
                  <div
                    key={`dots-${index}`}
                    className="w-10 h-10 flex items-center justify-center"
                  >
                    <span className="text-muted-foreground">•••</span>
                  </div>
                );
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <button
                    onClick={() =>
                      typeof page === "number" && onPageChange(page)
                    }
                    disabled={typeof page !== "number"}
                    className={cn(
                      "w-10 h-10 rounded-full text-sm font-medium transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-black/10",
                      currentPage === page
                        ? "bg-black text-white"
                        : "hover:bg-black/5"
                    )}
                  >
                    {page}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        {/* Next */}
        <NavigationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <NextArrow />
        </NavigationButton>

        {/* Last Page */}
        <NavigationButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <LastPageArrow />
        </NavigationButton>
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center gap-4 lg:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "px-4 py-2 rounded-full text-sm transition-all duration-200",
            "hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed",
            "focus:outline-none focus:ring-2 focus:ring-black/10"
          )}
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "px-4 py-2 rounded-full text-sm transition-all duration-200",
            "hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed",
            "focus:outline-none focus:ring-2 focus:ring-black/10"
          )}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
