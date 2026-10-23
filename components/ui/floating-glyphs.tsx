import { Braces, Code2, Palette } from "lucide-react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * A very small set of decorative glyphs that float in the hero's existing
 * cosmic layer. Static data means React can never accumulate duplicate
 * particles across re-renders, and the CSS drift runs off the main thread.
 */
const glyphs = [
  {
    Icon: Code2,
    side: "start",
    offset: "3.5%",
    top: "27%",
    size: 22,
    duration: "38s",
    delay: "-11s",
    driftX: "5px",
    driftY: "-9px",
    rotate: "2.4deg",
    opacity: 0.2,
  },
  {
    Icon: Braces,
    side: "end",
    offset: "4%",
    top: "19%",
    size: 18,
    duration: "46s",
    delay: "-24s",
    driftX: "-4px",
    driftY: "8px",
    rotate: "-1.8deg",
    opacity: 0.16,
  },
  {
    Icon: Palette,
    side: "start",
    offset: "7%",
    top: "68%",
    size: 17,
    duration: "42s",
    delay: "-6s",
    driftX: "6px",
    driftY: "6px",
    rotate: "2deg",
    opacity: 0.24,
  },
] as const;

export function FloatingGlyphs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 hidden lg:block", className)}
    >
      {glyphs.map((glyph, index) => {
        const anchor = glyph.side === "start" ? "insetInlineStart" : "insetInlineEnd";
        const style = {
          [anchor]: glyph.offset,
          top: glyph.top,
          opacity: glyph.opacity,
          "--icon-duration": glyph.duration,
          "--icon-delay": glyph.delay,
          "--icon-x": glyph.driftX,
          "--icon-y": glyph.driftY,
          "--icon-rotate": glyph.rotate,
        } as CSSProperties;

        return (
          <span
            key={`${glyph.side}-${glyph.offset}-${index}`}
            className="icon-decorative icon-drift absolute inline-flex"
            style={style}
          >
            <glyph.Icon
              strokeWidth={1.1}
              style={{ width: glyph.size, height: glyph.size }}
              aria-hidden="true"
            />
          </span>
        );
      })}
    </div>
  );
}
