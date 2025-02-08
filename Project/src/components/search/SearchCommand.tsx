import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

interface SearchCommandProps {
  products: Product[];
}

export default function SearchCommand({ products }: SearchCommandProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Focus input on open
  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const filteredProducts =
    query === ""
      ? []
      : products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

  const handleProductClick = async (productId: string) => {
    setLoading(true);
    try {
      await router.push(`/products/${productId}`);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search products...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
              <motion.div
                ref={searchRef}
                className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl"
                initial={{ scale: 0.95, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Search Input */}
                <div className="flex items-center border-b px-4">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 border-0 bg-transparent p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="rounded-full p-1 hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Replace the results container with ScrollArea */}
                <ScrollArea className="h-[60vh]">
                  <div className="px-2 pb-2">
                    {query && filteredProducts.length > 0 ? (
                      <div className="grid gap-2 p-2">
                        {filteredProducts.map((product) => (
                          <motion.button
                            key={product._id}
                            onClick={() => handleProductClick(product.slug)}
                            className={cn(
                              "flex items-center gap-4 rounded-lg p-3 text-left transition-colors",
                              "hover:bg-gray-100/80 active:bg-gray-200",
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                            )}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            disabled={loading}
                          >
                            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {product.category}
                              </p>
                              <p className="mt-1 text-sm font-medium text-gray-900">
                                Rs{product.price.toLocaleString()}
                              </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400" />
                          </motion.button>
                        ))}
                      </div>
                    ) : query ? (
                      <div className="p-8 text-center">
                        <p className="text-sm text-gray-500">
                          No products found.
                        </p>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-sm text-gray-500">
                          Start typing to search products...
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Loading Overlay */}
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                    <Loader2 className="h-6 w-6 animate-spin text-black" />
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
