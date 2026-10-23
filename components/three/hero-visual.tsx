"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { HeroFallback } from "./hero-fallback";

const HeroScene = dynamic(
  () => import("./hero-scene").then((mod) => ({ default: mod.HeroScene })),
  { ssr: false, loading: () => <HeroFallback /> },
);

export function HeroVisual() {
  const [mode, setMode] = useState<"pending" | "3d" | "fallback">("pending");

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => {
      setMode(motionQuery.matches || mobileQuery.matches ? "fallback" : "3d");
    };

    decide();
    mobileQuery.addEventListener("change", decide);
    motionQuery.addEventListener("change", decide);

    return () => {
      mobileQuery.removeEventListener("change", decide);
      motionQuery.removeEventListener("change", decide);
    };
  }, []);

  if (mode !== "3d") return <HeroFallback />;
  return <HeroScene />;
}
