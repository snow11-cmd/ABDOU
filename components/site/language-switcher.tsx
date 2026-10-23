"use client";

import { Languages } from "lucide-react";

import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, toggleLang, t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t(lang === "ar" ? "lang.toEnglish" : "lang.toArabic")}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-[#c3cbdd] transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white",
        compact && "h-8 px-2.5",
      )}
    >
      <Languages className="size-4 text-[#9db8ff] opacity-85" aria-hidden="true" />
      <span className="min-w-6 tabular-nums">{lang === "ar" ? "EN" : "ع"}</span>
    </button>
  );
}
