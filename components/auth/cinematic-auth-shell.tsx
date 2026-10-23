"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, LockKeyhole, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/site/language-switcher";
import { LogoMark } from "@/components/ui/logo";
import { StatusDot } from "@/components/ui/status-dot";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type IntroStage = "veil" | "opening" | "revealed";

const particles = [
  { left: "8%", top: "34%", size: 3, delay: "-4s", duration: "22s" },
  { left: "20%", top: "12%", size: 2, delay: "-9s", duration: "26s" },
  { left: "82%", top: "24%", size: 2.5, delay: "-14s", duration: "24s" },
  { left: "92%", top: "58%", size: 2, delay: "-2s", duration: "28s" },
  { left: "74%", top: "82%", size: 3, delay: "-17s", duration: "21s" },
  { left: "14%", top: "76%", size: 2, delay: "-6s", duration: "25s" },
  { left: "48%", top: "4%", size: 2, delay: "-11s", duration: "23s" },
  { left: "58%", top: "94%", size: 2.5, delay: "-19s", duration: "27s" },
] as const;

export function CinematicAuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { t } = useI18n();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<IntroStage>("veil");
  const closingRef = useRef(false);

  const entered = reduceMotion === true || stage !== "veil";

  useEffect(() => {
    if (reduceMotion) {
      const id = window.setTimeout(() => setStage("revealed"), 0);
      return () => window.clearTimeout(id);
    }

    const openTimer = window.setTimeout(() => setStage("opening"), 520);
    const doneTimer = window.setTimeout(() => setStage("revealed"), 1450);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(doneTimer);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollbarGutter;
    root.style.scrollbarGutter = "stable";
    return () => {
      root.style.scrollbarGutter = previous;
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || stage === "revealed") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [reduceMotion, stage]);

  const closePortal = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    router.push("/");
  }, [router]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      closePortal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closePortal]);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#030409]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-22%] left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#2f4fa8]/15 blur-[150px]" />
        <div className="absolute bottom-[-24%] -left-40 h-[42rem] w-[42rem] rounded-full bg-[#6d3ff0]/10 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full bg-[#22d3ee]/[0.06] blur-[120px]" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_42%,#000_10%,transparent_75%)] opacity-[0.14]" />
      </div>

      <motion.button
        type="button"
        onClick={closePortal}
        aria-label={t("common.close")}
        initial={reduceMotion ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.15 }}
        className="fixed end-4 top-4 z-[90] grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-[#070a13]/70 text-[#c9d2e4] shadow-[0_12px_36px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 sm:end-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </motion.button>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10 sm:py-14">
        <motion.section
          aria-labelledby="login-title"
          inert={stage !== "revealed"}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.975, y: 14 }}
          animate={entered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.975, y: 14 }}
          transition={{
            duration: reduceMotion ? 0 : 0.95,
            delay: reduceMotion ? 0 : 0.18,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#060912]/[0.88] shadow-[0_50px_140px_-50px_rgba(0,0,0,0.95)] backdrop-blur-md sm:rounded-[2rem]"
        >
          <span
            className="pointer-events-none absolute inset-x-12 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#7aa2ff]/75 to-transparent"
            aria-hidden="true"
          />

          <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
            <aside className="relative hidden flex-col justify-between overflow-hidden border-e border-white/[0.07] p-8 lg:flex xl:p-10">
              <div
                className="absolute inset-0 bg-[radial-gradient(120%_100%_at_18%_0%,rgba(79,124,255,0.2),transparent_56%),radial-gradient(90%_90%_at_100%_100%,rgba(139,92,246,0.16),transparent_62%),linear-gradient(160deg,#0a1020_0%,#05070e_100%)]"
                aria-hidden="true"
              />
              <div
                className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_10%,transparent_78%)] opacity-[0.2]"
                aria-hidden="true"
              />
              <div
                className="absolute -start-24 top-20 h-64 w-64 rounded-full bg-[#4f7cff]/20 blur-[90px]"
                aria-hidden="true"
              />
              <div
                className="absolute -end-20 bottom-0 h-64 w-64 rounded-full bg-[#8b5cf6]/16 blur-[90px]"
                aria-hidden="true"
              />

              <Link
                href="/"
                className="relative z-10 inline-flex w-fit items-center gap-2 text-xs font-medium text-[#aab4ca] transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                {t("common.goHome")}
              </Link>

              <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-10 text-center">
                <LogoOrb active={entered} />
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.7,
                    delay: reduceMotion ? 0 : 0.34,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-8 text-2xl font-bold tracking-tight text-white"
                >
                  Abu Jasem
                </motion.p>
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.7,
                    delay: reduceMotion ? 0 : 0.42,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-2 font-mono text-[9px] tracking-[0.34em] text-[#7f8aa3] uppercase"
                >
                  Digital Studio
                </motion.p>
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.75,
                    delay: reduceMotion ? 0 : 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-7 max-w-[17rem] text-sm leading-relaxed text-pretty text-[#9aa5bc]"
                >
                  “{t("footer.tagline")}”
                </motion.p>
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  delay: reduceMotion ? 0 : 0.56,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative z-10 mx-auto flex max-w-sm items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-center text-[11px] leading-relaxed text-[#8b94aa]"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                </span>
                {t("auth.secureSession")}
              </motion.div>
            </aside>

            <div className="relative flex h-full flex-col p-6 sm:p-9 lg:p-10">
              <span
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                aria-hidden="true"
              />

              <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center lg:max-w-none">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-[#8b94aa]">
                    <StatusDot size="xs" />
                    {t("auth.securePortal")}
                  </span>
                  <LanguageSwitcher compact />
                </div>

                <div className="mb-7 flex justify-center lg:hidden">
                  <LogoOrb active={entered} compact />
                </div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.75,
                    delay: reduceMotion ? 0 : 0.34,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <h1
                    id="login-title"
                    className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                  >
                    {title}
                  </h1>
                  {subtitle ? (
                    <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-[#8b94aa]">
                      {subtitle}
                    </p>
                  ) : null}

                  <div className="mt-8">{children}</div>

                  {footer ? (
                    <div className="mt-6 text-center text-sm text-[#8b94aa]">{footer}</div>
                  ) : null}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <div
        className={cn(
          "fixed inset-0 z-[80]",
          stage === "revealed" ? "pointer-events-none" : "pointer-events-auto",
        )}
        aria-hidden="true"
      >
        <AnimatePresence>
          {stage !== "revealed" ? (
            <CinematicBarrier opening={stage === "opening"} instant={reduceMotion === true} />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LogoOrb({ active, compact = false }: { active: boolean; compact?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
      transition={{
        duration: reduceMotion ? 0 : 1.05,
        delay: reduceMotion ? 0 : 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "relative grid place-items-center",
        compact ? "h-32 w-32 sm:h-36 sm:w-36" : "h-64 w-64 xl:h-72 xl:w-72",
      )}
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-white/[0.08]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8ab4ff] shadow-[0_0_14px_3px_rgba(91,124,255,0.6)]" />
      </motion.div>

      <motion.div
        className="absolute inset-[12%] rounded-full border border-dashed border-[#6d8cff]/20"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      <div
        className={cn(
          "absolute inset-[28%] rounded-full bg-[#4f7cff]/15 blur-2xl",
          !reduceMotion && "animate-pulse-glow",
        )}
        aria-hidden="true"
      />
      <div
        className="absolute inset-[34%] rounded-full bg-[#8b5cf6]/10 blur-xl"
        aria-hidden="true"
      />

      <LogoMark
        size={compact ? "lg" : "xl"}
        className={compact ? "" : "drop-shadow-[0_0_40px_rgba(79,124,255,0.28)]"}
      />

      {!compact ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {particles.map((particle, index) => (
            <span
              key={index}
              className={cn(
                "absolute rounded-full bg-[#8ab4ff]/70 shadow-[0_0_10px_2px_rgba(91,124,255,0.4)]",
                !reduceMotion && "animate-float",
              )}
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}

function CinematicBarrier({ opening, instant }: { opening: boolean; instant: boolean }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      initial={{ opacity: instant ? 0 : 1 }}
      exit={{ opacity: 0, transition: { duration: instant ? 0 : 0.42, ease: "easeOut" } }}
    >
      <motion.div
        className="absolute inset-0 bg-[#02040a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: opening ? 0.85 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(61,99,245,0.12),transparent_70%)]" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_55%_55%_at_50%_50%,#000_5%,transparent_75%)] opacity-[0.12]" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 h-[min(60vh,480px)] w-[min(82vw,390px)] -translate-x-1/2 -translate-y-1/2 rounded-[1.85rem] bg-[#4f7cff]/20 blur-[70px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 0.8 }}
        transition={{ duration: opening ? 0.7 : 0.55, delay: opening ? 0 : 0.12 }}
        aria-hidden="true"
      />

      <div className="absolute top-1/2 left-1/2 h-[min(60vh,480px)] w-[min(82vw,390px)] -translate-x-1/2 -translate-y-1/2 [perspective:1200px]">
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 overflow-hidden rounded-l-[1.75rem] border border-r-0 border-white/[0.12] bg-[linear-gradient(155deg,rgba(45,62,102,0.82),rgba(7,11,21,0.96))] shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]"
          initial={{ opacity: 0.35, scale: 0.96, x: 0, rotateY: 0 }}
          animate={
            opening
              ? { opacity: 0, scale: 1.02, x: "-58%", rotateY: 30 }
              : { opacity: 1, scale: 1, x: 0, rotateY: 0 }
          }
          transition={{
            duration: opening ? 0.9 : 0.55,
            delay: 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(122,162,255,0.18),transparent_62%)]" />
          <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          <span className="absolute inset-y-6 right-0 w-px bg-gradient-to-b from-transparent via-[#8ab4ff] to-transparent shadow-[0_0_24px_4px_rgba(91,124,255,0.5)]" />
          <span className="absolute top-1/2 -right-20 h-40 w-40 -translate-y-1/2 rounded-full bg-[#4f7cff]/20 blur-3xl" />
        </motion.div>

        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-r-[1.75rem] border border-l-0 border-white/[0.12] bg-[linear-gradient(205deg,rgba(45,62,102,0.82),rgba(7,11,21,0.96))] shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]"
          initial={{ opacity: 0.35, scale: 0.96, x: 0, rotateY: 0 }}
          animate={
            opening
              ? { opacity: 0, scale: 1.02, x: "58%", rotateY: -30 }
              : { opacity: 1, scale: 1, x: 0, rotateY: 0 }
          }
          transition={{
            duration: opening ? 0.9 : 0.55,
            delay: 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(122,162,255,0.18),transparent_62%)]" />
          <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          <span className="absolute inset-y-6 left-0 w-px bg-gradient-to-b from-transparent via-[#8ab4ff] to-transparent shadow-[0_0_24px_4px_rgba(91,124,255,0.5)]" />
          <span className="absolute top-1/2 -left-20 h-40 w-40 -translate-y-1/2 rounded-full bg-[#8b5cf6]/20 blur-3xl" />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={opening ? { opacity: 0, scale: 1.2 } : { opacity: 1, scale: 1 }}
            transition={{
              duration: opening ? 0.35 : 0.55,
              delay: opening ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid h-14 w-14 place-items-center rounded-full border border-[#8ab4ff]/25 bg-[#08101f]/85 text-[#b9c8ff] shadow-[0_0_40px_-6px_rgba(91,124,255,0.65),inset_0_1px_0_rgba(255,255,255,0.12)]"
          >
            <LockKeyhole className="h-5 w-5" />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-[12%] flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1, y: opening ? 8 : 0 }}
        transition={{ duration: opening ? 0.35 : 0.55, delay: opening ? 0 : 0.32 }}
      >
        <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 font-mono text-[9px] tracking-[0.3em] text-[#7f8aa3] uppercase">
          Secure access
        </span>
      </motion.div>
    </motion.div>
  );
}
