"use client";

import { CheckedIcon, ClockIcon } from "@/components/icons";
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
    <div className="mx-auto max-w-2xl px-4 pt-32 sm:pt-40">
      <div className="rounded-[1.8rem] border border-black/[0.08] bg-white/90 p-6 text-center shadow-[0_25px_70px_-60px_rgba(0,0,0,0.5)] backdrop-blur sm:p-10 dark:border-white/[0.09] dark:bg-[#121214]/90">
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-2xl border border-emerald-700/15 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40">
          <CheckedIcon size={28} strokeWidth={1.6} aria-hidden="true" />
        </div>
        <h1 className="type-section text-neutral-950 dark:text-[#f4f1ea]">
          {t("checkout.successTitle")}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[13px] leading-[1.8] text-neutral-600 dark:text-neutral-200">
          {t("checkout.successDesc")}
        </p>

        <dl className="mt-8 space-y-3 rounded-2xl border border-black/[0.07] bg-neutral-50/70 p-5 text-start dark:border-white/[0.08] dark:bg-white/[0.03]">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-[11px] text-neutral-600 dark:text-neutral-200">
              {t("checkout.orderId")}
            </dt>
            <dd
              className="font-mono text-[11px] font-semibold text-neutral-900 dark:text-neutral-100"
              dir="ltr"
            >
              {order.id}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-[11px] text-neutral-600 dark:text-neutral-200">
              {t("checkout.service")}
            </dt>
            <dd className="text-[13px] font-medium text-neutral-900 dark:text-neutral-100">
              {order.serviceTitle}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-[11px] text-neutral-600 dark:text-neutral-200">
              {t("checkout.amount")}
            </dt>
            <dd className="text-[13px] font-semibold text-neutral-950 dark:text-[#f4f1ea]">
              {formatMoney(order.amount, order.currency, lang)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-[11px] text-neutral-600 dark:text-neutral-200">
              {t("checkout.status")}
            </dt>
            <dd>
              <Badge tone={statusTone[order.status]}>
                <ClockIcon size={12} strokeWidth={1.75} aria-hidden="true" />
                {t(statusKey[order.status])}
              </Badge>
            </dd>
          </div>
        </dl>

        {sandbox ? (
          <div className="mt-5 rounded-xl border border-amber-700/15 bg-amber-50 p-4 text-start dark:bg-amber-950/40">
            <p className="text-[11px] font-semibold text-amber-900 dark:text-amber-200">
              {t("checkout.sandboxTitle")}
            </p>
            <p className="mt-1 text-[11px] leading-[1.8] text-amber-900 dark:text-amber-200/70">
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
      <h1 className="type-section text-neutral-950 dark:text-[#f4f1ea]">
        {t("checkout.notFoundTitle")}
      </h1>
      <p className="mt-3 text-[13px] leading-[1.8] text-neutral-600 dark:text-neutral-200">
        {t("checkout.notFoundDesc")}
      </p>
      <ButtonLink href="/services" className="mt-6">
        {t("checkout.backServices")}
      </ButtonLink>
    </div>
  );
}
