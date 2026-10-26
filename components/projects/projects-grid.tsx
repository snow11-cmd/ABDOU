import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/lib/data/types";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 md:gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} eager={index < 2} />
      ))}
    </div>
  );
}
