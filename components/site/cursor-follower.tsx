"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const interactive = "a, button, [role='button'], input, textarea, select, summary";

export function CursorFollower() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 480, damping: 38, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 480, damping: 38, mass: 0.35 });

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    // Pointer capability is only known in the browser, so enable after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target;
      setActive(target instanceof Element && Boolean(target.closest(interactive)));
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <motion.span
        animate={{
          width: active ? 34 : 18,
          height: active ? 34 : 18,
          opacity: active ? 0.75 : 0.45,
          borderColor: active ? "var(--cursor-strong)" : "var(--cursor-soft)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="block -translate-x-1/2 -translate-y-1/2 rounded-full border"
      />
    </motion.div>
  );
}
