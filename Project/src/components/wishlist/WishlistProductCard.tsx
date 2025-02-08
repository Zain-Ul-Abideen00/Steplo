import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CartItem, SupabaseWishlistItem } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface WishlistProductCardProps {
  item: SupabaseWishlistItem;
  onRemove: () => void;
}

export default function WishlistProductCard({
  item,
  onRemove,
}: WishlistProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = async () => {
    try {
      const cartItem: CartItem = {
        productId: item.product_id,
        name: item.product_name,
        price: item.price,
        quantity: 1,
        size: item.size || "",
        image: item.image_url,
        description: "",
        color: 1,
      };

      await addItem(cartItem, null);
      toast.success("Added to cart", {
        description: "Product has been added to your cart",
      });
    } catch (err) {
      toast.error("Error", {
        description: "Failed to add item to cart",
      });
      console.error(err);
    }
  };

  const handleRemove = async () => {
    try {
      await onRemove();
      toast.success("Success", {
        description: "Item removed from wishlist",
      });
    } catch (err) {
      toast.error("Error", {
        description: "Failed to remove item",
      });
      console.error(err);
    }
  };

  return (
    <div className="group relative">
      <Link href={`/products/${item.product_id}`}>
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={item.image_url}
            alt={item.product_name}
            width={400}
            height={400}
            className="object-cover object-center"
            priority
          />
        </div>
      </Link>

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            {item.product_name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{item.size}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={handleAddToCart} className="flex-1">
          Add to Bag
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRemove}
          className="shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
