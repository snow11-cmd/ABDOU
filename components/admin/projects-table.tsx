"use client";

import { Edit3, Eye, EyeOff, Plus, Search, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { deleteProject, setProjectPublished } from "@/lib/actions/projects";
import type { Project } from "@/lib/data/types";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { cn, formatDate } from "@/lib/utils";

import { AdminPageHeader } from "./page-header";

const categoryKeys: Record<Project["category"], DictKey> = {
  web: "work.web",
  ecommerce: "work.ecommerce",
  saas: "work.saas",
  uiux: "work.uiux",
};

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const { t, lang, locale } = useI18n();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        !query.trim() ||
        `${project.titleAr} ${project.titleEn} ${project.slug}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());
      const matchesStatus =
        status === "all" || (status === "published" ? project.published : !project.published);
      return matchesQuery && matchesStatus;
    });
  }, [projects, query, status]);

  const togglePublish = async (project: Project) => {
    setBusyId(project.id);
    setError(null);
    const result = await setProjectPublished(project.id, !project.published);
    if (!result.ok) setError(t("admin.error"));
    setBusyId(null);
    router.refresh();
  };

  const remove = async (project: Project) => {
    if (!window.confirm(t("admin.confirmDeleteProject"))) return;
    setBusyId(project.id);
    setError(null);
    const result = await deleteProject(project.id);
    if (!result.ok) setError(t("admin.error"));
    setBusyId(null);
    router.refresh();
  };

  return (
    <div>
      <AdminPageHeader titleKey="admin.projects" subtitleKey="admin.overview">
        <ButtonLink href="/admin/projects/new" size="sm">
          <Plus className="h-4 w-4" />
          {t("admin.newProject")}
        </ButtonLink>
      </AdminPageHeader>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b9c3d6]" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("admin.search")}
            className="ps-10"
            aria-label={t("admin.search")}
          />
        </div>
        <div className="flex gap-1.5">
          {(
            [
              { key: "all", label: "admin.filterAll" },
              { key: "published", label: "admin.publish" },
              { key: "draft", label: "admin.unpublish" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatus(tab.key)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-xs font-semibold transition",
                status === tab.key
                  ? "border-[#c6a15b]/50 bg-[#c6a15b]/15 text-white"
                  : "border-white/10 bg-white/[0.03] text-[#dbe1ec] hover:text-white",
              )}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
        >
          {error}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
          <p className="text-sm text-[#c9d2e2]">{t("admin.empty")}</p>
          <ButtonLink href="/admin/projects/new" variant="secondary" size="sm" className="mt-4">
            <Plus className="h-4 w-4" />
            {t("admin.newProject")}
          </ButtonLink>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080b14]">
          <div className="hidden grid-cols-[2.2fr_1fr_0.8fr_0.9fr_0.9fr_auto] gap-4 border-b border-white/[0.06] px-5 py-3 text-[10px] font-semibold tracking-wider text-[#b9c3d6] uppercase lg:grid">
            <span>{t("admin.projectTitle")}</span>
            <span>{t("admin.projectCategory")}</span>
            <span>{t("admin.status")}</span>
            <span>{t("admin.date")}</span>
            <span>{t("admin.actions")}</span>
            <span />
          </div>
          <ul className="divide-y divide-white/[0.05]">
            {filtered.map((project) => (
              <li
                key={project.id}
                className="grid gap-3 px-4 py-4 transition hover:bg-white/[0.02] sm:px-5 lg:grid-cols-[2.2fr_1fr_0.8fr_0.9fr_0.9fr_auto] lg:items-center lg:gap-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-white">
                      {locale(project.titleAr, project.titleEn)}
                    </p>
                    {project.featured ? (
                      <Star className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                    ) : null}
                  </div>
                  <p className="mt-0.5 truncate font-mono text-[10px] text-[#b9c3d6]" dir="ltr">
                    /{project.slug}
                  </p>
                </div>
                <div>
                  <Badge>{t(categoryKeys[project.category])}</Badge>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => togglePublish(project)}
                    disabled={busyId === project.id}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition disabled:opacity-50",
                      project.published
                        ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/15"
                        : "border-white/10 bg-white/[0.04] text-[#dbe1ec] hover:text-white",
                    )}
                  >
                    {project.published ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3" />
                    )}
                    {project.published ? t("admin.publish") : t("admin.unpublish")}
                  </button>
                </div>
                <div className="text-xs text-[#c9d2e2]">{formatDate(project.createdAt, lang)}</div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-[#eaeef5] transition hover:border-[#c6a15b]/40 hover:text-white"
                    aria-label={t("admin.edit")}
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(project)}
                    disabled={busyId === project.id}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-[#eaeef5] transition hover:border-rose-400/40 hover:text-rose-300 disabled:opacity-50"
                    aria-label={t("admin.delete")}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="text-[10px] text-[#b9c3d6] lg:text-end">#{project.sortOrder}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
