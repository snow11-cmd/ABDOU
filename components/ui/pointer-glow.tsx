"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export function PointerGlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(50);
  const y = useMotionValue(35);
  const smoothX = useSpring(x, { stiffness: 90, damping: 24, mass: 0.6 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 24, mass: 0.6 });
  const background = useMotionTemplate`radial-gradient(460px circle at ${smoothX}% ${smoothY}%, rgba(198, 161, 91, 0.16), transparent 66%)`;

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const move = (event: PointerEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(((event.clientX - rect.left) / rect.width) * 100);
      y.set(((event.clientY - rect.top) / rect.height) * 100);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduceMotion, x, y]);

  // Keep the markup identical on the server and the client: the glow is hidden
  // for reduced-motion users through CSS (see globals.css) instead of returning
  // null during render, which triggered a hydration mismatch.
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{ background }}
      className={cn("pointer-glow pointer-events-none absolute inset-0 hidden md:block", className)}
    />
  );
}
