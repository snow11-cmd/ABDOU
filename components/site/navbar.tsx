"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LockIcon, UnorderedListIcon, XIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", key: "nav.home" },
  { href: "/work", key: "nav.work" },
  { href: "/services", key: "nav.services" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/work") return pathname === "/work" || pathname.startsWith("/projects/");
  return pathname === href;
}

export function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-6"
      >
        <div className="relative flex items-center gap-1 rounded-full border border-black/[0.08] bg-white/85 p-1.5 shadow-[0_18px_55px_-34px_rgba(0,0,0,0.55)] backdrop-blur-xl dark:border-white/[0.12] dark:bg-[#101012]/85 dark:shadow-[0_18px_55px_-28px_rgba(0,0,0,0.9)]">
          <Link
            href="/"
            aria-label={t("nav.home")}
            className="group grid size-9 place-items-center rounded-full bg-neutral-950 text-[9px] font-bold tracking-[0.08em] text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-[#f4f1ea] dark:text-neutral-950 dark:focus-visible:outline-white"
          >
            AB
          </Link>

          <nav aria-label={t("nav.main")} className="hidden md:block">
            <ul className="relative flex items-center gap-0.5">
              {links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative isolate inline-flex h-9 items-center rounded-full px-3 text-[12px] font-medium tracking-tight transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white",
                        active
                          ? "text-white dark:text-neutral-950"
                          : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white",
                      )}
                    >
                      {active ? (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-neutral-950 dark:bg-[#f4f1ea]"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      ) : null}
                      <span className="relative">{t(link.key)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <span
            className="mx-0.5 hidden h-4 w-px bg-black/10 md:block dark:bg-white/15"
            aria-hidden="true"
          />
          <LanguageSwitcher compact className="hidden md:inline-flex" />
          <ThemeToggle className="hidden md:grid" />

          <Link
            href="/login"
            aria-label={t("nav.login")}
            className="hidden size-9 place-items-center rounded-full text-neutral-600 transition-colors duration-300 hover:bg-black/[0.045] hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:grid dark:text-neutral-100 dark:hover:bg-white/[0.08] dark:hover:text-white dark:focus-visible:outline-white"
          >
            <LockIcon size={16} strokeWidth={1.75} aria-hidden="true" />
          </Link>

          <div className="flex items-center gap-0.5 md:hidden">
            <LanguageSwitcher compact />
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("nav.menu")}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="grid size-10 place-items-center rounded-full text-neutral-800 transition-colors duration-300 hover:bg-black/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:text-neutral-200 dark:hover:bg-white/[0.08] dark:focus-visible:outline-white"
            >
              <UnorderedListIcon size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={dialogRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.mobile")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-white px-5 pt-5 md:hidden dark:bg-[#0b0b0c]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-[0.18em] text-neutral-600 uppercase dark:text-neutral-200">
                {t("hero.name")}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("nav.close")}
                className="grid size-10 place-items-center rounded-full border border-black/[0.08] text-neutral-900 transition-colors hover:bg-black/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-white/[0.12] dark:text-neutral-100 dark:hover:bg-white/[0.08] dark:focus-visible:outline-white"
              >
                <XIcon size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label={t("nav.mobile")} className="mt-12">
              <ul className="flex flex-col">
                {links.map((link, index) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * index, duration: 0.35 }}
                      className="border-b border-black/[0.07] dark:border-white/[0.08]"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between py-5 text-[1.7rem] font-medium tracking-tight transition-colors",
                          active
                            ? "text-neutral-950 dark:text-white"
                            : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-200",
                        )}
                      >
                        <span>{t(link.key)}</span>
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-10 flex items-center justify-between">
              <LanguageSwitcher />
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] px-4 py-2 text-xs font-medium text-neutral-800 transition-colors hover:bg-black/[0.04] dark:border-white/[0.12] dark:text-neutral-200 dark:hover:bg-white/[0.08]"
              >
                <LockIcon size={14} strokeWidth={1.75} aria-hidden="true" />
                {t("nav.login")}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
