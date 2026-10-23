import type { CSSProperties, ComponentType } from "react";

import { cn } from "@/lib/utils";

/** Lucide icons and the inline brand SVGs both satisfy this shape. */
export type Icon3DIcon = ComponentType<{ className?: string; strokeWidth?: number }>;

export type Icon3DMotion =
  | "flip"
  | "orbit"
  | "rise"
  | "swing"
  | "magnet"
  | "pivot"
  | "zoom"
  | "tumble"
  | "drift"
  | "tilt";

export type Icon3DTone = "cyan" | "violet" | "mint" | "coral" | "amber" | "neutral";

const sizes = {
  sm: "icon3d--sm",
  md: "icon3d--md",
  lg: "icon3d--lg",
  xl: "icon3d--xl",
} as const;

const tones = {
  cyan: "icon3d--cyan",
  violet: "icon3d--violet",
  mint: "icon3d--mint",
  coral: "icon3d--coral",
  amber: "icon3d--amber",
  neutral: "icon3d--neutral",
} as const;

/**
 * A single icon surface with a real depth layer, an entrance transform and a
 * motion recipe that is unique per instance. All inner layers are
 * pointer-events-none so only the surrounding card/link owns the hover state.
 */
export function Icon3D({
  icon: Icon,
  motion = "rise",
  tone = "cyan",
  size = "md",
  delay = 0,
  className,
}: {
  icon: Icon3DIcon;
  motion?: Icon3DMotion;
  tone?: Icon3DTone;
  size?: keyof typeof sizes;
  delay?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      data-motion={motion}
      className={cn("icon3d", sizes[size], tones[tone], className)}
      style={{ "--icon3d-delay": `${delay}s` } as CSSProperties}
    >
      <span className="icon3d__glow" />
      <span className="icon3d__depth" />
      <span className="icon3d__face">
        <Icon strokeWidth={1.55} />
      </span>
    </span>
  );
}
