"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * CSS-driven scroll reveal. We intentionally avoid JS animation libraries here:
 * they render `opacity: 0` on the server, and when the OS has "reduce motion"
 * enabled the client skips the animation, leaving content invisible.
 *
 * `html.js` is added by an inline script before paint, so content stays visible
 * without JavaScript. The reduced-motion media query forces visibility.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const revealIfInView = () => {
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < viewport - 90 && rect.bottom > 0) {
        element.classList.add("is-visible");
      }
    };

    revealIfInView();
    const timer = window.setTimeout(revealIfInView, 400);

    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("is-visible");
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add("is-visible");
            if (once) observer.disconnect();
          } else if (!once) {
            element.classList.remove("is-visible");
          }
        }
      },
      { rootMargin: "0px 0px -90px 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
