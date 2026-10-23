"use client";

import { ArrowUpLeft, Home, Mail } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { TelegramIcon, WhatsappIcon } from "@/components/ui/social-icons";
import { SocialLinks } from "@/components/ui/social-links";
import type { SiteSettings } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";

const marqueeWords = ["Abu Jasem", "Digital Studio", "Design", "Development", "Motion", "Strategy"];

export function Footer({ settings }: { settings: SiteSettings }) {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();
  const marqueeRow = [...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords];

  return (
    <footer
      className="relative z-10 mt-8 overflow-hidden border-t border-white/[0.06] bg-[#030a12]/90"
      style={{ viewTransitionName: "site-footer" }}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#5bf4e0]/60 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_80%_100%,rgba(91,244,224,0.08),transparent_62%),radial-gradient(50%_60%_at_10%_100%,rgba(180,155,255,0.07),transparent_70%)]"
        aria-hidden="true"
      />
      <span className="footer-watermark" aria-hidden="true">
        AJ
      </span>

      <div className="relative z-10 border-b border-white/[0.05] py-6">
        <div className="footer-marquee" dir="ltr" aria-hidden="true">
          <div className="footer-marquee-track gap-10">
            {marqueeRow.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="inline-flex items-center gap-8 font-mono text-[10px] tracking-[0.24em] whitespace-nowrap text-[#8499a2] uppercase"
              >
                {word}
                <span className="h-1 w-1 rotate-45 bg-gradient-to-br from-[#5bf4e0] to-[#ff9eb0] opacity-60" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x relative z-10 py-14">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-white/[0.06] pb-10 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[9px] tracking-[0.26em] text-[#6f858e] uppercase">
              {t("footer.ctaLabel")}
            </span>
            <h2 className="mt-3 max-w-xl text-2xl leading-tight font-extrabold tracking-[-0.03em] text-balance text-white sm:text-3xl">
              {t("footer.ctaTitle")}
            </h2>
          </div>
          <ButtonLink
            href="/contact"
            variant="secondary"
            className="btn-sheen shrink-0"
          >
            {t("footer.ctaBtn")}
            <ArrowUpLeft className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-[1.9] text-[#9aafb6]">{t("footer.tagline")}</p>
            <SocialLinks settings={settings} className="mt-6" />
          </div>

          <div>
            <h3 className="mb-5 font-mono text-[9px] tracking-[0.2em] text-[#6f858e] uppercase">
              {t("footer.links")}
            </h3>
            <ul className="space-y-3 text-sm text-[#9aafb6]">
              {[
                { href: "/about", label: t("nav.about") },
                { href: "/services", label: t("nav.services") },
                { href: "/work", label: t("nav.work") },
                { href: "/contact", label: t("nav.contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 transition duration-500 hover:text-white"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-[#5bf4e0] to-[#ff9eb0] transition-all duration-500 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-mono text-[9px] tracking-[0.2em] text-[#6f858e] uppercase">
              {t("footer.contactDetails")}
            </h3>
            <ul className="space-y-3 text-sm text-[#9aafb6]">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-2 transition duration-500 hover:text-white"
                >
                  <Mail className="icon-secondary size-4 shrink-0" aria-hidden="true" />
                  {settings.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition duration-500 hover:text-white"
                >
                  <WhatsappIcon className="icon-secondary size-4 shrink-0" aria-hidden="true" />
                  {t("contact.directWhatsapp")}
                </a>
              </li>
              <li>
                <a
                  href={settings.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition duration-500 hover:text-white"
                >
                  <TelegramIcon className="icon-secondary size-4 shrink-0" aria-hidden="true" />
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/[0.06] pt-8 text-xs text-[#70858e] sm:flex-row">
          <p>
            © {year} {locale(settings.nameAr, settings.nameEn)}. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <p className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_2px_rgba(52,211,153,0.3)]" />
              {t("footer.built")}
            </p>
            <Link
              href="/"
              aria-label={t("nav.home")}
              className="group inline-flex items-center gap-2 text-[11px] font-medium text-[#9aafb6] transition hover:text-white"
            >
              {t("nav.home")}
              <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition duration-500 group-hover:-translate-y-0.5 group-hover:border-[#5bf4e0]/40 group-hover:bg-[#5bf4e0]/10">
                <Home className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
