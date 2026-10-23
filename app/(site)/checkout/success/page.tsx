import type { Metadata } from "next";

import { OrderNotFound, OrderSuccess } from "@/components/checkout/order-success";
import type { Order, OrderStatus } from "@/lib/data/types";
import { getSandboxOrder } from "@/lib/payments/sandbox-store";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "تم إنشاء الطلب", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; sandbox?: string }>;
}) {
  const { order: orderId, sandbox: sandboxParam } = await searchParams;

  let order: Order | null = null;
  let sandbox = sandboxParam === "1";

  if (orderId) {
    if (orderId.startsWith("SBX-")) {
      const sandboxOrder = getSandboxOrder(orderId);
      if (sandboxOrder) {
        // Do not serialize customer PII into the client payload.
        order = { ...sandboxOrder, customerName: "", customerEmail: "", notes: null };
      }
      sandbox = true;
    } else {
      const admin = getSupabaseAdminClient();
      if (admin) {
        const { data } = await admin
          .from("orders")
          .select("id, service_id, service_title, amount, currency, status, created_at")
          .eq("id", orderId)
          .maybeSingle();
        if (data) {
          order = {
            id: data.id,
            serviceId: data.service_id,
            serviceTitle: data.service_title,
            customerName: "",
            customerEmail: "",
            notes: null,
            amount: Number(data.amount),
            currency: data.currency,
            status: data.status as OrderStatus,
            createdAt: data.created_at,
          };
        }
      }
    }
  }

  if (!order) {
    return <OrderNotFound />;
  }

  return (
    <div className="container-x pb-24">
      <OrderSuccess order={order} sandbox={sandbox} />
    </div>
  );
}
