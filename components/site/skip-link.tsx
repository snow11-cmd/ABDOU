"use client";

import { useI18n } from "@/lib/i18n/provider";

export function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-[#080b14]"
    >
      {t("common.skip")}
    </a>
  );
}
