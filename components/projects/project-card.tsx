"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";

import {
  CartIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  PenIcon,
  type AnimatedIconComponent,
} from "@/components/icons";
import { IconHoverContext, useIconHover } from "@/components/icons/hover";
import { IconTile } from "@/components/ui/icon-tile";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ProjectCover } from "@/components/ui/project-cover";
import { Tilt } from "@/components/ui/tilt";
import type { Project, ProjectCategory } from "@/lib/data/types";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";

const categoryMeta: Record<ProjectCategory, { icon: AnimatedIconComponent; key: DictKey }> = {
  web: { icon: GlobeIcon, key: "work.web" },
  ecommerce: { icon: CartIcon, key: "work.ecommerce" },
  saas: { icon: LayoutDashboardIcon, key: "work.saas" },
  uiux: { icon: PenIcon, key: "work.uiux" },
};

export function ProjectCard({
  project,
  index = 0,
  eager = false,
}: {
  project: Project;
  index?: number;
  eager?: boolean;
}) {
  const { t, lang, locale } = useI18n();
  const meta = categoryMeta[project.category];
  const title = locale(project.titleAr, project.titleEn);
  const description = locale(project.descriptionAr, project.descriptionEn);
  const year = new Date(project.createdAt).getFullYear();
  const { hovered, hoverProps } = useIconHover();

  return (
    <FadeIn delay={Math.min(index * 0.05, 0.25)} className="h-full">
      <Tilt className="h-full">
        <IconHoverContext.Provider value={hovered}>
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`${t("work.view")}: ${title}`}
            {...hoverProps}
            className="group flex h-full flex-col rounded-[1.75rem] border border-black/[0.08] bg-white p-2.5 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-black/[0.14] hover:shadow-[0_26px_60px_-42px_rgba(0,0,0,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:p-3 dark:border-white/[0.09] dark:bg-[#121214] dark:shadow-none dark:hover:border-white/[0.18] dark:hover:shadow-[0_26px_60px_-42px_rgba(0,0,0,0.9)] dark:focus-visible:outline-white"
          >
            <article className="flex h-full flex-1 flex-col">
              <header className="flex items-center justify-between gap-3 px-1.5 pt-1.5 pb-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <IconTile icon={meta.icon} size="sm" />
                  <span className="truncate text-[12px] font-medium tracking-tight text-neutral-700 dark:text-neutral-100">
                    {t(meta.key)}
                  </span>
                  {project.featured ? (
                    <span className="rounded-full bg-neutral-950 px-2 py-0.5 text-[9px] font-semibold tracking-[0.14em] text-white uppercase dark:bg-[#f4f1ea] dark:text-neutral-950">
                      {t("work.featured")}
                    </span>
                  ) : null}
                </div>
                <span className="shrink-0 font-mono text-[10px] text-neutral-600 tabular-nums dark:text-neutral-200">
                  {Number.isNaN(year) ? "—" : year}
                </span>
              </header>

              <ViewTransition name={`project-cover-${project.slug}`} share="morph" default="none">
                <div className="project-card__image relative aspect-[4/3] w-full overflow-hidden rounded-[1.15rem] bg-neutral-100 ring-1 ring-black/[0.04] dark:bg-neutral-800 dark:ring-white/[0.06]">
                  <div className="project-card__image-inner absolute inset-0">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={title}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
                        className="object-cover"
                        priority={eager}
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
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
              </ViewTransition>

              <div className="flex flex-1 flex-col px-1.5 pt-4 pb-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="line-clamp-2 min-h-[2.6em] text-[18px] leading-[1.3] font-semibold tracking-[-0.02em] text-neutral-950 sm:text-[20px] dark:text-[#f4f1ea]">
                    {title}
                  </h3>
                  <ArrowUpRight
                    className="mt-0.5 size-4 shrink-0 text-neutral-600 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-950 dark:group-hover:text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 line-clamp-2 min-h-[3.4em] text-[13px] leading-[1.7] text-neutral-600 dark:text-neutral-200">
                  {description}
                </p>

                <div className="mt-auto flex h-[2.1rem] flex-wrap items-center gap-1.5 overflow-hidden border-t border-black/[0.06] pt-3 dark:border-white/[0.07]">
                  {project.tech.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/[0.06] bg-neutral-50 px-2 py-0.5 text-[9px] font-medium tracking-wide text-neutral-600 dark:border-white/[0.07] dark:bg-white/[0.05] dark:text-neutral-200"
                      dir={lang === "ar" ? "ltr" : undefined}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        </IconHoverContext.Provider>
      </Tilt>
    </FadeIn>
  );
}
