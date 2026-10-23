"use client";

import { CheckCircle2, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import type { Order } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";
import { formatMoney } from "@/lib/utils";

export function OrderSuccess({ order, sandbox }: { order: Order; sandbox: boolean }) {
  const { t, lang } = useI18n();
  const statusKey = {
    pending: "checkout.pending",
    paid: "checkout.paid",
    cancelled: "checkout.cancelled",
    failed: "checkout.failed",
  } as const;
  const statusTone = {
    pending: "warning",
    paid: "success",
    cancelled: "danger",
    failed: "danger",
  } as const;

  return (
    <div className="mx-auto max-w-2xl pt-32 sm:pt-36">
      <div className="card p-8 text-center sm:p-10">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
          {t("checkout.successTitle")}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#8b94aa]">
          {t("checkout.successDesc")}
        </p>

        <dl className="mt-8 space-y-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-start">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-xs text-[#6b7590]">{t("checkout.orderId")}</dt>
            <dd className="font-mono text-xs font-semibold text-white" dir="ltr">
              {order.id}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-xs text-[#6b7590]">{t("checkout.service")}</dt>
            <dd className="text-sm font-semibold text-white">{order.serviceTitle}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-xs text-[#6b7590]">{t("checkout.amount")}</dt>
            <dd className="text-sm font-bold text-white">
              {formatMoney(order.amount, order.currency, lang)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-xs text-[#6b7590]">{t("checkout.status")}</dt>
            <dd>
              <Badge tone={statusTone[order.status]}>
                <Clock className="h-3 w-3" />
                {t(statusKey[order.status])}
              </Badge>
            </dd>
          </div>
        </dl>

        {sandbox ? (
          <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-4 text-start">
            <p className="text-[11px] font-bold text-amber-200">{t("checkout.sandboxTitle")}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-amber-100/70">
              {t("checkout.sandboxNotice")}
            </p>
          </div>
        ) : null}

        <ButtonLink href="/" className="mt-7">
          {t("checkout.backHome")}
        </ButtonLink>
      </div>
    </div>
  );
}

export function OrderNotFound() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-xl px-4 pt-40 pb-24 text-center">
      <h1 className="text-2xl font-bold text-white">{t("checkout.notFoundTitle")}</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#8b94aa]">{t("checkout.notFoundDesc")}</p>
      <ButtonLink href="/services" className="mt-6">
        {t("checkout.backServices")}
      </ButtonLink>
    </div>
  );
}
