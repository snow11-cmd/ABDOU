"use client";

import { useState } from "react";

import { PortraitMorph } from "@/components/hero/portrait-morph";
import {
  BrandNextjsIcon,
  BrandReactIcon,
  BrandVercelIcon,
  Cloud1Icon,
  CodeIcon,
  CodeXmlIcon,
  CpuIcon,
  DockerIcon,
  FigmaIcon,
  GithubIcon,
  LayersIcon,
  MagnifierIcon,
  NodejsIcon,
  PaintIcon,
  PenIcon,
  RocketIcon,
  Stack3Icon,
  StackIcon,
  TypescriptIcon,
  type AnimatedIconComponent,
} from "@/components/icons";
import { IconHoverContext } from "@/components/icons/hover";
import { IconTile } from "@/components/ui/icon-tile";
import { FadeIn, Reveal } from "@/components/ui/motion-primitives";
import { StatusDot } from "@/components/ui/status-dot";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";

const approach: Array<{ icon: AnimatedIconComponent; title: DictKey; body: DictKey }> = [
  { icon: MagnifierIcon, title: "about.approach1Title", body: "about.approach1Desc" },
  { icon: PaintIcon, title: "about.approach2Title", body: "about.approach2Desc" },
  { icon: RocketIcon, title: "about.approach3Title", body: "about.approach3Desc" },
];

const skillGroups: Array<{ key: DictKey; icon: AnimatedIconComponent; items: string[] }> = [
  {
    key: "about.frontend",
    icon: CodeIcon,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    key: "about.backend",
    icon: CpuIcon,
    items: ["Node.js", "PostgreSQL", "Supabase", "Prisma", "REST", "Stripe"],
  },
  {
    key: "about.design",
    icon: PenIcon,
    items: ["UI/UX", "Design systems", "Prototyping", "Accessibility", "Motion"],
  },
  {
    key: "about.tools",
    icon: LayersIcon,
    items: ["Git", "Vercel", "Docker", "Figma", "CI/CD", "Cloudflare"],
  },
];

const stack: Array<{ name: string; icon: AnimatedIconComponent }> = [
  { name: "React", icon: BrandReactIcon },
  { name: "Next.js", icon: BrandNextjsIcon },
  { name: "TypeScript", icon: TypescriptIcon },
  { name: "Tailwind", icon: CodeXmlIcon },
  { name: "Node.js", icon: NodejsIcon },
  { name: "PostgreSQL", icon: Stack3Icon },
  { name: "Supabase", icon: Cloud1Icon },
  { name: "Prisma", icon: StackIcon },
  { name: "Git", icon: GithubIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "Figma", icon: FigmaIcon },
  { name: "Vercel", icon: BrandVercelIcon },
];

