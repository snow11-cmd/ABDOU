"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { CreditCard, ShieldCheck, ShoppingCartIcon, TriangleAlertIcon } from "@/components/icons";
import { IconHoverContext } from "@/components/icons/hover";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form";
import { IconTile } from "@/components/ui/icon-tile";
import type { Service } from "@/lib/data/types";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { formatMoney, isSupabaseConfigured } from "@/lib/utils";
import { checkoutSchema } from "@/lib/validations";

type FormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm({
  services,
  initialService,
  paymentsEnabled = true,
}: {
  services: Service[];
  initialService?: string;
  paymentsEnabled?: boolean;
}) {
  const { t, lang, locale } = useI18n();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [hoveredHeading, setHoveredHeading] = useState<string | null>(null);
  const headingHover = (key: string) => ({
    onMouseEnter: () => setHoveredHeading(key),
    onMouseLeave: () => setHoveredHeading(null),
    onFocus: () => setHoveredHeading(key),
    onBlur: () => setHoveredHeading(null),
  });
  const configured = isSupabaseConfigured();

  const defaultService =
    services.find((service) => service.slug === initialService)?.slug ?? services[0]?.slug ?? "";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { serviceSlug: defaultService, name: "", email: "", notes: "" },
  });

  const selectedSlug = useWatch({ control, name: "serviceSlug" });
  const selected = useMemo(
    () => services.find((service) => service.slug === selectedSlug) ?? services[0],
    [selectedSlug, services],
  );

  if (services.length === 0) {
    return (
      <div className="rounded-[1.7rem] border border-black/[0.08] bg-white/80 p-8 text-center dark:border-white/[0.09] dark:bg-white/[0.035]">
        <h2 className="text-lg font-semibold text-neutral-950 dark:text-[#f4f1ea]">
          {t("checkout.noServicesTitle")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-200">
          {t("checkout.noServicesDesc")}
        </p>
      </div>
    );
  }

  const translate = (message?: string) =>
    message && (message.startsWith("contact.") || message.startsWith("auth."))
      ? t(message as DictKey)
      : message;

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as {
        orderId?: string;
        sandbox?: boolean;
        redirectUrl?: string | null;
        error?: string;
      };
      if (!response.ok || !data.orderId) {
        setServerError(t("checkout.error"));
        return;
      }
      if (data.redirectUrl) {
        window.location.assign(data.redirectUrl);
        return;
      }
      router.push(`/checkout/success?order=${data.orderId}${data.sandbox ? "&sandbox=1" : ""}`);
    } catch {
      setServerError(t("checkout.error"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid items-start gap-4 lg:grid-cols-[1.15fr_0.85fr]"
    >
      <div className="rounded-[1.7rem] border border-black/[0.08] bg-white/85 p-5 shadow-[0_25px_70px_-60px_rgba(0,0,0,0.45)] backdrop-blur sm:p-7 dark:border-white/[0.09] dark:bg-[#121214]/85">
        <IconHoverContext.Provider value={hoveredHeading === "service"}>
          <h2
            {...headingHover("service")}
            className="flex items-center gap-3 text-[15px] font-semibold text-neutral-950 dark:text-[#f4f1ea]"
          >
            <IconTile icon={ShoppingCartIcon} size="sm" />
            {t("checkout.service")}
          </h2>
        </IconHoverContext.Provider>

        <div className="mt-5">
          <Label
            htmlFor="serviceSlug"
            className="mb-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-100"
          >
            {t("checkout.service")}
          </Label>
          <Select
            id="serviceSlug"
            aria-invalid={Boolean(errors.serviceSlug)}
            {...register("serviceSlug")}
          >
            {services.map((service) => (
              <option key={service.id} value={service.slug}>
                {locale(service.titleAr, service.titleEn)} —{" "}
                {formatMoney(service.price, "USD", lang)}
              </option>
            ))}
          </Select>
          {errors.serviceSlug?.message ? (
            <p className="mt-1.5 text-[11px] text-rose-600 dark:text-rose-400">
              {translate(errors.serviceSlug.message)}
            </p>
          ) : null}
        </div>

        <div className="my-6 h-px bg-black/[0.07] dark:bg-white/[0.08]" />

        <IconHoverContext.Provider value={hoveredHeading === "customer"}>
          <h2
            {...headingHover("customer")}
            className="flex items-center gap-3 text-[15px] font-semibold text-neutral-950 dark:text-[#f4f1ea]"
          >
            <IconTile icon={CreditCard} size="sm" />
            {t("checkout.customerInfo")}
          </h2>
        </IconHoverContext.Provider>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <Label
              htmlFor="name"
              className="mb-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-100"
            >
              {t("contact.name")}
            </Label>
            <Input
              id="name"
              autoComplete="name"
              placeholder={t("contact.namePh")}
              className="h-11 bg-white dark:bg-white/[0.045]"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
            {errors.name?.message ? (
              <p className="mt-1.5 text-[11px] text-rose-600 dark:text-rose-400">
                {translate(errors.name.message)}
              </p>
            ) : null}
          </div>
          <div>
            <Label
              htmlFor="email"
              className="mb-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-100"
            >
              {t("contact.email")}
            </Label>
            <Input
              id="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              placeholder={t("contact.emailPh")}
              className="h-11 bg-white dark:bg-white/[0.045]"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email?.message ? (
              <p className="mt-1.5 text-[11px] text-rose-600 dark:text-rose-400">
                {translate(errors.email.message)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-4">
          <Label
            htmlFor="notes"
            className="mb-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-100"
          >
            {t("checkout.notes")}
          </Label>
          <Textarea
            id="notes"
            rows={4}
            placeholder={t("checkout.notesPh")}
            className="bg-white dark:bg-white/[0.045]"
            aria-invalid={Boolean(errors.notes)}
            {...register("notes")}
          />
          {errors.notes?.message ? (
            <p className="mt-1.5 text-[11px] text-rose-600 dark:text-rose-400">
              {translate(errors.notes.message)}
            </p>
          ) : null}
        </div>

        {!paymentsEnabled ? (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-xl border border-amber-700/15 bg-amber-50 px-4 py-3 text-[12px] text-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
          >
            <TriangleAlertIcon size={16} strokeWidth={1.75} aria-hidden="true" />
            {t("checkout.notConfigured")}
          </div>
        ) : null}

        {serverError ? (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-xl border border-rose-700/15 bg-rose-50 px-4 py-3 text-[12px] text-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
          >
            <TriangleAlertIcon size={16} strokeWidth={1.75} aria-hidden="true" />
            {serverError}
          </div>
        ) : null}
      </div>

      <aside className="space-y-3">
        <div className="rounded-[1.7rem] border border-black/[0.08] bg-white/85 p-5 backdrop-blur sm:p-6 dark:border-white/[0.09] dark:bg-[#121214]/85">
          <h3 className="text-[13px] font-semibold text-neutral-950 dark:text-[#f4f1ea]">
            {t("checkout.amount")}
          </h3>
          {selected ? (
            <>
              <p className="mt-3 text-[12px] text-neutral-600 dark:text-neutral-200">
                {locale(selected.titleAr, selected.titleEn)}
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-[#f4f1ea]">
                {formatMoney(selected.price, "USD", lang)}
              </p>
              <p className="mt-1 text-[10px] text-neutral-600 dark:text-neutral-200">
                {t("services.startFrom")}
              </p>
            </>
          ) : null}
          <div className="my-5 h-px bg-black/[0.07] dark:bg-white/[0.08]" />
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-neutral-600 dark:text-neutral-200">{t("checkout.amount")}</span>
            <span className="font-semibold text-neutral-950 dark:text-[#f4f1ea]">
              {selected ? formatMoney(selected.price, "USD", lang) : "—"}
            </span>
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !paymentsEnabled}
            className="mt-6 w-full"
          >
            {isSubmitting ? t("checkout.processing") : t("checkout.submit")}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-neutral-600 dark:text-neutral-200">
            <ShieldCheck size={14} strokeWidth={1.75} aria-hidden="true" />
            {t("contact.privacy")}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-amber-700/15 bg-amber-50 p-5 dark:bg-amber-950/40">
          <h4 className="text-[11px] font-semibold text-amber-900 dark:text-amber-200">
            {t("checkout.sandboxTitle")}
          </h4>
          <p className="mt-2 text-[11px] leading-[1.8] text-amber-900 dark:text-amber-200/70">
            {t("checkout.sandboxNotice")}
          </p>
          {!configured ? (
            <p className="mt-2 text-[11px] leading-[1.8] text-amber-900 dark:text-amber-200/50">
              {t("checkout.tempStore")}
            </p>
          ) : null}
        </div>
      </aside>
    </form>
  );
}
