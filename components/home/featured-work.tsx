"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ProjectsGrid } from "@/components/projects/projects-grid";
import { FadeIn } from "@/components/ui/motion-primitives";
import type { Project } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const { t } = useI18n();
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);
  // Keep a balanced 2×2 selection even when fewer than four projects are featured.
  const selection = [...(featured.length > 0 ? featured : projects), ...rest].slice(0, 4);

  if (selection.length === 0) return null;

  return (
    <section id="work" className="relative w-full pb-10 sm:pb-16">
      <div className="mx-auto w-full max-w-[75rem] px-6 sm:px-10">
        <FadeIn className="flex flex-col items-center gap-4 pt-8 pb-10 text-center sm:pt-14 sm:pb-14">
          <span className="type-label text-neutral-600 dark:text-neutral-200">
            {t("work.label")}
          </span>
          <h2 className="type-section max-w-[22ch] text-neutral-950 dark:text-[#f4f1ea]">
            {t("work.title")}
          </h2>
          <p className="type-body max-w-[42ch] text-neutral-600 dark:text-neutral-200">
            {t("work.subtitle")}
          </p>
        </FadeIn>

        <ProjectsGrid projects={selection} />

        <div className="mt-10 flex justify-center sm:mt-14">
          <Link
            href="/work"
            className="group inline-flex h-11 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-5 text-[13px] font-medium text-neutral-900 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-black/[0.16] hover:shadow-[0_14px_30px_-24px_rgba(0,0,0,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-white/[0.12] dark:bg-white/[0.05] dark:text-neutral-100 dark:hover:border-white/[0.22] dark:hover:bg-white/[0.08] dark:hover:shadow-none dark:focus-visible:outline-white"
          >
            {t("home.viewAll")}
            <ArrowUpRight
              className="size-3.5 text-neutral-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-950 dark:text-neutral-200 dark:group-hover:text-white"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
