"use client";

import { ReceiptText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { updateOrderStatus } from "@/lib/actions/admin";
import type { Order, OrderStatus } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";
import { cn, formatDate, formatMoney } from "@/lib/utils";

import { AdminPageHeader } from "./page-header";

const statusTone = {
  pending: "warning",
  paid: "success",
  cancelled: "danger",
  failed: "danger",
} as const;

export function OrdersTable({ orders }: { orders: Order[] }) {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? orders : orders.filter((order) => order.status === filter)),
    [filter, orders],
  );

  const changeStatus = async (order: Order, status: OrderStatus) => {
    setBusyId(order.id);
    await updateOrderStatus(order.id, status);
    setBusyId(null);
    router.refresh();
  };

  const tabs = [
    { key: "all", label: "admin.filterAll" },
    { key: "pending", label: "checkout.pending" },
    { key: "paid", label: "checkout.paid" },
    { key: "cancelled", label: "checkout.cancelled" },
    { key: "failed", label: "checkout.failed" },
  ] as const;

  return (
    <div>
      <AdminPageHeader titleKey="admin.orders" subtitleKey="admin.overview" />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={cn(
              "rounded-full border px-3.5 py-2 text-xs font-semibold transition",
              filter === tab.key
                ? "border-[#4f7cff]/50 bg-[#4f7cff]/15 text-white"
                : "border-white/10 bg-white/[0.03] text-[#8b94aa] hover:text-white",
            )}
          >
            {t(tab.label)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
          <ReceiptText className="mx-auto h-8 w-8 text-[#2f3a55]" />
          <p className="mt-3 text-sm text-[#6f7a93]">{t("admin.empty")}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080b14]">
          <div className="hidden grid-cols-[1.6fr_1.4fr_0.8fr_0.9fr_1.1fr] gap-4 border-b border-white/[0.06] px-5 py-3 text-[10px] font-semibold tracking-wider text-[#5f6a84] uppercase lg:grid">
            <span>{t("admin.customer")}</span>
            <span>{t("admin.service")}</span>
            <span>{t("admin.amount")}</span>
            <span>{t("admin.date")}</span>
            <span>{t("admin.orderStatus")}</span>
          </div>
          <ul className="divide-y divide-white/[0.05]">
            {filtered.map((order) => (
              <li
                key={order.id}
                className="grid gap-3 px-4 py-4 transition hover:bg-white/[0.02] sm:px-5 lg:grid-cols-[1.6fr_1.4fr_0.8fr_0.9fr_1.1fr] lg:items-center lg:gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{order.customerName}</p>
                  <p className="truncate text-[10px] text-[#6f7a93]" dir="ltr">
                    {order.customerEmail}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] text-[#4b5570]" dir="ltr">
                    {order.id}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs text-[#c3ccdf]">{order.serviceTitle}</p>
                  {order.notes ? (
                    <p className="mt-0.5 line-clamp-1 text-[10px] text-[#5f6a84]">{order.notes}</p>
                  ) : null}
                </div>
                <div className="text-sm font-bold text-white">
                  {formatMoney(order.amount, order.currency, lang)}
                </div>
                <div className="text-[11px] text-[#6f7a93]">
                  {formatDate(order.createdAt, lang)}
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={statusTone[order.status]}>{t(`checkout.${order.status}`)}</Badge>
                  <select
                    aria-label={t("admin.orderStatus")}
                    value={order.status}
                    disabled={busyId === order.id}
                    onChange={(event) => changeStatus(order, event.target.value as OrderStatus)}
                    className="rounded-lg border border-white/10 bg-[#0a0e18] px-2 py-1.5 text-[11px] text-[#c3ccdf] focus:border-[#4f7cff]/60 focus:outline-none disabled:opacity-50"
                  >
                    <option value="pending">{t("checkout.pending")}</option>
                    <option value="paid">{t("checkout.paid")}</option>
                    <option value="cancelled">{t("checkout.cancelled")}</option>
                    <option value="failed">{t("checkout.failed")}</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-[11px] leading-relaxed text-[#6f7a93]">
        {t("checkout.sandboxNotice")}
      </p>
    </div>
  );
}
