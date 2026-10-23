"use client";

import { useEffect } from "react";

import { useI18n } from "@/lib/i18n/provider";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold tracking-[0.3em] text-[#6f7a93] uppercase">
        {t("common.error")}
      </p>
      <h1 className="mt-3 text-2xl font-bold text-white">{t("common.serverError")}</h1>
      <p className="mt-2 max-w-md text-sm text-[#8b94aa]">{t("common.errorDesc")}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-gradient-to-r from-[#4f7cff] to-[#8b5cf6] px-6 py-3 text-sm font-semibold text-white"
      >
        {t("common.retry")}
      </button>
    </div>
  );
}
