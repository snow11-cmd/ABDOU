"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Clock, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/form";
import { Icon3D, type Icon3DIcon, type Icon3DMotion, type Icon3DTone } from "@/components/ui/icon-3d";
import { SectionHeading } from "@/components/ui/section-heading";
import { TelegramIcon, WhatsappIcon } from "@/components/ui/social-icons";
import { SocialLinks } from "@/components/ui/social-links";
import { StatusDot } from "@/components/ui/status-dot";
import type { SiteSettings } from "@/lib/data/types";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { isSupabaseConfigured } from "@/lib/utils";
import { contactSchema, type ContactInput } from "@/lib/validations";

export function Contact({
  settings,
  configured = isSupabaseConfigured(),
}: {
  settings: SiteSettings;
  configured?: boolean;
}) {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  const translateError = (message?: string) => {
    if (!message) return undefined;
    if (message.startsWith("contact.") || message.startsWith("auth.")) {
      return t(message as DictKey);
    }
    return message;
  };

  const onSubmit = async (values: ContactInput) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");
      reset({ name: "", email: "", subject: "", message: "", website: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const cards: Array<{
    icon: Icon3DIcon;
    label: string;
    value: string;
    href: string;
    motion: Icon3DMotion;
    tone: Icon3DTone;
  }> = [
    {
      icon: Mail,
      label: t("contact.emailLabel"),
      value: settings.email,
      href: `mailto:${settings.email}`,
      motion: "flip",
      tone: "cyan",
    },
    {
      icon: WhatsappIcon,
      label: t("contact.whatsapp"),
      value: `+${settings.whatsapp.replace(/[^0-9]/g, "")}`,
      href: `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`,
      motion: "orbit",
      tone: "mint",
    },
  ];

  const directContacts = [
    { href: settings.telegram, label: "Telegram", icon: TelegramIcon, tint: "text-[#7ff9e9]" },
    {
      href: `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`,
      label: t("contact.directWhatsapp"),
      icon: WhatsappIcon,
      tint: "text-emerald-300",
    },
  ].filter((contact) => Boolean(contact.href));

  return (
    <section id="contact" className="section-pad relative scroll-mt-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_100%,rgba(180,155,255,0.1),transparent_70%)]" />
      </div>
      <div className="container-x">
        <SectionHeading
          eyebrow={t("contact.label")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
          index="04"
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-4">
            {cards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="card group flex items-center gap-4 p-5 transition hover:border-cyan-200/30"
              >
                <Icon3D icon={card.icon} motion={card.motion} tone={card.tone} />
                <div className="min-w-0">
                  <div className="text-[11px] tracking-wider text-[#7f959d] uppercase">
                    {card.label}
                  </div>
                  <div className="mt-0.5 truncate text-sm font-semibold text-white">
                    <span dir="ltr">{card.value}</span>
                  </div>
                </div>
              </a>
            ))}

            <div className="card group flex items-center gap-4 p-5">
              <Icon3D icon={Clock} motion="rise" tone="amber" />
              <div>
                <div className="text-[11px] tracking-wider text-[#7f959d] uppercase">
                  {t("contact.availableLabel")}
                </div>
                <div className="mt-0.5 text-sm font-semibold text-white">
                  {t("contact.responseTime")}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center rounded-2xl border border-cyan-200/20 bg-[linear-gradient(140deg,rgba(91,244,224,0.1),rgba(180,155,255,0.07))] p-5">
              <div className="text-xs font-semibold text-[#cde2e3]">{t("contact.direct")}</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {directContacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-2 text-[11px] font-medium text-white transition hover:bg-white/[0.1]"
                  >
                    <contact.icon className={`size-3.5 ${contact.tint}`} aria-hidden="true" />
                    {contact.label}
                  </a>
                ))}
              </div>
              <div className="mt-5 border-t border-white/10 pt-4">
                <SocialLinks settings={settings} size="sm" />
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="card form-panel relative p-6 sm:p-8"
          >
            <div className="pointer-events-none absolute -end-16 -top-20 h-48 w-48 rounded-full bg-cyan-300/10 blur-[70px]" />
            <div className="relative mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] pb-5">
              <div className="flex items-center gap-2 text-[10px] font-medium text-[#b7c9cd]">
                <StatusDot size="xs" />
                {t("contact.formLabel")}
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-[#81969e] uppercase">
                <Clock className="icon-secondary size-3.5" aria-hidden="true" />
                {t("contact.formMeta")}
              </div>
            </div>

            <div className="relative grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">{t("contact.name")}</Label>
                <Input
                  id="name"
                  placeholder={t("contact.namePh")}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  {...register("name")}
                />
                <FieldError>{translateError(errors.name?.message)}</FieldError>
              </div>
              <div>
                <Label htmlFor="email">{t("contact.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  dir="ltr"
                  placeholder={t("contact.emailPh")}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />
                <FieldError>{translateError(errors.email?.message)}</FieldError>
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="subject">{t("contact.subject")}</Label>
              <Input
                id="subject"
                placeholder={t("contact.subjectPh")}
                aria-invalid={Boolean(errors.subject)}
                {...register("subject")}
              />
              <FieldError>{translateError(errors.subject?.message)}</FieldError>
            </div>

            <div className="mt-5">
              <Label htmlFor="message">{t("contact.message")}</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder={t("contact.messagePh")}
                aria-invalid={Boolean(errors.message)}
                {...register("message")}
              />
              <FieldError>{translateError(errors.message?.message)}</FieldError>
            </div>

            {/* Honeypot — hidden from users and screen readers */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            {status === "success" ? (
              <div
                role="status"
                className="mt-5 flex items-start gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {t("contact.success")}
              </div>
            ) : null}
            {status === "error" ? (
              <div
                role="alert"
                className="mt-5 flex items-start gap-2 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {t("contact.error")}
              </div>
            ) : null}

            {!configured ? (
              <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-xs leading-relaxed text-amber-100/75">
                {t("contact.notConfigured")}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-[11px] text-[#7f8aa3]">{t("contact.privacy")}</p>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || !configured}
                className="btn-sheen w-full sm:w-auto"
              >
                {isSubmitting ? t("contact.sending") : t("contact.send")}
                <Send className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
