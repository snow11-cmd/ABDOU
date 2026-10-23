"use client";

import {
  ArrowUpLeft,
  Code2,
  Layers,
  LayoutTemplate,
  PenTool,
  Server,
  ShoppingCart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Icon3D, type Icon3DMotion, type Icon3DTone } from "@/components/ui/icon-3d";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Service } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";
import { formatMoney } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  LayoutTemplate,
  Server,
  PenTool,
  ShoppingCart,
  Sparkles,
  Layers,
};

const serviceMotions: Icon3DMotion[] = [
  "flip",
  "orbit",
  "rise",
  "swing",
  "magnet",
  "pivot",
  "zoom",
  "tumble",
];

const serviceTones: Icon3DTone[] = ["cyan", "violet", "coral", "mint", "amber", "cyan"];

export function Services({ services }: { services: Service[] }) {
  const { t, lang, locale } = useI18n();

  return (
    <section id="services" className="section-pad relative scroll-mt-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-1/3 h-[420px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(91,244,224,0.09),transparent_70%)]" />
      </div>
      <div className="container-x">
        <SectionHeading
          eyebrow={t("services.label")}
          title={t("services.title")}
          subtitle={t("services.subtitle")}
          index="02"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Layers;
            return (
              <Reveal key={service.id} delay={(index % 3) * 0.08}>
                <article className="card service-card group relative flex h-full flex-col p-6 sm:p-7">
                  <span
                    className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className="relative mb-5 flex h-12 items-center justify-between gap-3">
                    <Icon3D
                      icon={Icon}
                      motion={serviceMotions[index % serviceMotions.length]}
                      tone={serviceTones[index % serviceTones.length]}
                      size="lg"
                      delay={(index % 3) * 0.06}
                    />
                    <span
                      className="inline-flex h-7 shrink-0 items-center rounded-full border border-white/[0.08] bg-[#04101a]/60 px-2.5 font-mono text-[9px] font-semibold tracking-[0.12em] text-[#81969e] backdrop-blur"
                      dir="ltr"
                    >
                      {service.slug.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="relative text-lg font-bold text-white">
                    {locale(service.titleAr, service.titleEn)}
                  </h3>
                  <p className="relative mt-2.5 flex-1 text-sm leading-[1.85] text-[#8b94aa]">
                    {locale(service.descriptionAr, service.descriptionEn)}
                  </p>

                  <div className="relative mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
                    <div>
                      <div className="text-[9px] tracking-[0.14em] text-[#6b7590] uppercase">
                        {t("services.startFrom")}
                      </div>
                      <div className="mt-1 text-lg font-extrabold text-white">
                        {formatMoney(service.price, "USD", lang)}
                      </div>
                    </div>
                    <ButtonLink
                      href={`/checkout?service=${service.slug}`}
                      variant="secondary"
                      size="sm"
                      className="group/order text-xs"
                    >
                      {t("services.order")}
                      <ArrowUpLeft
                        className="size-3.5 transition-transform duration-500 group-hover/order:-translate-x-0.5 group-hover/order:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="relative mt-10 flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(120deg,rgba(91,244,224,0.08),rgba(180,155,255,0.06),rgba(255,143,163,0.035))] px-6 py-5 sm:flex-row">
            <span
              className="pointer-events-none absolute -start-16 -top-20 h-40 w-40 rounded-full bg-cyan-300/15 blur-[60px]"
              aria-hidden="true"
            />
            <p className="relative text-sm text-[#b7c9cd]">{t("services.cta")}</p>
            <ButtonLink
              href="/contact"
              size="md"
              className="btn-sheen relative shrink-0"
            >
              {t("hero.ctaContact")}
              <ArrowUpLeft className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
