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
    <div className="site-theme relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-10%,rgba(198,161,91,0.16),transparent_60%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_50%_-10%,rgba(198,161,91,0.1),transparent_60%)]" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_10%,transparent_75%)] opacity-[0.3] dark:opacity-[0.14]" />
      </div>

      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] shadow-[0_40px_120px_-60px_rgba(15,23,42,0.35)] lg:grid-cols-[1.05fr_0.95fr] dark:shadow-[0_40px_120px_-50px_rgba(0,0,0,0.95)]">
        {/* Visual side */}
        <div className="relative hidden flex-col justify-between overflow-hidden border-e border-[var(--border)] bg-[var(--muted)] p-10 lg:flex">
          <div className="absolute -start-24 top-10 h-64 w-64 rounded-full bg-[#c6a15b]/10 blur-[90px]" />
          <div className="absolute -end-16 bottom-0 h-64 w-64 rounded-full bg-[#c6a15b]/5 blur-[80px]" />

          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("common.goHome")}
          </Link>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-9 grid h-40 w-40 place-items-center">
              <div className="absolute inset-0 rounded-[2.2rem] border border-[var(--border)]" />
              <div className="absolute inset-4 rounded-[1.7rem] border border-[var(--border)] opacity-70" />
              <LogoMark
                size="xl"
                className="relative bg-neutral-950 text-white shadow-[0_24px_70px_-35px_rgba(0,0,0,0.6)] dark:bg-[#f4f1ea] dark:text-neutral-950 dark:shadow-[0_24px_70px_-35px_rgba(0,0,0,0.9)]"
              />
            </div>
            <p className="max-w-xs text-lg leading-relaxed font-semibold text-pretty text-[var(--foreground)]">
              “{t("footer.tagline")}”
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)]/60 px-3 py-1.5 text-[11px] text-[var(--muted-foreground)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#a8813f] dark:text-[#d9b877]" />
              {t("admin.authorizationNote")}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-[11px] text-[var(--muted-foreground)]">
            <Sparkles className="h-3.5 w-3.5 text-[#a8813f] dark:text-[#d9b877]" />
            Next.js · Supabase · TypeScript
          </div>
        </div>

        {/* Form side */}
        <div className="auth-form hero-enter p-7 sm:p-10">
          <div className="mb-8 flex items-center justify-between gap-3">
            <Logo tone="auto" />
            <LanguageSwitcher compact />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
              {subtitle}
            </p>
          ) : null}
          <div className="mt-8">{children}</div>
          {footer ? (
            <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function SetupRequiredNotice() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border border-amber-600/25 bg-amber-500/10 p-5 dark:border-amber-400/25 dark:bg-amber-400/[0.07]">
      <h2 className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200">
        <ShieldCheck className="h-4 w-4" />
        {t("auth.notConfiguredTitle")}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-amber-900/80 dark:text-amber-100/75">
        {t("auth.notConfiguredDesc")}
      </p>
      <p className="mt-3 text-xs text-amber-800/70 dark:text-amber-200/60">{t("auth.setupDocs")}</p>
    </div>
  );
}
