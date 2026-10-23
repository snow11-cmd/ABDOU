"use client";

import { useEffect, useRef } from "react";

/**
 * Small, purely decorative pieces of site chrome:
 * - a scroll progress hairline,
 * - a soft light that trails the pointer on precise-pointer devices,
 * - a fixed film-grain layer.
 *
 * All motion is CSS-driven or imperative, so scrolling does not trigger React
 * renders. The pointer light is disabled by CSS for touch and reduced motion.
 */
export function SiteEffects() {
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const glow = glowRef.current;
    if (!progress || !glow) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.style.transform = `scaleX(${value})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduceMotion.matches) return;
      glow.style.transform = `translate3d(${event.clientX - 270}px, ${event.clientY - 270}px, 0)`;
      glow.style.opacity = "1";
    };

    const hideGlow = () => {
      glow.style.opacity = "0";
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", hideGlow);
    document.documentElement.addEventListener("mouseleave", hideGlow);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", hideGlow);
      document.documentElement.removeEventListener("mouseleave", hideGlow);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div ref={progressRef} className="scroll-progress-bar" />
      </div>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div className="site-grain" aria-hidden="true" />
    </>
  );
}
