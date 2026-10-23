import type { Metadata } from "next";

import { OrdersTable } from "@/components/admin/orders-table";
import { requireAdmin } from "@/lib/auth";
import { getAdminOrders } from "@/lib/data/admin";

export const metadata: Metadata = { title: "الطلبات", robots: { index: false } };

export default async function AdminOrdersPage() {
  const { supabase } = await requireAdmin();
  const orders = await getAdminOrders(supabase, 100);
  return <OrdersTable orders={orders} />;
}
