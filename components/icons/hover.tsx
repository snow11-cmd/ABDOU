"use client";

/**
 * Hover orchestration for the animated icon set.
 *
 * The itshover icons animate themselves when the pointer is directly over
 * them (framer-motion `onHoverStart`). These helpers extend that so a whole
 * card, row or list item drives every tile it contains.
 */
import { createContext, useCallback, useEffect, useRef, useState } from "react";

import type { AnimatedIconHandle } from "./types";

/** `null` means "no group active — tiles animate on their own hover only". */
export const IconHoverContext = createContext<boolean | null>(null);

/**
 * Track hover (+ keyboard focus) on an interactive container so its
 * `IconTile`s play their animation together. Spread `hoverProps` on the
 * element and wrap its children with `<IconHoverContext.Provider value={hovered}>`.
 */
export function useIconHover() {
  const [hovered, setHovered] = useState(false);
  const enter = useCallback(() => setHovered(true), []);
  const leave = useCallback(() => setHovered(false), []);
  const hoverProps = {
    onMouseEnter: enter,
    onMouseLeave: leave,
    onFocus: enter,
    onBlur: leave,
  } as const;
  return { hovered, hoverProps } as const;
}

/**
 * Imperatively drive one animated icon. Attach the returned ref to the icon;
 * when `active` is `null` the instance keeps its own hover behaviour.
 */
export function useIconDrive(active: boolean | null) {
  const ref = useRef<AnimatedIconHandle>(null);

  useEffect(() => {
    if (active === null) return;
    const api = ref.current;
    if (!api) return;
    if (active) void api.startAnimation();
    else void api.stopAnimation();
  }, [active]);

  return ref;
}
