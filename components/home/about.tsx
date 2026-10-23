"use client";

import {
  Braces,
  Database,
  Gauge,
  Globe,
  Layers,
  MapPin,
  Palette,
  Rocket,
  Search,
  Server,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";

import { Icon3D, type Icon3DMotion, type Icon3DTone } from "@/components/ui/icon-3d";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusDot } from "@/components/ui/status-dot";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const skillGroups: Array<{
  key: "about.frontend" | "about.backend" | "about.design" | "about.tools";
  icon: LucideIcon;
  motion: Icon3DMotion;
  tone: Icon3DTone;
  skills: string[];
}> = [
  {
    key: "about.frontend",
    icon: Braces,
    motion: "flip",
    tone: "cyan",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    key: "about.backend",
    icon: Server,
    motion: "orbit",
    tone: "violet",
    skills: ["Node.js", "Supabase", "PostgreSQL", "REST APIs", "Prisma", "Auth"],
  },
  {
    key: "about.design",
    icon: Palette,
    motion: "swing",
    tone: "coral",
    skills: ["Figma", "Design Systems", "RTL Layouts", "Accessibility", "Prototyping"],
  },
  {
    key: "about.tools",
    icon: Wrench,
    motion: "tumble",
    tone: "mint",
    skills: ["Git", "Vercel", "CI/CD", "Docker", "Lighthouse", "SEO"],
  },
];

const approach: Array<{
  key: "about.approach1" | "about.approach2" | "about.approach3";
  icon: LucideIcon;
  motion: Icon3DMotion;
  tone: Icon3DTone;
}> = [
  { key: "about.approach1", icon: Search, motion: "rise", tone: "cyan" },
  { key: "about.approach2", icon: Layers, motion: "pivot", tone: "violet" },
  { key: "about.approach3", icon: Rocket, motion: "zoom", tone: "amber" },
];

