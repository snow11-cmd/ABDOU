"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { ProjectsGrid } from "@/components/projects/projects-grid";
import { FadeIn } from "@/components/ui/motion-primitives";
import type { Project, ProjectCategory } from "@/lib/data/types";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type FilterKey = "all" | ProjectCategory;

const filters: Array<{ key: FilterKey; label: DictKey }> = [
  { key: "all", label: "work.all" },
  { key: "web", label: "work.web" },
  { key: "ecommerce", label: "work.ecommerce" },
  { key: "saas", label: "work.saas" },
  { key: "uiux", label: "work.uiux" },
];

export function WorkPageContent({ projects }: { projects: Project[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState<FilterKey>("all");

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((project) => project.category === active)),
    [active, projects],
  );

  return (
    <>
      <section className="mx-auto w-full max-w-[75rem] px-6 pt-32 pb-8 sm:px-10 sm:pt-40 sm:pb-10 lg:pt-48">
        <FadeIn className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] md:items-end">
          <div>
            <span className="type-label text-neutral-600 dark:text-neutral-200">
              {t("work.label")}
            </span>
            <h1 className="type-title mt-5 max-w-[17ch] text-neutral-950 dark:text-[#f4f1ea]">
              {t("work.title")}
            </h1>
          </div>
          <div className="md:pb-2">
            <p className="type-body max-w-[40ch] text-neutral-600 dark:text-neutral-200">
              {t("work.subtitle")}
            </p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-neutral-600 dark:text-neutral-300">
              {String(projects.length).padStart(2, "0")} — SELECTED PROJECTS
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[75rem] px-6 pb-12 sm:px-10 sm:pb-20">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-y border-black/[0.07] py-3 dark:border-white/[0.08]">
          <div className="flex flex-wrap gap-1" role="group" aria-label={t("work.title")}>
            {filters.map((filter) => {
              const selected = active === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActive(filter.key)}
                  aria-pressed={selected}
                  className={cn(
                    "relative isolate inline-flex h-10 items-center rounded-full px-3.5 text-[11px] font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:h-9 dark:focus-visible:outline-white",
                    selected
                      ? "text-white dark:text-neutral-950"
                      : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="work-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-neutral-950 dark:bg-[#f4f1ea]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  {t(filter.label)}
                </button>
              );
            })}
          </div>
          <p
            dir="ltr"
            className="font-mono text-[10px] text-neutral-600 tabular-nums dark:text-neutral-200"
          >
            {String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>
        </div>

        {visible.length > 0 ? (
          <ProjectsGrid projects={visible} />
        ) : (
          <div className="rounded-[1.7rem] border border-black/[0.08] bg-white/75 px-6 py-16 text-center dark:border-white/[0.09] dark:bg-white/[0.035]">
            <p className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
              {t("work.noResults")}
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-neutral-950 px-4 text-[12px] font-medium text-white dark:bg-[#f4f1ea] dark:text-neutral-950"
            >
              {t("nav.contact")}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
