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
    default: "border-white/12 bg-white/[0.05] text-[#aab4ca]",
    success: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    warning: "border-amber-400/25 bg-amber-400/10 text-amber-300",
    danger: "border-rose-400/25 bg-rose-400/10 text-rose-300",
    info: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
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
