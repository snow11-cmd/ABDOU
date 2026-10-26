"use client";

import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";

export function PageHeader({
  eyebrowKey,
  titleKey,
  subtitleKey,
}: {
  eyebrowKey: DictKey;
  titleKey: DictKey;
  subtitleKey?: DictKey;
}) {
  const { t } = useI18n();
  return (
    <div className="max-w-2xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/60 px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-neutral-100 dark:shadow-none">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-slate-950 to-slate-400 dark:from-[#c6a15b] dark:to-[#f4f1ea]" />
        {t(eyebrowKey)}
      </span>
      <h1 className="type-title mt-4 text-slate-950 dark:text-[#f4f1ea]">{t(titleKey)}</h1>
      {subtitleKey ? (
        <p className="type-body mt-3 text-slate-700 dark:text-neutral-200">{t(subtitleKey)}</p>
      ) : null}
    </div>
  );
}
