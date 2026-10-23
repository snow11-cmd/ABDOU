"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowUpLeft, CreditCard, ShieldCheck, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/form";
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
      <div className="card mx-auto max-w-xl p-8 text-center">
        <h2 className="text-lg font-bold text-white">{t("checkout.noServicesTitle")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#8b94aa]">
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
      className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
    >
      <div className="card p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <ShoppingBag className="h-5 w-5 text-[#8ab4ff]" />
          {t("checkout.service")}
        </h2>

        <div className="mt-5">
          <Label htmlFor="serviceSlug">{t("checkout.service")}</Label>
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
          <FieldError>{translate(errors.serviceSlug?.message)}</FieldError>
        </div>

        <div className="my-6 h-px bg-white/[0.07]" />

        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <CreditCard className="h-5 w-5 text-[#c4b5fd]" />
          {t("checkout.customerInfo")}
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">{t("contact.name")}</Label>
            <Input
              id="name"
              autoComplete="name"
              placeholder={t("contact.namePh")}
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
            <FieldError>{translate(errors.name?.message)}</FieldError>
          </div>
          <div>
            <Label htmlFor="email">{t("contact.email")}</Label>
            <Input
              id="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              placeholder={t("contact.emailPh")}
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            <FieldError>{translate(errors.email?.message)}</FieldError>
          </div>
        </div>

        <div className="mt-5">
          <Label htmlFor="notes">{t("checkout.notes")}</Label>
          <Textarea
            id="notes"
            rows={4}
            placeholder={t("checkout.notesPh")}
            aria-invalid={Boolean(errors.notes)}
            {...register("notes")}
          />
          <FieldError>{translate(errors.notes?.message)}</FieldError>
        </div>

        {!paymentsEnabled ? (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {t("checkout.notConfigured")}
          </div>
        ) : null}

        {serverError ? (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {serverError}
          </div>
        ) : null}
      </div>

      <aside className="space-y-4">
        <div className="card p-6">
          <h3 className="text-sm font-bold text-white">{t("checkout.amount")}</h3>
          {selected ? (
            <>
              <p className="mt-3 text-sm text-[#aab4ca]">
                {locale(selected.titleAr, selected.titleEn)}
              </p>
              <p className="text-gradient-soft mt-2 text-3xl font-extrabold">
                {formatMoney(selected.price, "USD", lang)}
              </p>
              <p className="mt-1 text-[11px] text-[#6b7590]">{t("services.startFrom")}</p>
            </>
          ) : null}
          <div className="my-5 h-px bg-white/[0.07]" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#8b94aa]">{t("checkout.amount")}</span>
            <span className="font-bold text-white">
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
            <ArrowUpLeft className="h-4 w-4" />
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#6b7590]">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" />
            {t("contact.privacy")}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
          <h4 className="text-xs font-bold text-amber-200">{t("checkout.sandboxTitle")}</h4>
          <p className="mt-2 text-[11px] leading-relaxed text-amber-100/70">
            {t("checkout.sandboxNotice")}
          </p>
          {!configured ? (
            <p className="mt-2 text-[11px] leading-relaxed text-amber-100/50">
              {t("checkout.tempStore")}
            </p>
          ) : null}
        </div>
      </aside>
    </form>
  );
}
