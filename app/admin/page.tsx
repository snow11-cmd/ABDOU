import type { Metadata } from "next";

import { Overview } from "@/components/admin/overview";
import { requireAdmin } from "@/lib/auth";
import { getAdminMessages, getAdminOrders, getAdminStats } from "@/lib/data/admin";

export const metadata: Metadata = { title: "لوحة التحكم", robots: { index: false } };

export default async function AdminOverviewPage() {
  const { supabase } = await requireAdmin();
  const [stats, messages, orders] = await Promise.all([
    getAdminStats(supabase),
    getAdminMessages(supabase, 5),
    getAdminOrders(supabase, 5),
  ]);

  return <Overview stats={stats} messages={messages} orders={orders} />;
}
