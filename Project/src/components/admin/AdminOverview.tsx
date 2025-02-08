"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { Users, Package2, AlertCircle, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  lowStock: number;
  totalOrders: number;
}

export function AdminOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    lowStock: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        setLoading(true);

        // Fetch users count
        const { count: usersCount, error: usersError } = await supabase
          .from("users")
          .select("*", { count: "exact" });

        if (usersError) throw usersError;

        // Fetch products count
        const { count: productsCount, error: productsError } = await supabase
          .from("products")
          .select("*", { count: "exact" });

        if (productsError) throw productsError;

        // Fetch low stock items
        const { count: lowStockCount, error: stockError } = await supabase
          .from("inventory")
          .select("*", { count: "exact" })
          .lt("stock", 10);

        if (stockError) throw stockError;

        // Fetch orders count
        const { count: ordersCount, error: ordersError } = await supabase
          .from("orders")
          .select("*", { count: "exact" });

        if (ordersError) throw ordersError;

        setStats({
          totalUsers: usersCount || 0,
          totalProducts: productsCount || 0,
          lowStock: lowStockCount || 0,
          totalOrders: ordersCount || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, [supabase]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : stats.totalUsers}
          </div>
          <p className="text-xs text-muted-foreground">Registered users</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : stats.totalProducts}
          </div>
          <p className="text-xs text-muted-foreground">Active products</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : stats.lowStock}
          </div>
          <p className="text-xs text-muted-foreground">Items below threshold</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : stats.totalOrders}
          </div>
          <p className="text-xs text-muted-foreground">Processed orders</p>
        </CardContent>
      </Card>
    </div>
  );
}
