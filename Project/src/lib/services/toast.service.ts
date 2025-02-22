import { toast } from "sonner";

const TOAST_DURATION = 4000;

export const toastService = {
  // Cart Related Toasts
  cart: {
    added: (productName: string) => {
      toast.success("Added to cart", {
        description: `${productName} has been added to your cart`,
        duration: TOAST_DURATION,
      });
    },
    removed: (productName: string, onUndo?: () => void) => {
      toast.success("Item removed", {
        description: `${productName} has been removed from your cart`,
        duration: TOAST_DURATION,
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
        duration: TOAST_DURATION,
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
        duration: TOAST_DURATION,
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
        duration: TOAST_DURATION,
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
        duration: TOAST_DURATION,
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
      toast.error(message, {
        duration: TOAST_DURATION,
      });
    },
    action: (action: string) => {
      toast.error("Action failed", {
        description: `Failed to ${action}. Please try again.`,
        duration: TOAST_DURATION,
      });
    },
  },

  // Success Toasts
  success: {
    general: (message: string) => {
      toast.success("Success", {
        description: message,
        duration: TOAST_DURATION,
      });
    },
    action: (action: string) => {
      toast.success("Success", {
        description: `Successfully ${action}`,
        duration: TOAST_DURATION,
      });
    },
  },
};
