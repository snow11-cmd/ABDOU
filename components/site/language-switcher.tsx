"use client";

import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  compact = false,
  tone = "dark",
  className,
}: {
  compact?: boolean;
  tone?: "dark" | "light";
  className?: string;
}) {
  const { lang, toggleLang, t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t(lang === "ar" ? "lang.toEnglish" : "lang.toArabic")}
      className={cn(
        "group inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2.5 text-[11px] font-semibold tracking-[0.08em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2",
        tone === "light"
          ? "text-white/85 hover:bg-white/10 hover:text-white focus-visible:outline-white"
          : "text-neutral-600 hover:bg-black/[0.045] hover:text-neutral-950 focus-visible:outline-black dark:text-neutral-100 dark:hover:bg-white/[0.08] dark:hover:text-white dark:focus-visible:outline-white",
        compact && "md:h-9 md:min-w-9 md:px-2",
        className,
      )}
    >
      <span className="min-w-5 tabular-nums">{lang === "ar" ? "EN" : "AR"}</span>
    </button>
  );
}
