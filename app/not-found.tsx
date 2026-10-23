"use client";

import { ButtonLink } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000,transparent_80%)] opacity-20" />
      <p className="text-gradient text-7xl font-black">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">{t("common.notFoundTitle")}</h1>
      <p className="mt-2 max-w-md text-sm text-[#8b94aa]">{t("common.notFoundDesc")}</p>
      <ButtonLink href="/" className="mt-6">
        {t("common.goHome")}
      </ButtonLink>
    </div>
  );
}
