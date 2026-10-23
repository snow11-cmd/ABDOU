import Link from "next/link";

import { cn } from "@/lib/utils";

const markSizes = {
  sm: {
    outer: "h-8 w-8 rounded-lg p-px",
    inner: "rounded-[7px] text-[10px]",
  },
  md: {
    outer: "h-10 w-10 rounded-xl p-px shadow-[0_8px_30px_-8px_rgba(79,124,255,0.7)]",
    inner: "rounded-[11px] text-sm",
  },
  lg: {
    outer: "h-20 w-20 rounded-[1.4rem] p-[2px] shadow-[0_14px_50px_-16px_rgba(79,124,255,0.8)]",
    inner: "rounded-[1.3rem] text-2xl",
  },
  xl: {
    outer: "h-28 w-28 rounded-[1.8rem] p-[2px] shadow-[0_22px_80px_-24px_rgba(79,124,255,0.85)]",
    inner: "rounded-[1.7rem] text-4xl",
  },
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
        "relative grid place-items-center bg-gradient-to-br from-[#4f7cff] via-[#6d5df6] to-[#22d3ee]",
        markSizes[size].outer,
        className,
      )}
    >
      <span
        className={cn(
          "grid h-full w-full place-items-center bg-[#070a13] font-black tracking-tight text-white",
          markSizes[size].inner,
        )}
      >
        AJ
      </span>
      <span className="absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-br from-[#4f7cff] to-[#22d3ee] opacity-40 blur-lg" />
    </span>
  );
}

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Abu Jasem — home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      {withText ? (
        <span className="flex flex-col leading-none">
          <span className="text-[0.95rem] font-bold text-white">Abu Jasem</span>
          <span className="mt-1 text-[0.65rem] font-medium tracking-[0.18em] text-[#7f8aa3] uppercase">
            Digital Studio
          </span>
        </span>
      ) : null}
    </Link>
  );
}
