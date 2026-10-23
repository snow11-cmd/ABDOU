"use client";

import { ArrowUpLeft, BadgeCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";

import { HeroVisual } from "@/components/three/hero-visual";
import { ButtonLink } from "@/components/ui/button";
import { FloatingGlyphs } from "@/components/ui/floating-glyphs";
import { StatusDot } from "@/components/ui/status-dot";
import { useI18n } from "@/lib/i18n/provider";

import { TechMarquee } from "./tech-marquee";

const enter = (delay: number): CSSProperties => ({ "--enter-delay": `${delay}s` }) as CSSProperties;

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-14 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora opacity-60" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_72%_60%_at_50%_38%,#000_18%,transparent_76%)] opacity-[0.22]" />
        <FloatingGlyphs />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#03070e]/80 via-[#03070e]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#03070e]/85 via-[#03070e]/25 to-transparent" />
        <div className="absolute start-1/2 top-28 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-[#5bf4e0]/[0.045] blur-[130px]" />
      </div>

      <div className="hero-watermark" aria-hidden="true">
        PORTFOLIO
      </div>

      <div
        className="pointer-events-none absolute end-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
        aria-hidden="true"
      >
        <span className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <span
          className="font-mono text-[9px] tracking-[0.3em] text-[#5f6a84] [writing-mode:vertical-rl]"
          dir="ltr"
        >
          01 — 04
        </span>
        <span className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-8">
          {/* Copy */}
          <div className="relative z-10 text-center lg:text-start">
            <div
              className="hero-enter mb-7 flex justify-center lg:justify-start"
              style={enter(0.08)}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-1.5 text-[0.7rem] font-medium tracking-wide text-cyan-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur">
                <StatusDot size="sm" />
                {t("hero.badge")}
              </span>
            </div>

            <div
              className="hero-enter mb-3 flex items-center justify-center gap-3 lg:justify-start"
              style={enter(0.15)}
            >
              <span className="kicker-line hidden sm:block" aria-hidden="true" />
              <p className="text-sm font-medium tracking-[0.08em] text-[#9aa5bc] sm:text-base">
                {t("hero.greeting")}
              </p>
            </div>

            <h1
              className="hero-enter hero-name text-[clamp(3.6rem,9.6vw,6.1rem)] leading-[0.98] font-black text-balance text-white"
              style={enter(0.22)}
            >
              <span className="text-gradient drop-shadow-[0_0_50px_rgba(91,244,224,0.22)]">
                {t("hero.name")}
              </span>
            </h1>

            <p
              className="hero-enter mx-auto mt-6 max-w-xl text-lg leading-relaxed font-semibold text-[#d5deef] sm:text-xl lg:mx-0"
              style={enter(0.34)}
            >
              {t("hero.role")}
            </p>

            <p
              className="hero-enter mx-auto mt-4 max-w-xl text-[0.98rem] leading-[1.9] text-pretty text-[#8f9ab2] lg:mx-0"
              style={enter(0.42)}
            >
              {t("hero.intro")}
            </p>

            <div
              className="hero-enter mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={enter(0.5)}
            >
              <ButtonLink
                href="/work"
                size="lg"
                className="btn-sheen w-full justify-center whitespace-nowrap sm:w-auto sm:min-w-[13rem]"
              >
                {t("hero.ctaWork")}
                <ArrowUpLeft className="size-4 shrink-0" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                size="lg"
                className="w-full justify-center whitespace-nowrap sm:w-auto sm:min-w-[13rem]"
              >
                {t("hero.ctaContact")}
                <Sparkles className="size-4 shrink-0 text-[#ffb3bf]" aria-hidden="true" />
              </ButtonLink>
            </div>

            <dl
              className="hero-enter mx-auto mt-11 grid max-w-md grid-cols-3 gap-3 border-t border-white/[0.07] pt-6 lg:mx-0"
              style={enter(0.58)}
            >
              {[
                { value: "6+", label: t("hero.statYears") },
                { value: "40+", label: t("hero.statProjects") },
                { value: "25+", label: t("hero.statClients") },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={
                    index === 0
                      ? "text-center lg:text-start"
                      : "border-s border-white/[0.07] text-center lg:text-start"
                  }
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-extrabold text-white sm:text-3xl" dir="ltr">
                    <span className="text-gradient-soft">{stat.value}</span>
                  </dd>
                  <dd className="mt-1.5 text-[0.68rem] leading-snug text-[#6f7a93] sm:text-xs">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 3D visual */}
          <div
            className="hero-visual-enter relative mx-auto h-[300px] w-full max-w-[560px] sm:h-[440px] lg:h-[clamp(430px,52svh,540px)] lg:max-w-none"
            style={enter(0.26)}
          >
            <div className="hero-stage h-full w-full">
              <div className="hero-stage-ring" aria-hidden="true" />
              <div className="hero-stage-ring hero-stage-ring--b" aria-hidden="true" />
              <div className="hero-stage-ring hero-stage-ring--c" aria-hidden="true" />

              <span className="stage-corner stage-corner--tl" aria-hidden="true" />
              <span className="stage-corner stage-corner--tr" aria-hidden="true" />
              <span className="stage-corner stage-corner--bl" aria-hidden="true" />
              <span className="stage-corner stage-corner--br" aria-hidden="true" />

              <div className="hero-canvas-mask relative z-10 h-full w-full">
                <HeroVisual />
              </div>

              <div
                className="absolute start-1 top-[12%] z-20 flex items-center gap-2 font-mono text-[9px] tracking-[0.24em] text-[#67728d]"
                dir="ltr"
                aria-hidden="true"
              >
                <span className="h-1 w-1 rounded-full bg-[#5b7cff]" />
                01
              </div>
              <div
                className="absolute end-1 top-[12%] z-20 flex items-center gap-2 font-mono text-[9px] tracking-[0.24em] text-[#67728d]"
                dir="ltr"
                aria-hidden="true"
              >
                <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                  <StatusDot tone="cyan" size="xs" />
                </span>
                3D
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 flex justify-center">
                <span className="glass inline-flex h-8 items-center gap-2 rounded-full px-3.5 text-[10px] font-medium text-[#c3ccdf]">
                  <BadgeCheck className="size-3.5 text-[#67e8f9]" aria-hidden="true" />
                  Next.js · React · TypeScript
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="font-mono text-[10px] font-medium tracking-[0.24em] text-[#7f8aa3] uppercase">
              {t("hero.tech")}
            </span>
            <Link
              href="/about"
              className="group inline-flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 text-[10px] font-medium tracking-[0.16em] text-[#9aafb6] uppercase transition duration-500 hover:border-cyan-200/25 hover:bg-white/[0.06] hover:text-white"
            >
              {t("hero.next")}
              <ArrowUpLeft
                className="size-3.5 text-[#7ff9e9] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}
