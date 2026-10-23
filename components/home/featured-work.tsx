"use client";

import { ArrowUpLeft, Star } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ProjectCover } from "@/components/ui/project-cover";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tilt3D } from "@/components/ui/tilt-3d";
import type { Project, ProjectCategory } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";

const categoryLabel: Record<
  ProjectCategory,
  "work.web" | "work.ecommerce" | "work.saas" | "work.uiux"
> = {
  web: "work.web",
  ecommerce: "work.ecommerce",
  saas: "work.saas",
  uiux: "work.uiux",
};

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const { t, locale } = useI18n();
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const selection = featured.length > 0 ? featured : projects.slice(0, 3);

  if (selection.length === 0) return null;

  return (
    <section className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/4 h-[420px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(91,244,224,0.06),transparent_72%)]"
        aria-hidden="true"
      />
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={t("home.workLabel")}
            title={t("home.workTitle")}
            subtitle={t("home.workSubtitle")}
            align="start"
            className="mb-0"
          />
          <Link
            href="/work"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs font-semibold text-[#c2d3d6] transition duration-500 hover:border-cyan-200/30 hover:bg-white/[0.07] hover:text-white"
          >
            {t("home.viewAll")}
            <ArrowUpLeft
              className="size-4 text-[#7ff9e9] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {selection.map((project) => {
            const title = locale(project.titleAr, project.titleEn);
            const year = new Date(project.createdAt).getFullYear();

            return (
              <article key={project.id} className="card group flex flex-col">
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative block overflow-hidden focus-visible:outline-offset-4"
                  aria-label={title}
                >
                  <Tilt3D max={4} glare>
                    {project.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.imageUrl}
                        alt={title}
                        className="aspect-[16/10] w-full object-cover"
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

                  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#020910]/85 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex translate-y-2 items-end justify-end opacity-0 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="grid size-10 place-items-center rounded-full bg-white text-[#041018] shadow-[0_10px_30px_-10px_rgba(255,255,255,0.5)]">
                      <ArrowUpLeft className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-2 font-mono text-[9px] tracking-[0.16em] text-[#738991] uppercase">
                    <span className="h-px w-4 bg-gradient-to-r from-[#5bf4e0]/70 to-transparent" />
                    <span dir="ltr">{year}</span>
                    <span className="size-0.5 rounded-full bg-white/20" />
                    <span>{t(categoryLabel[project.category])}</span>
                  </div>
                  <h3 className="text-lg leading-snug font-bold text-white transition duration-500 group-hover:text-[#c8fff7]">
                    <Link href={`/projects/${project.slug}`}>{title}</Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.85] text-[#9aafb6]">
                    {locale(project.descriptionAr, project.descriptionEn)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech} className="text-[10px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 border-t border-white/[0.07] pt-4 text-[11px] font-medium text-[#8fa5ad] transition hover:text-white"
                  >
                    {t("home.openCase")}
                    <ArrowUpLeft className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
