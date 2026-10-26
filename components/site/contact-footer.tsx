"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { ContactButton } from "@/components/contact/contact-button";
import {
  ArrowNarrowUpIcon,
  BrandTelegramIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterXIcon,
  WhatsappIcon,
} from "@/components/icons";
import { ShaderFlow } from "@/components/shaders/shader-flow";
import { FadeIn } from "@/components/ui/motion-primitives";
import { StatusDot } from "@/components/ui/status-dot";
import type { SiteSettings } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";

const MASK =
  "radial-gradient(ellipse 95% 120% at 50% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 46%, rgba(0,0,0,0.2) 78%, transparent 100%)";

function whatsappHref(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

export function ContactFooter({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const { t, locale } = useI18n();
  const name = locale(settings.nameAr, settings.nameEn);
  const year = new Date().getFullYear();

  const socials: Array<{ href: string; label: string; icon: ReactNode }> = [];
  if (settings.github)
    socials.push({
      href: settings.github,
      label: "GitHub",
      icon: <GithubIcon size={16} strokeWidth={1.75} aria-hidden="true" />,
    });
  if (settings.linkedin)
    socials.push({
      href: settings.linkedin,
      label: "LinkedIn",
      icon: <LinkedinIcon size={16} strokeWidth={1.75} aria-hidden="true" />,
    });
  if (settings.x)
    socials.push({
      href: settings.x,
      label: "X",
      icon: <TwitterXIcon size={16} strokeWidth={1.75} aria-hidden="true" />,
    });
  if (settings.telegram)
    socials.push({
      href: settings.telegram,
      label: "Telegram",
      icon: <BrandTelegramIcon size={16} strokeWidth={1.75} aria-hidden="true" />,
    });
  const whatsapp = settings.whatsapp ? whatsappHref(settings.whatsapp) : null;
  if (whatsapp)
    socials.push({
      href: whatsapp,
      label: "WhatsApp",
      icon: <WhatsappIcon size={16} strokeWidth={1.75} aria-hidden="true" />,
    });

  if (pathname === "/contact" || pathname.startsWith("/checkout")) return null;

  return (
    <footer id="contact" className="relative z-10 mt-16 px-4 pb-5 sm:mt-24 sm:px-6">
      <FadeIn className="mx-auto w-full max-w-[75rem]">
        <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.08] bg-white p-1.5 shadow-[0_25px_70px_-55px_rgba(0,0,0,0.55)] dark:border-white/[0.1] dark:bg-white/[0.035] dark:shadow-[0_25px_70px_-40px_rgba(0,0,0,0.95)]">
          <div className="relative overflow-hidden rounded-[1.6rem] bg-neutral-50 dark:bg-[#101012]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply dark:opacity-[0.18] dark:mix-blend-screen"
              style={{ WebkitMaskImage: MASK, maskImage: MASK }}
            >
              <ShaderFlow
                className="absolute inset-0 h-full w-full"
                brightness={1.2}
                iterations={10}
                flowSpeed={[0, 0.09]}
                fadeRx={1.2}
                fadeRy={0.9}
              />
            </div>

            <div className="relative px-6 pt-9 pb-6 sm:px-10 sm:pt-12 sm:pb-8 lg:px-14 lg:pt-14">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-3 py-1.5 text-[10px] font-medium text-neutral-600 backdrop-blur dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-neutral-100">
                    <StatusDot size="xs" />
                    {t("hero.badge")}
                  </span>
                  <h2 className="type-section mt-5 max-w-[15ch] text-neutral-950 dark:text-[#f4f1ea]">
                    {t("contact.title")}
                  </h2>
                  <p className="type-body mt-4 max-w-[45ch] text-neutral-600 dark:text-neutral-200">
                    {t("contact.subtitle")}
                  </p>
                  <div className="mt-7">
                    <ContactButton email={settings.email} label={t("hero.ctaContact")} />
                  </div>
                </div>

                <div className="flex flex-col gap-6 lg:items-end">
                  {socials.length > 0 ? (
                    <div className="lg:text-end">
                      <p className="type-label text-neutral-600 dark:text-neutral-200">
                        {t("footer.socials")}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {socials.map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={social.label}
                            className="icon-tile grid size-10 place-items-center rounded-xl border border-black/[0.08] bg-white/80 text-neutral-700 shadow-sm backdrop-blur transition-colors hover:border-black/[0.15] hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-neutral-100 dark:hover:border-white/[0.2] dark:hover:text-white dark:focus-visible:outline-white"
                          >
                            {social.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <a
                    href={`mailto:${settings.email}`}
                    className="text-[12px] font-medium text-neutral-600 underline decoration-black/15 underline-offset-4 transition-colors hover:text-neutral-950 dark:text-neutral-200 dark:decoration-white/20 dark:hover:text-white"
                    dir="ltr"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-3 border-t border-black/[0.08] pt-4 text-[10px] text-neutral-600 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.09] dark:text-neutral-200">
                <p>
                  © {year} {name}. {t("footer.rights")}
                </p>
                <div className="flex items-center gap-4">
                  <span>{t("footer.built")}</span>
                  <a
                    href="#top"
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-neutral-900 dark:hover:text-white"
                  >
                    {t("footer.top")}
                    <ArrowNarrowUpIcon
                      size={12}
                      strokeWidth={1.75}
                      className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
