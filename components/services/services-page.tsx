"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  CartIcon,
  CodeIcon,
  CpuIcon,
  LayersIcon,
  LayoutDashboardIcon,
  PaintIcon,
  SparklesIcon,
  type AnimatedIconComponent,
} from "@/components/icons";
import { IconHoverContext } from "@/components/icons/hover";
import { IconTile } from "@/components/ui/icon-tile";
import { FadeIn, Reveal } from "@/components/ui/motion-primitives";
import type { Service } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";
import { formatMoney } from "@/lib/utils";

const iconMap: Record<string, AnimatedIconComponent> = {
  Code2: CodeIcon,
  LayoutTemplate: LayoutDashboardIcon,
  Server: CpuIcon,
  PenTool: PaintIcon,
  ShoppingCart: CartIcon,
  Sparkles: SparklesIcon,
  Layers: LayersIcon,
};

const fallbackIcons: AnimatedIconComponent[] = [
  CodeIcon,
  LayoutDashboardIcon,
  CpuIcon,
  PaintIcon,
  CartIcon,
  SparklesIcon,
];

export function ServicesPageContent({ services }: { services: Service[] }) {
  const { t, lang, locale } = useI18n();
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <>
      <section className="mx-auto w-full max-w-[75rem] px-6 pt-32 pb-10 sm:px-10 sm:pt-40 sm:pb-14 lg:pt-48">
        <FadeIn className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)] md:items-end">
          <div>
            <span className="type-label text-neutral-600 dark:text-neutral-200">
              {t("services.label")}
            </span>
            <h1 className="type-title mt-5 max-w-[18ch] text-neutral-950 dark:text-[#f4f1ea]">
              {t("services.title")}
            </h1>
          </div>
          <div className="md:pb-2">
            <p className="type-lead max-w-[40ch] text-neutral-600 dark:text-neutral-200">
              {t("services.subtitle")}
            </p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-neutral-600 dark:text-neutral-300">
              {String(services.length).padStart(2, "0")} — SERVICES
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[75rem] px-6 pb-14 sm:px-10 sm:pb-20">
        {services.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] ?? fallbackIcons[index % fallbackIcons.length];
              const title = locale(service.titleAr, service.titleEn);
              const description = locale(service.descriptionAr, service.descriptionEn);

              return (
                <Reveal key={service.id} delay={Math.min(index * 0.04, 0.2)}>
                  <IconHoverContext.Provider value={hoveredService === service.id}>
                    <article
                      className="group flex h-full flex-col rounded-[1.7rem] border border-black/[0.08] bg-white/80 p-5 backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-black/[0.14] hover:bg-white hover:shadow-[0_26px_55px_-45px_rgba(0,0,0,0.55)] sm:p-7 dark:border-white/[0.09] dark:bg-white/[0.035] dark:hover:border-white/[0.18] dark:hover:bg-white/[0.06] dark:hover:shadow-none"
                      onMouseEnter={() => setHoveredService(service.id)}
                      onMouseLeave={() => setHoveredService(null)}
                      onFocus={() => setHoveredService(service.id)}
                      onBlur={() => setHoveredService(null)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <IconTile icon={Icon} size="lg" />
                        <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h2 className="type-card mt-6 text-neutral-950 dark:text-[#f4f1ea]">
                        {title}
                      </h2>
                      <p className="type-body mt-2.5 max-w-[46ch] text-neutral-600 dark:text-neutral-200">
                        {description}
                      </p>

                      <div className="mt-auto flex items-end justify-between gap-4 border-t border-black/[0.06] pt-5 dark:border-white/[0.08]">
                        <div>
                          <p className="text-[9px] tracking-[0.16em] text-neutral-600 uppercase dark:text-neutral-200">
                            {t("services.startFrom")}
                          </p>
                          <p className="mt-1 text-[1.2rem] font-semibold tracking-tight text-neutral-950 tabular-nums dark:text-[#f4f1ea]">
                            {formatMoney(service.price, "USD", lang)}
                          </p>
                        </div>

                        <Link
                          href={`/checkout?service=${encodeURIComponent(service.slug)}`}
                          className="group/order inline-flex h-10 items-center gap-2 rounded-xl bg-neutral-950 px-4 text-[12px] font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-[#f4f1ea] dark:text-neutral-950 dark:hover:bg-white dark:focus-visible:outline-white"
                        >
                          {t("services.order")}
                          <ArrowUpRight
                            className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/order:translate-x-0.5 group-hover/order:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </article>
                  </IconHoverContext.Provider>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[1.7rem] border border-black/[0.08] bg-white/75 px-6 py-16 text-center dark:border-white/[0.09] dark:bg-white/[0.035]">
            <p className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
              {t("checkout.noServicesTitle")}
            </p>
            <p className="mx-auto mt-2 max-w-md text-[13px] leading-[1.8] text-neutral-600 dark:text-neutral-200">
              {t("checkout.noServicesDesc")}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-neutral-950 px-4 text-[12px] font-medium text-white dark:bg-[#f4f1ea] dark:text-neutral-950"
            >
              {t("nav.contact")}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-[75rem] px-6 pb-12 sm:px-10 sm:pb-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-5 rounded-[1.7rem] border border-black/[0.08] bg-neutral-950 px-6 py-8 text-white sm:flex-row sm:items-center sm:px-9 dark:border-white/[0.12] dark:bg-[#141416]">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-white/75 uppercase">
                {t("footer.ctaLabel")}
              </p>
              <p className="mt-2 max-w-[30ch] text-[1.4rem] leading-[1.3] font-semibold tracking-[-0.025em] sm:text-[1.7rem]">
                {t("services.cta")}
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-5 text-[12px] font-medium text-neutral-950 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-[#c6a15b] dark:text-neutral-950 dark:hover:bg-[#d4b26e]"
            >
              {t("nav.contact")}
              <ArrowUpRight
                className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
