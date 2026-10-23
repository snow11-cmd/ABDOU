"use client";

import { useEffect } from "react";

import { useI18n } from "@/lib/i18n/provider";
import { siteConfig } from "@/lib/site-config";

/**
 * The app is Arabic-first and its metadata is rendered on the server. When a
 * visitor chooses English we keep the visible homepage heading and the browser
 * metadata consistent without affecting project-specific page titles.
 */
export function HomeMetadata() {
  const { lang } = useI18n();

  useEffect(() => {
    const apply = () => {
      const title =
        lang === "ar"
          ? `${siteConfig.nameAr} — ${siteConfig.roleAr}`
          : `${siteConfig.nameEn} — ${siteConfig.roleEn}`;
      const description = lang === "ar" ? siteConfig.descriptionAr : siteConfig.descriptionEn;

      document.title = title;
      for (const [selector, content] of [
        ['meta[name="description"]', description],
        ['meta[property="og:title"]', title],
        ['meta[property="og:description"]', description],
        ['meta[name="twitter:title"]', title],
        ['meta[name="twitter:description"]', description],
      ] as const) {
        document.querySelector(selector)?.setAttribute("content", content);
      }
    };

    apply();
    // Next's head manager can restore server metadata once hydration settles.
    const timer = window.setTimeout(apply, 120);
    return () => window.clearTimeout(timer);
  }, [lang]);

  return null;
}
