import Link from "next/link";

import { cn } from "@/lib/utils";

const markSizes = {
  sm: "h-8 w-8 rounded-lg text-[9px]",
  md: "h-10 w-10 rounded-xl text-[10px]",
  lg: "h-20 w-20 rounded-[1.4rem] text-xl",
  xl: "h-28 w-28 rounded-[1.8rem] text-2xl",
} as const;

export function LogoMark({
  className,
  size = "md",
}: {
  className?: string;
  size?: keyof typeof markSizes;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center bg-neutral-950 font-bold tracking-[0.06em] text-white",
        markSizes[size],
        className,
      )}
    >
      AB
    </span>
  );
}

export function Logo({
  className,
  withText = true,
  tone = "dark",
}: {
  className?: string;
  withText?: boolean;
  tone?: "dark" | "light" | "auto";
}) {
  return (
    <Link
      href="/"
      aria-label="Abu Jasem — home"
      className={cn("group inline-flex shrink-0 items-center gap-3", className)}
    >
      <LogoMark
        className={cn(
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
          tone === "light" && "bg-white text-neutral-950",
          tone === "auto" && "bg-neutral-950 text-white dark:bg-[#f4f1ea] dark:text-neutral-950",
        )}
      />
      {withText ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-[0.95rem] font-semibold whitespace-nowrap",
              tone === "light" && "text-white",
              tone === "dark" && "text-neutral-950",
              tone === "auto" && "text-neutral-950 dark:text-[#f4f1ea]",
            )}
          >
            Abu Jasem
          </span>
          <span
            className={cn(
              "mt-1 text-[0.65rem] font-medium tracking-[0.18em] uppercase",
              tone === "light" && "text-white/75",
              tone === "dark" && "text-neutral-600",
              tone === "auto" && "text-neutral-600 dark:text-neutral-300",
            )}
          >
            Digital Studio
          </span>
        </span>
      ) : null}
    </Link>
  );
}