export function AboutPageContent() {
  const { t } = useI18n();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <>
      <section className="mx-auto w-full max-w-[75rem] px-6 pt-32 pb-16 sm:px-10 sm:pt-40 sm:pb-24 lg:pt-48">
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.7fr)] lg:gap-20">
          <FadeIn>
            <span className="type-label text-neutral-600 dark:text-neutral-200">
              {t("about.label")}
            </span>
            <h1 className="type-title mt-5 max-w-[19ch] text-neutral-950 dark:text-[#f4f1ea]">
              {t("about.title")}
            </h1>
            <p className="type-lead mt-6 max-w-[54ch] text-neutral-600 dark:text-neutral-200">
              {t("about.lead")}
            </p>
            <p className="type-body mt-4 max-w-[58ch] text-neutral-600 dark:text-neutral-200">
              {t("about.body")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/65 px-3 py-1.5 text-[11px] text-neutral-600 backdrop-blur dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-neutral-100">
                <StatusDot size="xs" />
                {t("about.available")}
              </span>
              <span className="text-[11px] text-neutral-600 dark:text-neutral-200">
                {t("about.location")}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="mx-auto w-full max-w-[21rem] md:max-w-none">
            <div className="overflow-hidden rounded-[1.9rem] border border-black/[0.08] bg-neutral-100 p-1.5 shadow-[0_30px_70px_-55px_rgba(0,0,0,0.5)] dark:border-white/[0.12] dark:bg-white/[0.04] dark:shadow-[0_30px_70px_-42px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] bg-neutral-200 dark:bg-neutral-800">
                <PortraitMorph
                  srcA="/portrait.webp"
                  srcB="/portrait-wave.webp"
                  alt={t("hero.portraitAlt")}
                  className="h-full w-full"
                />
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-3 border-t border-black/[0.08] pt-6 sm:gap-6 dark:border-white/[0.1]">
          {(
            [
              { value: "6+", label: "hero.statYears" },
              { value: "40+", label: "hero.statProjects" },
              { value: "25+", label: "hero.statClients" },
            ] as const
          ).map((stat) => (
            <div key={stat.label}>
              <p className="text-[1.35rem] font-semibold tracking-tight text-neutral-950 tabular-nums sm:text-3xl dark:text-[#f4f1ea]">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] text-neutral-600 sm:text-[11px] dark:text-neutral-200">
                {t(stat.label)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[75rem] px-6 pb-16 sm:px-10 sm:pb-24">
        <Reveal className="max-w-2xl">
          <span className="type-label text-neutral-600 dark:text-neutral-200">
            01 — {t("about.approachTitle")}
          </span>
          <h2 className="type-section mt-4 text-neutral-950 dark:text-[#f4f1ea]">
            {t("about.experience")}
          </h2>
          <p className="type-body mt-3 max-w-[50ch] text-neutral-600 dark:text-neutral-200">
            {t("about.experienceCopy")}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {approach.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <IconHoverContext.Provider value={hoveredRow === `approach-${index}`}>
                <article
                  className="group h-full rounded-[1.6rem] border border-black/[0.08] bg-white/75 p-5 backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-black/[0.14] hover:bg-white hover:shadow-[0_22px_50px_-42px_rgba(0,0,0,0.55)] sm:p-6 dark:border-white/[0.09] dark:bg-white/[0.035] dark:hover:border-white/[0.18] dark:hover:bg-white/[0.06] dark:hover:shadow-none"
                  onMouseEnter={() => setHoveredRow(`approach-${index}`)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onFocus={() => setHoveredRow(`approach-${index}`)}
                  onBlur={() => setHoveredRow(null)}
                >
                  <div className="flex items-center justify-between">
                    <IconTile icon={item.icon} />
                    <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-300">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="type-card mt-6 text-neutral-950 dark:text-[#f4f1ea]">
                    {t(item.title)}
                  </h3>
                  <p className="type-body mt-2 text-neutral-600 dark:text-neutral-200">
                    {t(item.body)}
                  </p>
                </article>
              </IconHoverContext.Provider>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[75rem] px-6 pb-16 sm:px-10 sm:pb-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <Reveal>
            <span className="type-label text-neutral-600 dark:text-neutral-200">
              02 — {t("about.skillsTitle")}
            </span>
            <h2 className="type-section mt-4 max-w-[12ch] text-neutral-950 dark:text-[#f4f1ea]">
              {t("about.skillsTitle")}
            </h2>
            <p className="type-body mt-4 max-w-[34ch] text-neutral-600 dark:text-neutral-200">
              {t("about.values")}
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal key={group.key} delay={index * 0.04}>
                <IconHoverContext.Provider value={hoveredRow === `skill-${index}`}>
                  <article
                    className="group h-full rounded-[1.5rem] border border-black/[0.08] bg-white/75 p-5 backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_45px_-40px_rgba(0,0,0,0.5)] dark:border-white/[0.09] dark:bg-white/[0.035] dark:hover:border-white/[0.16] dark:hover:bg-white/[0.055] dark:hover:shadow-none"
                    onMouseEnter={() => setHoveredRow(`skill-${index}`)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onFocus={() => setHoveredRow(`skill-${index}`)}
                    onBlur={() => setHoveredRow(null)}
                  >
                    <div className="flex items-center gap-3">
                      <IconTile icon={group.icon} size="sm" />
                      <h3 className="text-[14px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                        {t(group.key)}
                      </h3>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-black/[0.06] bg-neutral-50/85 px-2.5 py-1 text-[10px] text-neutral-600 dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-neutral-200"
                          dir="ltr"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                </IconHoverContext.Provider>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[75rem] px-6 pb-10 sm:px-10 sm:pb-16">
        <Reveal>
          <div className="rounded-[1.8rem] border border-black/[0.08] bg-white/75 p-5 backdrop-blur sm:p-8 dark:border-white/[0.09] dark:bg-white/[0.035]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="type-label text-neutral-600 dark:text-neutral-200">
                  03 — {t("hero.tech")}
                </span>
                <h2 className="type-section mt-3 text-neutral-950 dark:text-[#f4f1ea]">
                  {t("about.tools")}
                </h2>
              </div>
              <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-300">
                2024 — 2026
              </span>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
              {stack.map((item) => (
                <div
                  key={item.name}
                  className="icon-tile group flex h-auto flex-col items-center gap-2 rounded-2xl border border-black/[0.08] bg-white px-2 py-3.5 text-neutral-800 transition-colors duration-300 hover:border-black/[0.14] dark:border-white/[0.09] dark:bg-white/[0.035] dark:text-neutral-200 dark:hover:border-white/[0.18]"
                >
                  <item.icon size={20} strokeWidth={1.65} aria-hidden="true" />
                  <span
                    className="text-[9px] font-medium text-neutral-600 dark:text-neutral-200"
                    dir="ltr"
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
