"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}): ReactNode {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      suppressHydrationWarning
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleUnblur({
  children,
  delay = 0,
  duration = 1,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}): ReactNode {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      suppressHydrationWarning
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, filter: "blur(14px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}): ReactNode {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      suppressHydrationWarning
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
