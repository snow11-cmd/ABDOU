"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";

import {
  BrandTelegramIcon,
  CheckedIcon,
  ClockIcon,
  GithubIcon,
  LinkedinIcon,
  MailFilledIcon,
  MessageCircleIcon,
  SendIcon,
  TriangleAlertIcon,
  TwitterXIcon,
  WhatsappIcon,
} from "@/components/icons";
import { IconHoverContext } from "@/components/icons/hover";
import { Input, Label, Textarea } from "@/components/ui/form";
import { IconTile } from "@/components/ui/icon-tile";
import { FadeIn, Reveal } from "@/components/ui/motion-primitives";
import { StatusDot } from "@/components/ui/status-dot";
import type { SiteSettings } from "@/lib/data/types";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { gmailComposeUrl, isSupabaseConfigured } from "@/lib/utils";
import { contactSchema, type ContactInput } from "@/lib/validations";

function digits(value: string) {
  return value.replace(/[^\d]/g, "");
}

export function ContactPageContent({
  settings,
  configured = isSupabaseConfigured(),
}: {
  settings: SiteSettings;
  configured?: boolean;
}) {
  const { t, locale } = useI18n();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const rowHover = (key: string) => ({
    onMouseEnter: () => setHoveredRow(key),
    onMouseLeave: () => setHoveredRow(null),
    onFocus: () => setHoveredRow(key),
    onBlur: () => setHoveredRow(null),
  });

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

  const socials: Array<{ href: string; label: string; icon: ReactNode }> = [];
  if (settings.github)
    socials.push({
      href: settings.github,
      label: "GitHub",
      icon: <GithubIcon size={16} strokeWidth={1.75} aria-hidden="true" />,
    });
  if (settings.linkedin)
    socials.push({
      href: settings.linkedin,
      label: "LinkedIn",
      icon: <LinkedinIcon size={16} strokeWidth={1.75} aria-hidden="true" />,
    });
  if (settings.x)
    socials.push({
      href: settings.x,
      label: "X",
      icon: <TwitterXIcon size={16} strokeWidth={1.75} aria-hidden="true" />,
    });
  if (settings.telegram)
    socials.push({
      href: settings.telegram,
      label: "Telegram",
      icon: <BrandTelegramIcon size={16} strokeWidth={1.75} aria-hidden="true" />,
    });
  const whatsappNumber = digits(settings.whatsapp);
  if (whatsappNumber)
    socials.push({
      href: `https://wa.me/${whatsappNumber}`,
      label: "WhatsApp",
      icon: <WhatsappIcon size={16} strokeWidth={1.75} aria-hidden="true" />,
    });

  return (
    <>
      <section className="mx-auto w-full max-w-[75rem] px-6 pt-32 pb-10 sm:px-10 sm:pt-40 sm:pb-14 lg:pt-48">
        <FadeIn className="max-w-3xl">
          <span className="type-label text-neutral-600 dark:text-neutral-200">
            {t("contact.label")}
          </span>
          <h1 className="type-title mt-5 max-w-[16ch] text-neutral-950 dark:text-[#f4f1ea]">
            {t("contact.title")}
          </h1>
          <p className="type-body mt-5 max-w-[50ch] text-neutral-600 dark:text-neutral-200">
            {t("contact.subtitle")}
          </p>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[75rem] px-6 pb-16 sm:px-10 sm:pb-24">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="order-2 flex flex-col gap-3 lg:order-1">
            <Reveal>
              <IconHoverContext.Provider value={hoveredRow === "email"}>
                <a
                  href={gmailComposeUrl(settings.email)}
                  target="_blank"
                  rel="noreferrer noopener"
                  {...rowHover("email")}
                  className="group flex items-center gap-4 rounded-[1.5rem] border border-black/[0.08] bg-white/80 p-4 backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_45px_-40px_rgba(0,0,0,0.5)] dark:border-white/[0.09] dark:bg-white/[0.035] dark:hover:bg-white/[0.07]"
                >
                  <IconTile icon={MailFilledIcon} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[9px] tracking-[0.16em] text-neutral-600 uppercase dark:text-neutral-200">
                      {t("contact.emailLabel")}
                    </span>
                    <span
                      className="mt-0.5 block truncate text-[13px] font-medium text-neutral-900 dark:text-neutral-100"
                      dir="ltr"
                    >
                      {settings.email}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-neutral-600 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:text-neutral-100 dark:text-neutral-300 dark:group-hover:text-white"
                    aria-hidden="true"
                  />
                </a>
              </IconHoverContext.Provider>
            </Reveal>

            {whatsappNumber ? (
              <Reveal delay={0.05}>
                <IconHoverContext.Provider value={hoveredRow === "whatsapp"}>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    {...rowHover("whatsapp")}
                    className="group flex items-center gap-4 rounded-[1.5rem] border border-black/[0.08] bg-white/80 p-4 backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_45px_-40px_rgba(0,0,0,0.5)] dark:border-white/[0.09] dark:bg-white/[0.035] dark:hover:bg-white/[0.07]"
                  >
                    <IconTile icon={MessageCircleIcon} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[9px] tracking-[0.16em] text-neutral-600 uppercase dark:text-neutral-200">
                        {t("contact.whatsapp")}
                      </span>
                      <span
                        className="mt-0.5 block truncate text-[13px] font-medium text-neutral-900 dark:text-neutral-100"
                        dir="ltr"
                      >
                        +{whatsappNumber}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-neutral-600 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:text-neutral-100 dark:text-neutral-300 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                  </a>
                </IconHoverContext.Provider>
              </Reveal>
            ) : null}

            <Reveal delay={0.1}>
              <IconHoverContext.Provider value={hoveredRow === "available"}>
                <div
                  {...rowHover("available")}
                  className="rounded-[1.5rem] border border-black/[0.08] bg-white/80 p-5 backdrop-blur dark:border-white/[0.09] dark:bg-white/[0.035]"
                >
                  <div className="flex items-center gap-3">
                    <IconTile icon={ClockIcon} size="sm" />
                    <div>
                      <p className="text-[9px] tracking-[0.16em] text-neutral-600 uppercase dark:text-neutral-200">
                        {t("contact.availableLabel")}
                      </p>
                      <p className="mt-0.5 text-[12px] font-medium text-neutral-800 dark:text-neutral-200">
                        {t("contact.responseTime")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 border-t border-black/[0.06] pt-4 text-[10px] text-neutral-600 dark:border-white/[0.08] dark:text-neutral-200">
                    <StatusDot size="xs" />
                    {t("about.available")}
                  </div>
                </div>
              </IconHoverContext.Provider>
            </Reveal>

            {socials.length > 0 ? (
              <Reveal delay={0.15}>
                <div className="rounded-[1.5rem] border border-black/[0.08] bg-white/80 p-5 backdrop-blur dark:border-white/[0.09] dark:bg-white/[0.035]">
                  <p className="text-[9px] tracking-[0.16em] text-neutral-600 uppercase dark:text-neutral-200">
                    {t("contact.direct")}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={social.label}
                        className="icon-tile grid size-10 place-items-center rounded-xl border border-black/[0.08] bg-white text-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-white/[0.09] dark:bg-white/[0.045] dark:text-neutral-100 dark:focus-visible:outline-white"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={0.04} className="order-1 lg:order-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-[1.7rem] border border-black/[0.08] bg-white/90 p-5 shadow-[0_25px_70px_-60px_rgba(0,0,0,0.5)] backdrop-blur sm:p-8 dark:border-white/[0.09] dark:bg-[#121214]/90"
            >
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.07] pb-4 dark:border-white/[0.08]">
                <span className="inline-flex items-center gap-2 text-[10px] font-medium text-neutral-600 dark:text-neutral-100">
                  <StatusDot size="xs" />
                  {t("contact.formLabel")}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] text-neutral-600 uppercase dark:text-neutral-200">
                  <ClockIcon size={12} strokeWidth={1.75} aria-hidden="true" />
                  {t("contact.formMeta")}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="name"
                    className="mb-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-100"
                  >
                    {t("contact.name")}
                  </Label>
                  <Input
                    id="name"
                    placeholder={t("contact.namePh")}
                    autoComplete="name"
                    className="h-11 bg-white dark:bg-white/[0.045]"
                    aria-invalid={Boolean(errors.name)}
                    {...register("name")}
                  />
                  {errors.name?.message ? (
                    <p className="mt-1.5 text-[11px] text-rose-600 dark:text-rose-400">
                      {translateError(errors.name.message)}
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
                    placeholder={t("contact.emailPh")}
                    autoComplete="email"
                    className="h-11 bg-white dark:bg-white/[0.045]"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                  />
                  {errors.email?.message ? (
                    <p className="mt-1.5 text-[11px] text-rose-600 dark:text-rose-400">
                      {translateError(errors.email.message)}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4">
                <Label
                  htmlFor="subject"
                  className="mb-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-100"
                >
                  {t("contact.subject")}
                </Label>
                <Input
                  id="subject"
                  placeholder={t("contact.subjectPh")}
                  className="h-11 bg-white dark:bg-white/[0.045]"
                  aria-invalid={Boolean(errors.subject)}
                  {...register("subject")}
                />
                {errors.subject?.message ? (
                  <p className="mt-1.5 text-[11px] text-rose-600 dark:text-rose-400">
                    {translateError(errors.subject.message)}
                  </p>
                ) : null}
              </div>

              <div className="mt-4">
                <Label
                  htmlFor="message"
                  className="mb-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-100"
                >
                  {t("contact.message")}
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder={t("contact.messagePh")}
                  className="min-h-32 bg-white dark:bg-white/[0.045]"
                  aria-invalid={Boolean(errors.message)}
                  {...register("message")}
                />
                {errors.message?.message ? (
                  <p className="mt-1.5 text-[11px] text-rose-600 dark:text-rose-400">
                    {translateError(errors.message.message)}
                  </p>
                ) : null}
              </div>

              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              {status === "success" ? (
                <div
                  role="status"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-700/15 bg-emerald-50 px-4 py-3 text-[12px] text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                >
                  <CheckedIcon size={16} strokeWidth={1.75} aria-hidden="true" />
                  {t("contact.success")}
                </div>
              ) : null}
              {status === "error" ? (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-rose-700/15 bg-rose-50 px-4 py-3 text-[12px] text-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
                >
                  <TriangleAlertIcon size={16} strokeWidth={1.75} aria-hidden="true" />
                  {t("contact.error")}
                </div>
              ) : null}

              {!configured ? (
                <div className="mt-4 rounded-xl border border-amber-700/15 bg-amber-50 px-4 py-3 text-[11px] leading-[1.8] text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                  {t("contact.notConfigured")}
                </div>
              ) : null}

              <div className="mt-5 flex flex-col items-start justify-between gap-3 border-t border-black/[0.07] pt-5 sm:flex-row sm:items-center dark:border-white/[0.08]">
                <p className="max-w-[36ch] text-[10px] leading-[1.7] text-neutral-600 dark:text-neutral-200">
                  {t("contact.privacy")}
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || !configured}
                  className="group inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-[12px] font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto dark:bg-[#f4f1ea] dark:text-neutral-950 dark:hover:bg-white dark:focus-visible:outline-white"
                >
                  {isSubmitting ? t("contact.sending") : t("contact.send")}
                  <SendIcon size={14} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>

        <p className="mt-8 text-center text-[10px] text-neutral-600 dark:text-neutral-200">
          {locale(
            "Ø£Ø¹Ù…Ù„ Ø¹Ù† Ø¨ÙØ¹Ø¯ Ù…Ù† ÙÙ„Ø³Ø·ÙŠÙ† â€” Ù…Ø¹ ÙØ±Ù‚ ÙˆØ¹Ù„Ø§Ù…Ø§Øª Ø­ÙˆÙ„ Ø§Ù„Ø¹Ø§Ù„Ù….",
            "Working remotely from Palestine â€” with teams and brands worldwide.",
          )}
        </p>
      </section>
    </>
  );
}
