"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

interface Inventory {
  id: string;
  product_id: string;
  product_name: string;
  size: string;
  stock: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
}

export function InventoryManagement() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchInventory() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("inventory").select("*");

        if (error) throw error;
        setInventory(data || []);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        toast.error("Failed to load inventory");
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, [supabase]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Inventory Management</h2>
        <Button>Update Stock</Button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading inventory...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product_name}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
