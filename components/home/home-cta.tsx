"use client";

import { ArrowUpLeft, MessageSquareText } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Icon3D } from "@/components/ui/icon-3d";
import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/lib/i18n/provider";

export function HomeCta() {
  const { t } = useI18n();

  return (
    <section className="relative pb-16 sm:pb-20">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(91,244,224,0.12),rgba(77,140,255,0.08)_42%,rgba(180,155,255,0.1)_74%,rgba(255,143,163,0.06))] p-7 sm:p-10 lg:p-12">
            <span
              className="pointer-events-none absolute -end-24 -top-32 h-80 w-80 rounded-full bg-cyan-300/15 blur-[90px]"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -start-20 -bottom-40 h-72 w-72 rounded-full bg-violet-300/15 blur-[90px]"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/50 to-transparent"
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="flex max-w-2xl items-start gap-5">
                <Icon3D
                  icon={MessageSquareText}
                  motion="tilt"
                  tone="coral"
                  size="xl"
                  className="mt-1 hidden sm:inline-grid"
                />
                <div>
                  <span className="font-mono text-[9px] tracking-[0.26em] text-[#8fa5ad] uppercase">
                    {t("home.ctaLabel")}
                  </span>
                  <h2 className="mt-3 text-2xl leading-tight font-extrabold tracking-[-0.035em] text-balance text-white sm:text-3xl lg:text-[2.6rem]">
                    {t("home.ctaTitle")}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-[1.9] text-pretty text-[#b4c6ca] sm:text-base">
                    {t("home.ctaDesc")}
                  </p>
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  className="btn-sheen w-full justify-center whitespace-nowrap sm:w-auto"
                >
                  {t("home.ctaStart")}
                  <ArrowUpLeft className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href="/about"
                  variant="secondary"
                  size="lg"
                  className="w-full justify-center whitespace-nowrap sm:w-auto"
                >
                  {t("home.ctaAbout")}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
