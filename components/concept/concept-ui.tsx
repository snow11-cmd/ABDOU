"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { ProjectCover } from "@/components/ui/project-cover";
import type { Project } from "@/lib/data/types";
import { cn } from "@/lib/utils";

export function ConceptLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("concept-label", className)}>
      <span className="concept-label-star" aria-hidden="true">
        ✳
      </span>
      <span>{children}</span>
      <span className="concept-label-line" aria-hidden="true" />
    </div>
  );
}

export function ConceptProjectVisual({
  project,
  title,
  className,
  priority = false,
}: {
  project: Project;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("concept-visual", className)}>
      {project.imageUrl ? (
        <Image
          src={project.imageUrl}
          alt=""
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 768px) 92vw, (max-width: 1200px) 55vw, 720px"
          className="concept-visual-img"
        />
      ) : (
        <ProjectCover
          title={title}
          category={project.category}
          tech={project.tech}
          className="concept-visual-cover"
        />
      )}
      <span className="concept-visual-tint" aria-hidden="true" />
      <span className="concept-visual-grid" aria-hidden="true" />
    </div>
  );
}

export function ConceptMarquee({ items }: { items: string[] }) {
  return (
    <div className="concept-marquee" role="region" aria-label={items.join(" · ")}>
      <div className="concept-marquee-track" dir="ltr">
        {[0, 1].map((copyIndex) => (
          <div
            key={copyIndex}
            className="concept-marquee-group"
            aria-hidden={copyIndex === 1 ? true : undefined}
          >
            {items.map((item) => (
              <span key={`${copyIndex}-${item}`} className="concept-marquee-item">
                <span>{item}</span>
                <span className="concept-marquee-star" aria-hidden="true">
                  ✳
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ConceptOrb({ href, label, text }: { href: string; label: string; text: string }) {
  const characters = [...text];

  return (
    <a href={href} className="concept-orb" aria-label={label}>
      <span className="concept-orb-ring" aria-hidden="true">
        {characters.map((character, index) => (
          <span
            key={`${character}-${index}`}
            style={{ transform: `rotate(${(index / characters.length) * 360}deg)` }}
          >
            <span>{character === " " ? "\u00a0" : character}</span>
          </span>
        ))}
      </span>
      <span className="concept-orb-center">
        <ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" />
      </span>
    </a>
  );
}
