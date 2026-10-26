"use client";

import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/site/language-switcher";
import { Logo, LogoMark } from "@/components/ui/logo";
import { useI18n } from "@/lib/i18n/provider";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora opacity-70" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_10%,transparent_75%)] opacity-[0.25]" />
      </div>

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070a12]/80 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
        {/* Visual side */}
        <div className="relative hidden flex-col justify-between overflow-hidden border-e border-white/[0.06] bg-[linear-gradient(150deg,rgba(255,255,255,0.07),rgba(7,10,18,0.4)_55%,rgba(255,255,255,0.035))] p-10 lg:flex">
          <div className="absolute -start-20 top-16 h-64 w-64 rounded-full bg-white/[0.06] blur-[80px]" />
          <div className="absolute -end-10 bottom-0 h-56 w-56 rounded-full bg-white/[0.04] blur-[70px]" />

          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-2 text-sm text-[#eaeef5] transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("common.goHome")}
          </Link>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-8 grid h-40 w-40 place-items-center">
              <div className="absolute inset-0 rounded-[2.2rem] border border-white/10" />
              <div className="absolute inset-4 rounded-[1.7rem] border border-white/[0.06]" />
              <LogoMark
                size="xl"
                className="relative bg-white text-neutral-950 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]"
              />
            </div>
            <p className="max-w-xs text-lg leading-relaxed font-semibold text-pretty text-[#eef2f9]">
              “{t("footer.tagline")}”
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-[#dbe1ec]">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" />
              {t("admin.authorizationNote")}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-[11px] text-[#c6cfdf]">
            <Sparkles className="h-3.5 w-3.5 text-[#8ab4ff]" />
            Next.js · Supabase · TypeScript
          </div>
        </div>

        {/* Form side */}
        <div className="auth-form hero-enter p-7 sm:p-10">
          <div className="mb-8 flex items-center justify-between gap-3">
            <Logo tone="light" />
            <LanguageSwitcher compact tone="light" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h1>
          {subtitle ? (
            <p className="mt-2 text-sm leading-relaxed text-[#dbe1ec]">{subtitle}</p>
          ) : null}
          <div className="mt-8">{children}</div>
          {footer ? <div className="mt-6 text-center text-sm text-[#dbe1ec]">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}

export function SetupRequiredNotice() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.07] p-5">
      <h2 className="flex items-center gap-2 text-sm font-bold text-amber-200">
        <ShieldCheck className="h-4 w-4" />
        {t("auth.notConfiguredTitle")}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-amber-100/75">
        {t("auth.notConfiguredDesc")}
      </p>
      <p className="mt-3 text-xs text-amber-200/60">{t("auth.setupDocs")}</p>
    </div>
  );
}
