import type { ProjectCategory } from "@/lib/data/types";
import { cn } from "@/lib/utils";

const palettes: Record<ProjectCategory, string> = {
  web: "from-[#13265f] via-[#1e3a8a] to-[#0e7490]",
  ecommerce: "from-[#32184f] via-[#6d28d9] to-[#a21caf]",
  saas: "from-[#081c36] via-[#1d4ed8] to-[#0891b2]",
  uiux: "from-[#1b1f3b] via-[#4338ca] to-[#7c3aed]",
};

const bars = [38, 58, 45, 72, 54, 86];

export function ProjectCover({
  title,
  category,
  tech,
  className,
}: {
  title: string;
  category: ProjectCategory;
  tech: string[];
  className?: string;
}) {
  const initial = title.trim().charAt(0) || "A";

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br",
        palettes[category],
        className,
      )}
      aria-hidden="true"
      data-stack={tech.slice(0, 3).join(" ")}
    >
      <div className="bg-grid absolute inset-0 opacity-[0.14]" />
      <div className="absolute inset-0 bg-[radial-gradient(78%_65%_at_18%_0%,rgba(255,255,255,0.3),transparent_62%)]" />
      <div className="absolute -end-20 -top-24 h-64 w-64 rounded-full bg-white/[0.12] blur-3xl" />
      <div className="absolute -start-16 bottom-0 h-56 w-56 rounded-full bg-black/25 blur-2xl" />

      {/* Abstract product window: gives image-less demo projects a designed cover. */}
      <div className="absolute inset-x-[9%] top-[17%] bottom-[8%] overflow-hidden rounded-xl border border-white/20 bg-[#070b16]/60 shadow-[0_34px_70px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md">
        <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="ms-2 h-2 w-1/3 rounded-full bg-white/[0.09]" />
          <span className="ms-auto h-2 w-9 rounded-full bg-white/[0.07]" />
        </div>

        <div className="grid h-[calc(100%-2rem)] grid-cols-[0.85fr_1.15fr] gap-3 p-3 sm:gap-4 sm:p-4">
          <div className="flex flex-col gap-2.5">
            <div className="h-2 w-2/3 rounded-full bg-white/35" />
            <div className="h-2 w-1/2 rounded-full bg-white/15" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="h-9 rounded-md border border-white/10 bg-white/[0.07] sm:h-11" />
              <div className="h-9 rounded-md border border-white/10 bg-white/[0.05] sm:h-11" />
            </div>
            <div className="mt-auto space-y-2 pb-1">
              <div className="h-1.5 w-3/4 rounded-full bg-white/12" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
            </div>
          </div>

          <div className="flex flex-col rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-3">
            <div className="flex items-center justify-between">
              <div className="h-1.5 w-12 rounded-full bg-white/20" />
              <div className="h-4 w-8 rounded-full bg-[#22d3ee]/20" />
            </div>
            <div className="mt-auto flex h-[52%] items-end gap-1">
              {bars.map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-sm bg-gradient-to-t from-[#22d3ee]/35 to-[#b49cff]/75"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      <span className="absolute end-5 top-5 grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-black/25 font-mono text-[11px] font-bold text-white/85 backdrop-blur">
        {initial}
      </span>

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
    </div>
  );
}
