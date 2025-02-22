"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { QuantitySelector } from "./quantity-selector";
import { CartItemProps, Product } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import { cartService } from "@/lib/services/cart.service";
import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animation-variants";
import { toastService } from "@/lib/services/toast.service";

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
      toastService.cart.updated(item.name, newQuantity, handleDecrease);
    } catch (err) {
      toastService.error.action("update item quantity");
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
      toastService.cart.updated(item.name, newQuantity, handleIncrease);
    } catch (err) {
      toastService.error.action("update item quantity");
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
      toastService.cart.removed(item.name, async () => {
        try {
          await addItem(
            {
              ...item,
              quantity: 1,
            },
            user
          );
          toastService.cart.added(item.name);
        } catch (err) {
          toastService.error.action("restore item");
          console.log(err);
        }
      });
    } catch (err) {
      toastService.error.action("remove item");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      toastService.auth.signInRequired(() => {
        window.location.href = "/login";
      });
      return;
    }

    try {
      if (isInWishlist(item.productId)) {
        await removeFromWishlist(item.productId);
        toastService.wishlist.removed(item.name, async () => {
          const wishlistItem = {
            _id: item.productId,
            name: item.name,
            price: item.price,
            imageUrl: item.image,
          };
          await addToWishlist(item.productId, wishlistItem as Product);
        });
      } else {
        const wishlistItem = {
          _id: item.productId,
          name: item.name,
          price: item.price,
          imageUrl: item.image,
        };
        await addToWishlist(item.productId, wishlistItem as Product);
        toastService.wishlist.added(item.name, () => {
          window.location.href = "/wishlist";
        });
      }
    } catch (err) {
      toastService.error.action("update wishlist");
      console.log(err);
    }
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className={`flex gap-4 py-6 ${loading ? "opacity-50" : ""}`}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative h-24 w-24 flex-shrink-0"
        >
          {item.image && (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          )}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex flex-1 flex-col"
        >
          <div className="flex justify-between">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <h3 className="text-sm font-medium">{item.name}</h3>
              {item.size && (
                <p className="text-sm text-muted-foreground">Size: {item.size}</p>
              )}
              <p className="text-sm text-muted-foreground">Rs {item.price}</p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWishlistToggle}
              className="text-muted-foreground hover:text-foreground"
            >
              <Heart
                className={`h-5 w-5 ${isInWishlist(item.productId) ? "fill-red-500 text-red-500" : ""}`}
              />
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4"
          >
            <QuantitySelector
              quantity={item.quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
