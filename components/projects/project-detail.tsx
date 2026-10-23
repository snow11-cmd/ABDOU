"use client";

import { ArrowLeft, ArrowUpLeft, CalendarDays, Code2, ExternalLink, User } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCover } from "@/components/ui/project-cover";
import { Reveal } from "@/components/ui/reveal";
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

export function ProjectDetail({ project }: { project: Project }) {
  const { t, locale } = useI18n();
  const year = new Date(project.createdAt).getFullYear();

  return (
    <article className="relative pt-32 pb-20 sm:pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_70%_at_50%_0%,rgba(91,244,224,0.11),transparent_70%)]" />
      <div className="container-x">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#8b94aa] transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("work.back")}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Reveal>
            <Tilt3D
              max={5}
              glare
              className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
            >
              {project.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.imageUrl}
                  alt={locale(project.titleAr, project.titleEn)}
                  className="w-full object-cover"
                />
              ) : (
                <ProjectCover
                  title={locale(project.titleAr, project.titleEn)}
                  category={project.category}
                  tech={project.tech}
                />
              )}
            </Tilt3D>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="info">{t(categoryLabel[project.category])}</Badge>
              {project.featured ? <Badge tone="warning">{t("work.featured")}</Badge> : null}
            </div>

            <h1 className="mt-4 text-3xl leading-tight font-extrabold text-balance text-white sm:text-4xl">
              {locale(project.titleAr, project.titleEn)}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#97a1b8]">
              {locale(project.descriptionAr, project.descriptionEn)}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-white/[0.07] py-5 text-sm">
              <div className="flex items-center gap-2.5">
                <CalendarDays className="icon-secondary h-4 w-4" aria-hidden="true" />
                <div>
                  <dt className="text-[10px] tracking-wider text-[#6b7590] uppercase">
                    {t("work.year")}
                  </dt>
                  <dd className="mt-0.5 font-semibold text-white">{year}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <User className="icon-secondary h-4 w-4" aria-hidden="true" />
                <div>
                  <dt className="text-[10px] tracking-wider text-[#6b7590] uppercase">
                    {t("work.role")}
                  </dt>
                  <dd className="mt-0.5 font-semibold text-white">{t("work.roleValue")}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-6">
              <h2 className="text-xs font-bold tracking-wider text-[#6b7590] uppercase">
                {t("work.stack")}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {project.demoUrl ? (
                <ButtonLink
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  className="btn-sheen"
                >
                  {t("work.demo")}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              ) : null}
              {project.repoUrl ? (
                <ButtonLink
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="md"
                >
                  {t("work.code")}
                  <Code2 className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              ) : null}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-14 grid gap-8 border-t border-white/[0.06] pt-10 lg:grid-cols-[0.35fr_0.65fr]">
            <h2 className="text-xl font-bold text-white">{t("work.overview")}</h2>
            <div className="prose-dark max-w-3xl space-y-5">
              {(
                locale(project.longDescriptionAr, project.longDescriptionEn) ||
                locale(project.descriptionAr, project.descriptionEn)
              )
                .split("\n")
                .filter(Boolean)
                .map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-3xl border border-cyan-200/15 bg-[linear-gradient(120deg,rgba(91,244,224,0.1),rgba(180,155,255,0.08))] p-8 sm:flex-row">
          <p className="text-lg font-bold text-white">{t("work.ctaTitle")}</p>
          <ButtonLink href="/contact" className="btn-sheen">
            {t("work.ctaBtn")}
            <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
