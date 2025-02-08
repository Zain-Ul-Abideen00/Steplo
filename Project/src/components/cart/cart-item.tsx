"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { QuantitySelector } from "./quantity-selector";
import { CartItemProps, Product } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { cartService } from "@/lib/services/cart.service";
import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem, addItem } = useCartStore();
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);

  const handleIncrease = async () => {
    setLoading(true);
    try {
      const newQuantity = item.quantity + 1;
      if (user) {
        // First update in Supabase
        await cartService.updateCartItem(user.id, item.productId, newQuantity);
      }
      // Then update local state
      await updateQuantity(item.productId, newQuantity, user);
      toast.success("Quantity updated", {
        description: `${item.name} quantity increased to ${newQuantity}`,
        action: {
          label: "Undo",
          onClick: () => handleDecrease(),
        },
      });
    } catch (err) {
      toast.error("Update failed", {
        description: "Could not update item quantity. Please try again.",
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async () => {
    if (item.quantity <= 1) return;

    setLoading(true);
    try {
      const newQuantity = item.quantity - 1;
      if (user) {
        await cartService.updateCartItem(user.id, item.productId, newQuantity);
      }
      await updateQuantity(item.productId, newQuantity, user);
      toast.success("Quantity updated", {
        description: `${item.name} quantity decreased to ${newQuantity}`,
        action: {
          label: "Undo",
          onClick: () => handleIncrease(),
        },
      });
    } catch (err) {
      toast.error("Update failed", {
        description: "Could not update item quantity. Please try again.",
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      if (user) {
        // First remove from Supabase
        await cartService.removeCartItem(user.id, item.productId);
      }
      // Then remove from local state
      await removeItem(item.productId, user);
      toast.success("Item removed", {
        description: `${item.name} has been removed from your cart`,
        action: {
          label: "Undo",
          onClick: async () => {
            try {
              await addItem(
                {
                  ...item,
                  quantity: 1,
                },
                user
              );
              toast.success("Item restored", {
                description: `${item.name} has been added back to your cart`,
              });
            } catch (err) {
              toast.error("Restore failed", {
                description: "Could not restore item. Please try again.",
              });
              console.log(err);
            }
          },
        },
      });
    } catch (err) {
      toast.error("Remove failed", {
        description: "Could not remove item. Please try again.",
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error("Sign in required", {
        description: "Please sign in to save items to your wishlist",
        action: {
          label: "Sign In",
          onClick: () => {
            // Add your sign-in navigation logic here
            window.location.href = "/login";
          },
        },
      });
      return;
    }

    try {
      if (isInWishlist(item.productId)) {
        await removeFromWishlist(item.productId);
        toast.success("Removed from wishlist", {
          description: `${item.name} has been removed from your wishlist`,
          action: {
            label: "Undo",
            onClick: async () => {
              const wishlistItem = {
                _id: item.productId,
                name: item.name,
                price: item.price,
                imageUrl: item.image,
              };
              await addToWishlist(item.productId, wishlistItem as Product);
            },
          },
        });
      } else {
        const wishlistItem = {
          _id: item.productId,
          name: item.name,
          price: item.price,
          imageUrl: item.image,
        };
        await addToWishlist(item.productId, wishlistItem as Product);
        toast.success("Added to wishlist", {
          description: `${item.name} has been saved to your wishlist`,
          action: {
            label: "View Wishlist",
            onClick: () => {
              window.location.href = "/wishlist";
            },
          },
        });
      }
    } catch (err) {
      toast.error("Action failed", {
        description: "Could not update wishlist. Please try again.",
      });
      console.log(err);
    }
  };

  return (
    <div className={`flex gap-4 py-6 ${loading ? "opacity-50" : ""}`}>
      <div className="relative h-24 w-24 flex-shrink-0">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">{item.name}</h3>
            {item.size && (
              <p className="text-sm text-muted-foreground">Size: {item.size}</p>
            )}
            <p className="text-sm text-muted-foreground">Rs {item.price}</p>
          </div>

          <button
            onClick={handleWishlistToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            <Heart
              className={`h-5 w-5 ${isInWishlist(item.productId) ? "fill-red-500 text-red-500" : ""}`}
            />
          </button>
        </div>

        <div className="mt-4">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
        </div>
      </div>
    </div>
  );
}
