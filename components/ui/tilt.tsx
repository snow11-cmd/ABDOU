"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Tilt({
  children,
  className,
  maxTilt = 6,
  hoverScale = 1.012,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  hoverScale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const scale = useMotionValue(1);

  const spring = { stiffness: 180, damping: 24, mass: 0.45 };
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);
  const smoothScale = useSpring(scale, { stiffness: 220, damping: 26 });

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  const reset = () => {
    x.set(0.5);
    y.set(0.5);
    scale.set(1);
  };

  return (
    <div
      ref={ref}
      className={cn("[perspective:1400px]", className)}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width);
        y.set((event.clientY - rect.top) / rect.height);
        scale.set(hoverScale);
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: smoothScale,
          transformStyle: "preserve-3d",
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
