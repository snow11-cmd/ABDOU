import type { ProjectCategory } from "@/lib/data/types";
import { cn } from "@/lib/utils";

const palettes: Record<ProjectCategory, string> = {
  web: "from-[#e8f1ff] via-[#c9dfff] to-[#93b8f4]",
  ecommerce: "from-[#fff4df] via-[#f8ddb0] to-[#e9b86f]",
  saas: "from-[#f0ecff] via-[#dcd3ff] to-[#ad9af1]",
  uiux: "from-[#e2fbf5] via-[#bff1e6] to-[#78d7c2]",
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
        "pointer-events-none relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br",
        palettes[category],
        className,
      )}
      aria-hidden="true"
      data-stack={tech.slice(0, 3).join(" ")}
    >
      <div className="bg-grid absolute inset-0 opacity-[0.7]" />
      <div className="absolute inset-0 bg-[radial-gradient(78%_65%_at_18%_0%,rgba(255,255,255,0.75),transparent_62%)]" />
      <div className="absolute -end-20 -top-24 h-64 w-64 rounded-full bg-white/55 blur-3xl" />
      <div className="absolute -start-16 bottom-0 h-56 w-56 rounded-full bg-slate-500/15 blur-2xl" />

      {/* Abstract product window: gives image-less demo projects a designed cover. */}
      <div className="absolute inset-x-[9%] top-[17%] bottom-[8%] overflow-hidden rounded-xl border border-white/80 bg-white/55 shadow-[0_34px_70px_-30px_rgba(15,23,42,0.42)] backdrop-blur-md">
        <div className="flex h-8 items-center gap-1.5 border-b border-slate-900/10 px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-900/55" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-900/28" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-900/14" />
          <span className="ms-2 h-2 w-1/3 rounded-full bg-slate-900/10" />
          <span className="ms-auto h-2 w-9 rounded-full bg-slate-900/8" />
        </div>

        <div className="grid h-[calc(100%-2rem)] grid-cols-[0.85fr_1.15fr] gap-3 p-3 sm:gap-4 sm:p-4">
          <div className="flex flex-col gap-2.5">
            <div className="h-2 w-2/3 rounded-full bg-slate-900/35" />
            <div className="h-2 w-1/2 rounded-full bg-slate-900/15" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="h-9 rounded-md border border-slate-900/10 bg-white/60 sm:h-11" />
              <div className="h-9 rounded-md border border-slate-900/10 bg-white/42 sm:h-11" />
            </div>
            <div className="mt-auto space-y-2 pb-1">
              <div className="h-1.5 w-3/4 rounded-full bg-slate-900/12" />
              <div className="h-1.5 w-1/2 rounded-full bg-slate-900/10" />
            </div>
          </div>

          <div className="flex flex-col rounded-lg border border-slate-900/10 bg-gradient-to-br from-white/80 to-white/38 p-3">
            <div className="flex items-center justify-between">
              <div className="h-1.5 w-12 rounded-full bg-slate-900/22" />
              <div className="h-4 w-8 rounded-full bg-slate-900/10" />
            </div>
            <div className="mt-auto flex h-[52%] items-end gap-1">
              {bars.map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-sm bg-gradient-to-t from-slate-900/20 to-slate-900/60"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-slate-900/10" />
          </div>
        </div>
      </div>

      <span className="absolute end-5 top-5 grid h-9 w-9 place-items-center rounded-lg border border-white/70 bg-white/70 font-mono text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur">
        {initial}
      </span>

      <div className="absolute inset-0 bg-gradient-to-t from-white/32 via-transparent to-transparent" />
    </div>
  );
}
