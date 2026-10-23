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
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-[#9db8ff]">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#4f7cff] to-[#22d3ee]" />
        {t(eyebrowKey)}
      </span>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {t(titleKey)}
      </h1>
      {subtitleKey ? (
        <p className="mt-3 text-sm leading-relaxed text-[#8b94aa]">{t(subtitleKey)}</p>
      ) : null}
    </div>
  );
}
