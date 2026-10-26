"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import type { Project, ProjectCategory } from "@/lib/data/types";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

import { conceptCopy } from "./concept-copy";
import { ConceptProjectVisual } from "./concept-ui";

const categoryKeys: Record<ProjectCategory, DictKey> = {
  web: "work.web",
  ecommerce: "work.ecommerce",
  saas: "work.saas",
  uiux: "work.uiux",
};

export function ConceptStage({ projects }: { projects: Project[] }) {
  const { lang, t, locale } = useI18n();
  const copy = conceptCopy[lang];
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), {
    stiffness: 140,
    damping: 22,
    mass: 0.4,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 140,
    damping: 22,
    mass: 0.4,
  });

  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);

  const count = projects.length;
  const activeProject = projects[active] ?? projects[0];

  const ordered = useMemo(
    () =>
      projects.map((project, index) => ({
        project,
        index,
        position: (index - active + count) % count,
      })),
    [active, count, projects],
  );

  if (!activeProject || count === 0) return null;

  const activeTitle = locale(activeProject.titleAr, activeProject.titleEn);
  const activeYear = new Date(activeProject.createdAt).getFullYear();

  const goTo = (index: number) => setActive(((index % count) + count) % count);
  const next = () => goTo(active + 1);
  const previous = () => goTo(active - 1);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragStart.current = { x: event.clientX, y: event.clientY };
    suppressClick.current = false;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStart.current;
    dragStart.current = null;
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 46 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    suppressClick.current = true;
    if (deltaX < 0) next();
    else previous();
  };

  const handleCardClick = (index: number) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    goTo(index);
  };

  return (
    <div
      ref={stageRef}
      className="concept-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        dragStart.current = null;
      }}
    >
      <div className="concept-stage-kicker">
        <span>{copy.stage.label}</span>
        <span className="concept-stage-hint">
          <span aria-hidden="true">↔</span> {copy.stage.hint}
        </span>
      </div>

      <div className="concept-stage-deck-wrap">
        <div className="concept-stage-halo" aria-hidden="true" />
        <div className="concept-stage-orbit" aria-hidden="true" />

        <motion.div className="concept-stage-deck" style={{ rotateX, rotateY }}>
          {ordered.map(({ project, index, position }) => {
            const title = locale(project.titleAr, project.titleEn);
            const description = locale(project.descriptionAr, project.descriptionEn);
            const year = new Date(project.createdAt).getFullYear();

            return (
              <article
                key={project.id}
                className={cn("concept-stage-card", `is-pos-${position}`)}
                aria-hidden={position === 0 ? undefined : true}
                onClick={() => handleCardClick(index)}
              >
                <div className="concept-stage-card-top">
                  <span>AJ — {String(index + 1).padStart(2, "0")}</span>
                  <span>{t(categoryKeys[project.category])}</span>
                  <span>{Number.isNaN(year) ? "—" : year}</span>
                </div>

                <div className="concept-stage-card-art">
                  <ConceptProjectVisual project={project} title={title} priority={position === 0} />
                  <span className="concept-stage-card-corner" aria-hidden="true">
                    {title.trim().charAt(0)}
                  </span>
                </div>

                <div className="concept-stage-card-body">
                  <h3 className="concept-stage-card-title">{title}</h3>
                  <p className="concept-stage-card-desc">{description}</p>

                  <div className="concept-stage-card-foot">
                    <div className="concept-stage-tags">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span key={tech} className="concept-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {position === 0 ? (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="concept-stage-card-open"
                        aria-label={`${copy.stage.explore}: ${title}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          if (suppressClick.current) {
                            event.preventDefault();
                            suppressClick.current = false;
                          }
                        }}
                      >
                        <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>

      <div className="concept-stage-caption">
        <div className="concept-stage-caption-copy">
          <span className="concept-stage-caption-label">
            {copy.stage.featured} — {String(active + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
          <Link href={`/projects/${activeProject.slug}`} className="concept-stage-caption-title">
            {activeTitle}
            <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <span className="concept-stage-caption-meta">
            {t(categoryKeys[activeProject.category])} ·{" "}
            {Number.isNaN(activeYear) ? "—" : activeYear}
          </span>
        </div>

        <div className="concept-stage-controls">
          <button
            type="button"
            className="concept-stage-nav"
            onClick={previous}
            aria-label={lang === "ar" ? "المشروع السابق" : "Previous project"}
          >
            <ArrowLeft
              className="concept-stage-arrow concept-stage-arrow--prev"
              size={16}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </button>
          <span className="concept-stage-count" dir="ltr">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="concept-stage-nav"
            onClick={next}
            aria-label={lang === "ar" ? "المشروع التالي" : "Next project"}
          >
            <ArrowRight
              className="concept-stage-arrow concept-stage-arrow--next"
              size={16}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
