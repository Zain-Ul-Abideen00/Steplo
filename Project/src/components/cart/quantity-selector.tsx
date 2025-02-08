"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={quantity === 1 ? onRemove : onDecrease}
        aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
      >
        {quantity === 1 ? (
          <Trash2 className="h-4 w-4" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>

      <span className="w-8 text-center">{quantity}</span>

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
