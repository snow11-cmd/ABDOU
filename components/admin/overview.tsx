"use client";

import { ArrowUpLeft, BadgeDollarSign, FolderKanban, Mail, ReceiptText, Send } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { AdminStats, ContactMessage, Order } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";
import { formatDate, formatMoney } from "@/lib/utils";

import { AdminPageHeader } from "./page-header";

export function Overview({
  stats,
  messages,
  orders,
}: {
  stats: AdminStats;
  messages: ContactMessage[];
  orders: Order[];
}) {
  const { t, lang } = useI18n();

  const cards = [
    {
      label: t("admin.statProjects"),
      value: stats.projects,
      hint: `${stats.published} ${t("admin.statPublished")}`,
      icon: FolderKanban,
      accent: "from-[#c6a15b]/20 text-[#d9b877]",
    },
    {
      label: t("admin.statMessages"),
      value: stats.unreadMessages,
      hint: t("admin.messages"),
      icon: Mail,
      accent: "from-[#a8a39a]/20 text-[#d6d1c7]",
    },
    {
      label: t("admin.statOrders"),
      value: stats.pendingOrders,
      hint: t("admin.orders"),
      icon: ReceiptText,
      accent: "from-[#f59e0b]/20 text-amber-300",
    },
    {
      label: t("admin.statRevenue"),
      value: formatMoney(stats.paidRevenue, "USD", lang),
      hint: t("checkout.paid"),
      icon: BadgeDollarSign,
      accent: "from-emerald-400/20 text-emerald-300",
    },
  ];

  const statusTone = {
    pending: "warning",
    paid: "success",
    cancelled: "danger",
    failed: "danger",
  } as const;

  return (
    <div>
      <AdminPageHeader titleKey="admin.overview" subtitleKey="admin.dashboard" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="card p-5">
            <div className="flex items-center justify-between">
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-gradient-to-br ${card.accent} to-transparent`}
              >
                <card.icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-[10px] tracking-wider text-[#b9c3d6] uppercase">
                {card.hint}
              </span>
            </div>
            <div className="mt-4 text-2xl font-extrabold text-white">{card.value}</div>
            <div className="mt-1 text-xs text-[#dbe1ec]">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">{t("admin.recentMessages")}</h2>
            <Link
              href="/admin/messages"
              className="inline-flex items-center gap-1 text-xs text-[#d9b877] hover:text-[#f4f1ea]"
            >
              {t("admin.messages")}
              <ArrowUpLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
          {messages.length === 0 ? (
            <p className="py-8 text-center text-xs text-[#c6cfdf]">{t("admin.noMessages")}</p>
          ) : (
            <ul className="divide-y divide-white/[0.05]">
              {messages.slice(0, 5).map((message) => (
                <li key={message.id} className="flex items-start gap-3 py-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.05] text-[10px] font-bold text-[#eaeef5]">
                    {message.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-semibold text-white">{message.name}</p>
                      {!message.read ? <Badge tone="info">{t("admin.unread")}</Badge> : null}
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-[#dbe1ec]">{message.subject}</p>
                    <p className="mt-1 text-[10px] text-[#b9c3d6]">
                      {formatDate(message.createdAt, lang)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">{t("admin.recentOrders")}</h2>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-xs text-[#d9b877] hover:text-[#f4f1ea]"
            >
              {t("admin.orders")}
              <ArrowUpLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="py-8 text-center text-xs text-[#c6cfdf]">{t("admin.noOrders")}</p>
          ) : (
            <ul className="divide-y divide-white/[0.05]">
              {orders.slice(0, 5).map((order) => (
                <li key={order.id} className="flex items-center gap-3 py-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.05] text-[#d9b877]">
                    <Send className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-white">
                      {order.customerName}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-[#dbe1ec]">
                      {order.serviceTitle}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="text-xs font-bold text-white">
                      {formatMoney(order.amount, order.currency, lang)}
                    </p>
                    <Badge tone={statusTone[order.status]} className="mt-1">
                      {t(`checkout.${order.status}`)}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-[11px] leading-relaxed text-[#c6cfdf]">
        {t("admin.authorizationNote")}
      </div>
    </div>
  );
}