const metaChip =
  "inline-flex h-8 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs text-[#aab4ca]";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="section-pad relative scroll-mt-24">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("about.label")}
          title={t("about.title")}
          align="start"
          index="01"
        />

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed font-medium text-[#d4dbeb]">
                {t("about.lead")}
              </p>
              <p className="mt-4 text-[0.98rem] leading-[1.95] text-[#8f9ab2]">{t("about.body")}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
                <span className={cn(metaChip, "col-span-2 sm:col-span-1")}>
                  <MapPin className="icon-secondary size-3.5" aria-hidden="true" />
                  {t("about.location")}
                </span>
                <span className={metaChip}>
                  <Globe className="icon-secondary size-3.5" aria-hidden="true" />
                  <span dir="ltr">AR / EN</span>
                </span>
                <span className={metaChip}>
                  <Gauge className="icon-secondary size-3.5" aria-hidden="true" />
                  <span dir="ltr">100 Lighthouse</span>
                </span>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { value: "6+", label: t("hero.statYears") },
                { value: "40+", label: t("hero.statProjects") },
                { value: "25+", label: t("hero.statClients") },
              ].map((stat, index) => (
                <Reveal key={stat.label + index} delay={0.05 * index}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 text-center transition duration-500 hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-white/[0.045] sm:p-5">
                    <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div
                      className="text-gradient-soft text-xl font-extrabold sm:text-2xl"
                      dir="ltr"
                    >
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[10px] text-[#6f7a93] sm:text-xs">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="mb-5 inline-flex items-center gap-2 text-lg font-bold text-white">
                <Sparkles
                  className="icon-violet icon-breathe size-4"
                  style={{ "--icon-opacity": 0.82 } as CSSProperties}
                  aria-hidden="true"
                />
                {t("about.approachTitle")}
              </h3>
              <div className="space-y-3">
                {approach.map((step, index) => (
                  <Reveal key={step.key} delay={index * 0.06} y={16}>
                    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition duration-500 hover:border-cyan-200/25 hover:bg-white/[0.04]">
                      <span className="absolute inset-y-4 start-0 w-px bg-gradient-to-b from-transparent via-cyan-200/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="flex items-start gap-4">
                        <Icon3D
                          icon={step.icon}
                          motion={step.motion}
                          tone={step.tone}
                          delay={index * 0.06}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-3">
                            <h4 className="text-sm font-bold text-white">
                              {t(`${step.key}Title`)}
                            </h4>
                            <span
                              className="font-mono text-[10px] tracking-[0.16em] text-[#5f6a84]"
                              dir="ltr"
                            >
                              0{index + 1}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-[#8b94aa]">
                            {t(`${step.key}Desc`)}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Reveal className="mb-8">
              <div className="studio-plate p-6 sm:p-7">
                <div className="relative z-10 flex items-center justify-between gap-5">
                  <div>
                    <div
                      className="font-mono text-[9px] tracking-[0.28em] text-[#7f8aa3]"
                      dir="ltr"
                    >
                      AJ / STUDIO
                    </div>
                    <div className="mt-3 text-4xl font-black tracking-[-0.05em] text-white">
                      Abu<span className="text-gradient">.</span>
                    </div>
                    <p className="mt-2 max-w-[15rem] text-xs leading-relaxed text-[#8b9fa8]">
                      {t("about.basedIn")}
                    </p>
                  </div>

                  <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                    <div className="orbit-ring orbit-ring--dashed animate-spin-slower inset-0" />
                    <div className="orbit-ring orbit-ring--glow animate-pulse-glow inset-3" />
                    <div className="orbit-ring inset-6 border border-[#67e8f9]/15" />
                    <div className="absolute inset-[34%] grid place-items-center rounded-full bg-[radial-gradient(circle_at_32%_26%,#e2ebff,#5b7cff_38%,#0a1024_78%)] text-xs font-black text-white shadow-[0_0_30px_-6px_rgba(91,124,255,0.8)]">
                      AJ
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4 text-[10px] font-medium text-[#aabfc3]">
                  <StatusDot size="xs" />
                  {t("about.available")}
                  <span className="ms-auto font-mono text-[9px] tracking-[0.16em] text-[#6f858e]">
                    {t("about.values")}
                  </span>
                </div>
              </div>
            </Reveal>

            <h3 className="mb-6 text-lg font-bold text-white">{t("about.skillsTitle")}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {skillGroups.map((group, index) => (
                <Reveal key={group.key} delay={index * 0.07}>
                  <div className="card h-full p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <Icon3D
                        icon={group.icon}
                        motion={group.motion}
                        tone={group.tone}
                        size="sm"
                        delay={index * 0.05}
                      />
                      <h4 className="text-sm font-bold text-white">{t(group.key)}</h4>
                    </div>
                    <ul className="grid grid-cols-2 gap-1.5">
                      {group.skills.map((skill, skillIndex) => (
                        <li
                          key={skill}
                          className={cn(
                            "flex min-h-8 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.035] px-2 text-center text-[11px] font-medium text-[#9aa5bd]",
                            group.skills.length % 2 === 1 &&
                              skillIndex === group.skills.length - 1 &&
                              "col-span-2",
                          )}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-4">
              <div className="relative overflow-hidden rounded-2xl border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(91,244,224,0.12),rgba(180,155,255,0.08))] p-6">
                <div className="absolute -end-6 -top-6 h-24 w-24 rounded-full bg-cyan-300/15 blur-2xl" />
                <div className="flex items-start gap-4">
                  <Icon3D icon={Database} motion="magnet" tone="mint" delay={0.12} />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white">{t("about.experience")}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#aabfc3]">
                      {t("about.experienceCopy")}
                    </p>
                    <p className="mt-3 border-t border-white/10 pt-3 font-mono text-[10px] tracking-[0.14em] text-[#7f9a9f] uppercase">
                      {t("about.craft")}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
