"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ContactButton } from "@/components/contact/contact-button";
import { PortraitMorph } from "@/components/hero/portrait-morph";
import { MapPinIcon, SparklesIcon } from "@/components/icons";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { PointerGlow } from "@/components/ui/pointer-glow";
import { StatusDot } from "@/components/ui/status-dot";
import { Tilt } from "@/components/ui/tilt";
import type { SiteSettings } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";

const stats = [
  { value: "6+", label: "hero.statYears" },
  { value: "40+", label: "hero.statProjects" },
  { value: "25+", label: "hero.statClients" },
] as const;

export function Hero({ settings }: { settings: SiteSettings }) {
  const { t, lang, locale } = useI18n();
  const name = locale(settings.nameAr, settings.nameEn);
  const roleLines =
    lang === "ar"
      ? ["مطور ويب متكامل", "ومصمم تجارب رقمية"]
      : ["Full-stack developer", "& digital experience designer"];

  return (
    <section className="site-hero relative isolate w-full">
      <PointerGlow className="z-0" />
      <div className="relative z-10 mx-auto w-full max-w-[75rem] px-6 pt-32 pb-16 sm:px-10 sm:pt-40 sm:pb-24 lg:pt-48">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-8 lg:gap-14">
          <FadeIn className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/60 px-3 py-1.5 text-[11px] font-medium text-neutral-600 backdrop-blur dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-neutral-100">
              <StatusDot size="xs" />
              <span>{t("hero.badge")}</span>
            </div>

            <p className="mt-7 text-[clamp(1.05rem,0.98rem+0.42vw,1.32rem)] leading-tight font-medium tracking-tight text-neutral-600 dark:text-neutral-200">
              {t("hero.greeting")}{" "}
              <span className="text-neutral-950 dark:text-[#f4f1ea]">{name}</span>
              <span aria-hidden="true" className="ms-1 inline-block">
                👋
              </span>
            </p>

            <h1 className="type-display mt-3 max-w-[18ch] text-neutral-950 dark:text-[#f4f1ea]">
              {roleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="type-body mt-6 max-w-[52ch] text-neutral-600 dark:text-neutral-200">
              {t("hero.intro")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactButton email={settings.email} label={t("hero.ctaContact")} />
              <Link
                href="/work"
                className="group inline-flex h-11 items-center gap-2 rounded-xl border border-black/[0.08] bg-white/80 px-5 text-[13px] font-medium text-neutral-900 backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-black/[0.16] hover:bg-white hover:shadow-[0_14px_30px_-24px_rgba(0,0,0,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-white/[0.12] dark:bg-white/[0.05] dark:text-neutral-100 dark:hover:border-white/[0.22] dark:hover:bg-white/[0.09] dark:focus-visible:outline-white"
              >
                {t("hero.ctaWork")}
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="mt-10 grid w-full max-w-md grid-cols-3 gap-2 border-t border-black/[0.08] pt-5 dark:border-white/[0.1]">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-semibold tracking-tight text-neutral-950 tabular-nums dark:text-[#f4f1ea]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-200">
                    {t(stat.label)}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <ScaleUnblur delay={0.08} className="mx-auto w-full max-w-[25rem] md:max-w-none">
            <Tilt maxTilt={5} hoverScale={1.015}>
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.08] bg-neutral-100 p-1.5 shadow-[0_35px_80px_-55px_rgba(0,0,0,0.55)] transition-colors duration-500 dark:border-white/[0.12] dark:bg-white/[0.04] dark:shadow-[0_35px_80px_-48px_rgba(0,0,0,0.95)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-neutral-200 dark:bg-neutral-800">
                    <PortraitMorph
                      srcA="/portrait.webp"
                      srcB="/portrait-wave.webp"
                      alt={t("hero.portraitAlt")}
                      className="h-full w-full"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-black/5 ring-inset dark:ring-white/10"
                    />
                  </div>
                </div>

                <div className="absolute start-5 end-5 -bottom-5 flex items-center justify-between gap-3 rounded-xl border border-black/[0.08] bg-white/90 px-3.5 py-2.5 shadow-[0_18px_35px_-28px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:start-7 sm:end-7 dark:border-white/[0.12] dark:bg-[#121214]/90 dark:shadow-[0_18px_35px_-20px_rgba(0,0,0,0.9)]">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-100">
                    <MapPinIcon size={13} strokeWidth={1.75} aria-hidden="true" />
                    {t("about.location")}
                  </span>
                  <SparklesIcon
                    size={14}
                    strokeWidth={1.6}
                    className="text-neutral-600 dark:text-[#c6a15b]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Tilt>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
