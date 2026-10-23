"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Full-screen video stage with a damped mouse parallax. The video keeps its
 * original grade; depth comes from the moving frame, tint, grid and vignette
 * layers instead of CSS filters on the footage itself.
 */
export function ImmersiveBackground() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!stage || !video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const render = () => {
      const ease = reduceMotion.matches ? 1 : 0.075;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;

      stage.style.setProperty("--scene-rx", `${(-current.y * 2.2).toFixed(3)}deg`);
      stage.style.setProperty("--scene-ry", `${(current.x * 3.1).toFixed(3)}deg`);
      stage.style.setProperty("--scene-x", `${(current.x * 10).toFixed(3)}px`);
      stage.style.setProperty("--scene-y", `${(current.y * 8).toFixed(3)}px`);

      const settled = Math.abs(target.x - current.x) < 0.0005 && Math.abs(target.y - current.y) < 0.0005;
      frame = settled ? 0 : window.requestAnimationFrame(render);
    };

    const wake = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduceMotion.matches || !finePointer.matches) return;
      target.x = clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
      target.y = clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1);
      wake();
    };

    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };

    const syncPlayback = () => {
      if (reduceMotion.matches || document.hidden) {
        video.pause();
        return;
      }
      void video.play().catch(() => {
        // Autoplay can be blocked by a browser setting; the poster remains.
      });
    };

    const onMotionChange = () => {
      if (reduceMotion.matches) {
        target.x = 0;
        target.y = 0;
        wake();
      }
      syncPlayback();
    };

    syncPlayback();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onPointerLeave);
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("visibilitychange", syncPlayback);
    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("visibilitychange", syncPlayback);
      reduceMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div
      className="site-background"
      data-video={videoFailed ? "failed" : "ready"}
      style={{ viewTransitionName: "site-background" }}
      aria-hidden="true"
    >
      <div ref={stageRef} className="site-background__stage">
        <div className="site-background__breathe">
          {/* The footage is deliberately unfiltered so its original grade survives. */}
          <video
            ref={videoRef}
            className="site-background__video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/videos/hero-poster.jpg"
            disablePictureInPicture
            tabIndex={-1}
            onError={() => setVideoFailed(true)}
          >
            <source src="/videos/hero-loop.mp4" type="video/mp4" />
          </video>
        </div>

        <span className="site-background__flare site-background__flare--a" />
        <span className="site-background__flare site-background__flare--b" />
      </div>

      <span className="site-background__tint" />
      <span className="site-background__scrim" />
      <span className="site-background__grid" />
      <span className="site-background__vignette" />
    </div>
  );
}
