import { toast } from "sonner";

export const toastService = {
  // Cart Related Toasts
  cart: {
    added: (productName: string) => {
      toast.success("Added to cart", {
        description: `${productName} has been added to your cart`,
        duration: 3000,
      });
    },
    removed: (productName: string, onUndo?: () => void) => {
      toast.success("Item removed", {
        description: `${productName} has been removed from your cart`,
        duration: 5000,
        action: onUndo
          ? {
              label: "Undo",
              onClick: onUndo,
            }
          : undefined,
      });
    },
    updated: (productName: string, quantity: number, onUndo?: () => void) => {
      toast.success("Quantity updated", {
        description: `${productName} quantity updated to ${quantity}`,
        duration: 5000,
        action: onUndo
          ? {
              label: "Undo",
              onClick: onUndo,
            }
          : undefined,
      });
    },
  },

  // Wishlist Related Toasts
  wishlist: {
    added: (productName: string, onViewWishlist?: () => void) => {
      toast.success("Added to wishlist", {
        description: `${productName} has been saved to your wishlist`,
        duration: 5000,
        action: onViewWishlist
          ? {
              label: "View Wishlist",
              onClick: onViewWishlist,
            }
          : undefined,
      });
    },
    removed: (productName: string, onUndo?: () => void) => {
      toast.success("Removed from wishlist", {
        description: `${productName} has been removed from your wishlist`,
        duration: 5000,
        action: onUndo
          ? {
              label: "Undo",
              onClick: onUndo,
            }
          : undefined,
      });
    },
  },

  // Auth Related Toasts
  auth: {
    signInRequired: (onSignIn?: () => void) => {
      toast.error("Sign in required", {
        description: "Please sign in to continue",
        duration: 5000,
        action: onSignIn
          ? {
              label: "Sign In",
              onClick: onSignIn,
            }
          : undefined,
      });
    },
  },

  // Generic Error Toasts
  error: {
    general: (message: string) => {
      toast.error("Error", {
        description: message,
        duration: 5000,
      });
    },
    action: (action: string) => {
      toast.error("Action failed", {
        description: `Failed to ${action}. Please try again.`,
        duration: 5000,
      });
    },
  },

  // Success Toasts
  success: {
    general: (message: string) => {
      toast.success("Success", {
        description: message,
        duration: 3000,
      });
    },
    action: (action: string) => {
      toast.success("Success", {
        description: `Successfully ${action}`,
        duration: 3000,
      });
    },
  },
};
