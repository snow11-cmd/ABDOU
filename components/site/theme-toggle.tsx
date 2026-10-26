"use client";

import { useEffect, useState } from "react";

import { BrightnessDownIcon, MoonIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useI18n();
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    // The pre-hydration script is the source of truth for the initial theme.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current);
    setMounted(true);
  }, []);

  const apply = (next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      window.localStorage.setItem("portfolio-theme", next);
    } catch {
      // Storage can be unavailable in private mode; the toggle still works.
    }
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    meta?.setAttribute("content", next === "dark" ? "#0b0b0c" : "#ffffff");
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={() => apply(theme === "dark" ? "light" : "dark")}
      aria-label={t("theme.toggle")}
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? t("theme.light") : t("theme.dark")}
      className={cn(
        "group relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full text-neutral-600 transition-colors duration-300 hover:bg-black/[0.045] hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:size-9 dark:text-neutral-100 dark:hover:bg-white/[0.08] dark:hover:text-white dark:focus-visible:outline-white",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          mounted && theme === "dark"
            ? "translate-y-5 scale-50 opacity-0"
            : "translate-y-0 scale-100 opacity-100",
        )}
      >
        <BrightnessDownIcon size={16} strokeWidth={1.75} />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          mounted && theme === "dark"
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-5 scale-50 opacity-0",
        )}
      >
        <MoonIcon size={16} strokeWidth={1.75} />
      </span>
    </button>
  );
}
