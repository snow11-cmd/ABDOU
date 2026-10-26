"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";

import {
  ClockIcon,
  CodeIcon,
  ExternalLinkIcon,
  GithubIcon,
  LayersIcon,
  UserIcon,
} from "@/components/icons";
import { IconHoverContext, useIconHover } from "@/components/icons/hover";
import { IconTile } from "@/components/ui/icon-tile";
import { FadeIn, Reveal } from "@/components/ui/motion-primitives";
import { ProjectCover } from "@/components/ui/project-cover";
import type { Project, ProjectCategory } from "@/lib/data/types";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";

const categoryLabel: Record<ProjectCategory, DictKey> = {
  web: "work.web",
  ecommerce: "work.ecommerce",
  saas: "work.saas",
  uiux: "work.uiux",
};

export function ProjectDetail({ project }: { project: Project }) {
  const { t, locale } = useI18n();
  const { hovered, hoverProps } = useIconHover();
  const title = locale(project.titleAr, project.titleEn);
  const description = locale(project.descriptionAr, project.descriptionEn);
  const longDescription =
    locale(project.longDescriptionAr, project.longDescriptionEn) || description;
  const year = new Date(project.createdAt).getFullYear();

  return (
    <article className="relative pt-28 pb-6 sm:pt-36">
      <div className="mx-auto w-full max-w-[75rem] px-6 sm:px-10">
        <FadeIn>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-[11px] font-medium text-neutral-600 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black dark:text-neutral-200 dark:hover:text-white dark:focus-visible:outline-white"
          >
            <ArrowLeft
              className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
            {t("work.back")}
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.55fr)] lg:items-end">
            <div>
              <span className="type-label text-neutral-600 dark:text-neutral-200">
                {t(categoryLabel[project.category])} — {Number.isNaN(year) ? "—" : year}
              </span>
              <h1 className="type-title mt-4 max-w-[19ch] text-neutral-950 dark:text-[#f4f1ea]">
                {title}
              </h1>
              <p className="type-body mt-5 max-w-[58ch] text-neutral-600 dark:text-neutral-200">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex h-11 items-center gap-2 rounded-xl bg-neutral-950 px-5 text-[12px] font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-[#f4f1ea] dark:text-neutral-950 dark:hover:bg-white dark:focus-visible:outline-white"
                >
                  {t("work.demo")}
                  <ExternalLinkIcon
                    size={14}
                    strokeWidth={1.75}
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              ) : null}
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex h-11 items-center gap-2 rounded-xl border border-black/[0.09] bg-white px-5 text-[12px] font-medium text-neutral-900 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-black/[0.16] hover:shadow-[0_14px_30px_-24px_rgba(0,0,0,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-white/[0.12] dark:bg-white/[0.05] dark:text-neutral-100 dark:hover:border-white/[0.22] dark:hover:shadow-none dark:focus-visible:outline-white"
                >
                  <GithubIcon size={14} strokeWidth={1.75} aria-hidden="true" />
                  {t("work.code")}
                </a>
              ) : null}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-10 sm:mt-12">
          <ViewTransition name={`project-cover-${project.slug}`} share="morph" default="none">
            <div className="relative overflow-hidden rounded-[1.9rem] border border-black/[0.08] bg-neutral-100 p-1.5 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.55)] dark:border-white/[0.1] dark:bg-white/[0.035] dark:shadow-[0_30px_80px_-44px_rgba(0,0,0,0.95)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-neutral-200 sm:aspect-[16/9] dark:bg-neutral-800">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={title}
                    fill
                    unoptimized
                    priority
                    sizes="(min-width: 1280px) 1160px, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <ProjectCover
                    title={title}
                    category={project.category}
                    tech={project.tech}
                    className="absolute inset-0 aspect-auto h-full w-full"
                  />
                )}
              </div>
            </div>
          </ViewTransition>
        </FadeIn>

        <div className="mt-10 grid gap-10 pb-10 sm:mt-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.55fr)] lg:gap-16">
          <Reveal>
            <span className="type-label text-neutral-600 dark:text-neutral-200">
              {t("work.overview")}
            </span>
            <h2 className="type-section mt-4 text-neutral-950 dark:text-[#f4f1ea]">
              {t("work.aboutProject")}
            </h2>
            <p className="type-body mt-4 max-w-[62ch] whitespace-pre-line text-neutral-600 dark:text-neutral-200">
              {longDescription}
            </p>

            <div className="mt-8">
              <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-neutral-600 uppercase dark:text-neutral-200">
                <LayersIcon size={14} strokeWidth={1.75} aria-hidden="true" />
                {t("work.stack")}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/[0.07] bg-white px-3 py-1.5 text-[11px] text-neutral-600 dark:border-white/[0.09] dark:bg-white/[0.05] dark:text-neutral-100"
                    dir="ltr"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <IconHoverContext.Provider value={hovered}>
              <aside
                {...hoverProps}
                className="rounded-[1.7rem] border border-black/[0.08] bg-white/75 p-5 backdrop-blur sm:p-6 dark:border-white/[0.09] dark:bg-white/[0.035]"
              >
                <h2 className="text-[13px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {t("work.overview")}
                </h2>
                <dl className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <IconTile icon={ClockIcon} size="sm" />
                    <div>
                      <dt className="text-[9px] tracking-[0.14em] text-neutral-600 uppercase dark:text-neutral-200">
                        {t("work.year")}
                      </dt>
                      <dd className="mt-0.5 text-[12px] font-medium text-neutral-800 dark:text-neutral-200">
                        {Number.isNaN(year) ? "—" : year}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconTile icon={UserIcon} size="sm" />
                    <div>
                      <dt className="text-[9px] tracking-[0.14em] text-neutral-600 uppercase dark:text-neutral-200">
                        {t("work.role")}
                      </dt>
                      <dd className="mt-0.5 text-[12px] font-medium text-neutral-800 dark:text-neutral-200">
                        {t("work.roleValue")}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconTile icon={CodeIcon} size="sm" />
                    <div>
                      <dt className="text-[9px] tracking-[0.14em] text-neutral-600 uppercase dark:text-neutral-200">
                        {t("work.stack")}
                      </dt>
                      <dd
                        className="mt-0.5 text-[12px] leading-[1.7] font-medium text-neutral-800 dark:text-neutral-200"
                        dir="ltr"
                      >
                        {project.tech.slice(0, 3).join(" · ")}
                      </dd>
                    </div>
                  </div>
                </dl>

                <Link
                  href="/contact"
                  className="group mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-[12px] font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-[#f4f1ea] dark:text-neutral-950 dark:hover:bg-white dark:focus-visible:outline-white"
                >
                  {t("work.ctaBtn")}
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </aside>
            </IconHoverContext.Provider>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
