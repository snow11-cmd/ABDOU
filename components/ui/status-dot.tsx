import { cn } from "@/lib/utils";

/**
 * Single source of truth for the small "live" indicator used across the site.
 * The halo pulses slowly with CSS only, so there is no React state, no timers
 * and no duplicated inline markup to drift apart.
 */
export function StatusDot({
  tone = "emerald",
  size = "sm",
  className,
}: {
  tone?: "emerald" | "cyan";
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "status-dot",
        size === "xs" && "status-dot--xs",
        size === "md" && "status-dot--md",
        tone === "cyan" && "status-dot--cyan",
        className,
      )}
    >
      <span className="status-dot__halo" />
      <span className="status-dot__core" />
    </span>
  );
}
