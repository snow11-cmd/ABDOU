import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

/** Lucide icons and the inline brand SVGs both satisfy this shape. */
export type TileIcon = ComponentType<{ className?: string; strokeWidth?: number }>;

const sizes = {
  sm: "size-9 rounded-lg [&>svg]:size-4",
  md: "size-11 rounded-xl [&>svg]:size-5",
  lg: "size-12 rounded-xl [&>svg]:size-5",
} as const;

const tones = {
  brand: "border-white/10 bg-white/[0.055] text-[#b6c8f1] [&>svg]:opacity-95",
  muted: "border-white/[0.08] bg-white/[0.035] text-[#9fb0d6] [&>svg]:opacity-75",
  emerald: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
} as const;

export function IconTile({
  icon: Icon,
  size = "md",
  tone = "brand",
  className,
}: {
  icon: TileIcon;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        sizes[size],
        tones[tone],
        className,
      )}
    >
      <Icon strokeWidth={1.6} />
    </span>
  );
}
