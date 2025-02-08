import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { OrderList } from "@/components/member/OrderList";

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="container max-w-[700px] mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Order History</h2>
          <p className="text-muted-foreground">View and track your orders.</p>
        </div>
        <OrderList orders={orders || []} />
      </div>
    </div>
  );
}
