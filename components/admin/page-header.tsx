"use client";

import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";

export function AdminPageHeader({
  titleKey,
  subtitleKey,
  children,
}: {
  titleKey: DictKey;
  subtitleKey?: DictKey;
  children?: React.ReactNode;
}) {
  const { t } = useI18n();
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {t(titleKey)}
        </h1>
        {subtitleKey ? <p className="mt-1.5 text-sm text-[#dbe1ec]">{t(subtitleKey)}</p> : null}
      </div>
      {children ? <div className="flex shrink-0 items-center gap-2">{children}</div> : null}
    </div>
  );
}
