import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "success" | "warning" | "danger" | "info";
}) {
  const tones = {
    default:
      "border-slate-900/10 bg-white/70 text-slate-700 dark:border-white/[0.12] dark:bg-white/[0.06] dark:text-neutral-100",
    success:
      "border-emerald-700/20 bg-emerald-600/10 text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300",
    warning:
      "border-amber-700/20 bg-amber-500/10 text-amber-800 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300",
    danger:
      "border-rose-700/20 bg-rose-500/10 text-rose-800 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-300",
    info: "border-slate-700/15 bg-slate-500/10 text-slate-700 dark:border-white/[0.14] dark:bg-white/[0.07] dark:text-neutral-100",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs leading-none font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
