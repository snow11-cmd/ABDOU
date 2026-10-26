"use client";

import { ButtonLink } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="site-theme flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-neutral-950 dark:bg-[#0b0b0c] dark:text-[#f4f1ea]">
      <p className="font-mono text-[11px] font-semibold tracking-[0.28em] text-neutral-600 uppercase dark:text-neutral-200">
        404
      </p>
      <h1 className="type-title mt-4 max-w-[16ch]">{t("common.notFoundTitle")}</h1>
      <p className="type-body mt-4 max-w-md text-neutral-600 dark:text-neutral-200">
        {t("common.notFoundDesc")}
      </p>
      <ButtonLink href="/" className="mt-7">
        {t("common.goHome")}
      </ButtonLink>
    </div>
  );
}
