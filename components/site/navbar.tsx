"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpLeft, LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { StatusDot } from "@/components/ui/status-dot";
import { useI18n } from "@/lib/i18n/provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn, isSupabaseConfigured } from "@/lib/utils";

import { LanguageSwitcher } from "./language-switcher";

const links = [
  { href: "/about", key: "nav.about" },
  { href: "/services", key: "nav.services" },
  { href: "/work", key: "nav.work" },
  { href: "/contact", key: "nav.contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/work") return pathname === "/work" || pathname.startsWith("/projects/");
  return pathname === href;
}

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const configured = isSupabaseConfigured();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!configured) return;
    let cancelled = false;
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setLoggedIn(Boolean(data.session));
    });
    return () => {
      cancelled = true;
    };
  }, [configured]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", onKeyDown);
      closeButtonRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="container-x">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-2xl px-3 transition-all duration-500 sm:px-4",
              scrolled
                ? "glass py-2.5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]"
                : "border border-transparent bg-transparent py-2.5",
            )}
          >
            <Logo />

            <nav className="hidden items-center gap-1 lg:flex" aria-label={t("nav.main")}>
              {links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "nav-link inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition duration-500 hover:bg-white/[0.05] hover:text-white",
                      active ? "bg-cyan-300/[0.08] text-white" : "text-[#aebdc5]",
                    )}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              {loggedIn ? (
                <ButtonLink
                  href="/admin"
                  size="sm"
                  className="hidden h-10 sm:inline-flex"
                  aria-label={t("nav.dashboard")}
                >
                  <LayoutDashboard className="size-4" aria-hidden="true" />
                  {t("nav.dashboard")}
                </ButtonLink>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden h-10 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium text-[#aebdc5] transition hover:bg-white/[0.05] hover:text-white sm:inline-flex"
                  >
                    <LogIn className="size-4" aria-hidden="true" />
                    {t("nav.login")}
                  </Link>
                  <ButtonLink
                    href="/contact"
                    size="sm"
                    className="hidden h-10 sm:inline-flex"
                  >
                    {t("nav.hire")}
                    <ArrowUpLeft className="size-4" aria-hidden="true" />
                  </ButtonLink>
                </>
              )}
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t("nav.menu")}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-cyan-200/25 hover:bg-white/[0.08] lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-[#020912]/85 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t("nav.menu")}
              className="relative m-4 overflow-hidden rounded-3xl border border-white/10 bg-[#06111b] p-6 shadow-2xl"
            >
              <span
                className="pointer-events-none absolute -end-20 -top-24 h-60 w-60 rounded-full bg-cyan-300/10 blur-[80px]"
                aria-hidden="true"
              />
              <div className="relative mb-8 flex items-center justify-between">
                <Logo />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("nav.close")}
                  className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-cyan-200/25 hover:bg-white/[0.08]"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
              <nav className="relative flex flex-col gap-1" aria-label={t("nav.mobile")}>
                {links.map((link, index) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-4 py-3 text-lg font-semibold transition duration-500 hover:bg-white/[0.05] hover:text-white",
                        active ? "bg-cyan-300/[0.08] text-white" : "text-[#d8e5e7]",
                      )}
                    >
                      {t(link.key)}
                      <span
                        className="font-mono text-[10px] font-normal tracking-[0.16em] text-[#6c818c] transition group-hover:text-cyan-200"
                        dir="ltr"
                      >
                        0{index + 1}
                      </span>
                    </Link>
                  );
                })}
              </nav>
              <div className="relative my-6 h-px bg-white/10" />
              <div className="relative mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-[#96aab2]">
                  <StatusDot size="xs" />
                  {t("nav.available")}
                </div>
                <LanguageSwitcher />
              </div>
              <div className="relative flex flex-col gap-3">
                <ButtonLink
                  href={loggedIn ? "/admin" : "/login"}
                  variant="secondary"
                  onClick={() => setOpen(false)}
                >
                  {loggedIn ? t("nav.dashboard") : t("nav.login")}
                </ButtonLink>
                <ButtonLink href="/contact" onClick={() => setOpen(false)}>
                  {t("nav.hire")}
                  <ArrowUpLeft className="size-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
