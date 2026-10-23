"use client";

import { ArrowUpLeft, Code2, ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCover } from "@/components/ui/project-cover";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tilt3D } from "@/components/ui/tilt-3d";
import type { Project, ProjectCategory } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const filters = [
  { key: "all", label: "work.all" },
  { key: "web", label: "work.web" },
  { key: "ecommerce", label: "work.ecommerce" },
  { key: "saas", label: "work.saas" },
  { key: "uiux", label: "work.uiux" },
] as const;

const categoryLabel: Record<
  ProjectCategory,
  "work.web" | "work.ecommerce" | "work.saas" | "work.uiux"
> = {
  web: "work.web",
  ecommerce: "work.ecommerce",
  saas: "work.saas",
  uiux: "work.uiux",
};

export function Projects({ projects }: { projects: Project[] }) {
  const { t, locale } = useI18n();
  const [active, setActive] = useState<(typeof filters)[number]["key"]>("all");

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: projects.length };
    for (const filter of filters) {
      if (filter.key === "all") continue;
      result[filter.key] = projects.filter((project) => project.category === filter.key).length;
    }
    return result;
  }, [projects]);

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((project) => project.category === active)),
    [active, projects],
  );

  return (
    <section id="work" className="section-pad relative scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/4 h-[460px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(180,155,255,0.07),transparent_72%)]" />
      </div>

      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:flex-wrap lg:items-end">
          <SectionHeading
            eyebrow={t("work.label")}
            title={t("work.title")}
            subtitle={t("work.subtitle")}
            align="start"
            index="03"
            className="mb-0"
          />
          <div className="flex flex-wrap gap-1.5">
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActive(filter.key)}
                aria-pressed={active === filter.key}
                className={cn(
                  "group/filter inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition duration-500 active:scale-95",
                  active === filter.key
                    ? "border-cyan-200/50 bg-cyan-200/15 text-white shadow-[0_0_28px_-8px_rgba(91,244,224,0.7)]"
                    : "border-white/10 bg-white/[0.03] text-[#9aafb6] hover:border-white/20 hover:text-white",
                )}
              >
                {t(filter.label)}
                <span
                  className="font-mono text-[9px] font-normal text-current opacity-45"
                  dir="ltr"
                >
                  {counts[filter.key] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((project, index) => {
            const year = new Date(project.createdAt).getFullYear();
            const title = locale(project.titleAr, project.titleEn);
            const isLastOdd = filtered.length % 2 === 1 && index === filtered.length - 1;

            return (
              <article
                key={project.id}
                className={cn(
                  "card work-card group flex flex-col",
                  isLastOdd && "md:col-span-2 md:w-[calc(50%-0.625rem)] md:justify-self-center",
                )}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative block overflow-hidden focus-visible:outline-offset-4"
                  aria-label={title}
                >
                  <Tilt3D max={5} glare>
                    {project.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.imageUrl}
                        alt={title}
                        className="work-image aspect-[16/10] w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <ProjectCover
                        title={title}
                        category={project.category}
                        tech={project.tech}
                      />
                    )}
                  </Tilt3D>

                  <div className="absolute start-4 top-4 z-20 flex gap-2">
                    <span className="inline-flex h-6 items-center rounded-full border border-white/20 bg-black/35 px-2.5 text-[10px] font-semibold text-white backdrop-blur">
                      {t(categoryLabel[project.category])}
                    </span>
                    {project.featured ? (
                      <span className="inline-flex h-6 items-center gap-1 rounded-full border border-amber-300/30 bg-amber-400/15 px-2.5 text-[10px] font-semibold text-amber-200 backdrop-blur">
                        <Star className="size-3" aria-hidden="true" />
                        {t("work.featured")}
                      </span>
                    ) : null}
                  </div>

                  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#05070e]/80 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex translate-y-2 items-end justify-between gap-3 opacity-0 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-flex h-7 items-center rounded-full border border-white/20 bg-black/40 px-3 text-[10px] font-semibold text-white backdrop-blur">
                      {t("work.view")}
                    </span>
                    <span className="grid size-10 place-items-center rounded-full bg-white text-[#0a0d16] shadow-[0_10px_30px_-10px_rgba(255,255,255,0.5)]">
                      <ArrowUpLeft className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="mb-2 flex items-center gap-2 font-mono text-[9px] tracking-[0.16em] text-[#67728d] uppercase">
                        <span className="h-px w-4 bg-gradient-to-r from-[#5b7cff]/70 to-transparent" />
                        <span dir="ltr">{year}</span>
                        <span className="size-0.5 rounded-full bg-white/20" />
                        <span>{t(categoryLabel[project.category])}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white transition duration-500 group-hover:text-[#c8fff7]">
                        <Link href={`/projects/${project.slug}`}>{title}</Link>
                      </h3>
                    </div>
                    <span className="mt-1 shrink-0 rounded-full border border-white/10 bg-white/[0.03] p-1.5 text-[#9aafb6] transition duration-500 group-hover:border-cyan-200/40 group-hover:text-white">
                      <ArrowUpLeft className="size-4" aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-2 flex-1 text-sm leading-[1.85] text-[#9aafb6]">
                    {locale(project.descriptionAr, project.descriptionEn)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((tech) => (
                      <Badge key={tech} className="text-[10px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-4 border-t border-white/[0.07] pt-4 text-[11px] font-medium text-[#7f8aa3]">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 transition hover:text-white"
                    >
                      {t("work.view")}
                      <ArrowUpLeft className="size-3.5" aria-hidden="true" />
                    </Link>
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 transition hover:text-white"
                      >
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                        {t("work.demo")}
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 transition hover:text-white"
                      >
                        <Code2 className="size-3.5" aria-hidden="true" />
                        {t("work.code")}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-12 text-center text-sm text-[#6f7a93]">
            {t("work.noResults")}
          </div>
        ) : null}

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-[linear-gradient(120deg,rgba(91,244,224,0.11),rgba(180,155,255,0.08),rgba(255,143,163,0.04))] p-8 sm:p-10">
          <span
            className="pointer-events-none absolute -end-24 -top-32 h-72 w-72 rounded-full bg-violet-300/20 blur-[80px]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute start-1/4 -bottom-40 h-64 w-64 rounded-full bg-cyan-300/10 blur-[80px]"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                {t("work.ctaTitle")}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#b0c1c6]">
                {t("work.ctaDesc")}
              </p>
            </div>
            <ButtonLink
              href="/contact"
              size="md"
              className="btn-sheen relative shrink-0"
            >
              {t("work.ctaBtn")}
              <ArrowUpLeft className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
