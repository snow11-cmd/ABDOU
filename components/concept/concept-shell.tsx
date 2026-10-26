"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, X as CloseIcon, Menu as MenuIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/site/language-switcher";
import type { Project, Service, SiteSettings } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

import { conceptCopy } from "./concept-copy";
import {
  ConceptAbout,
  ConceptContact,
  ConceptFooter,
  ConceptProcess,
  ConceptQuote,
  ConceptServices,
  ConceptWork,
} from "./concept-sections";
import { ConceptStage } from "./concept-stage";
import { ConceptMarquee } from "./concept-ui";

const sectionIds = ["about", "work", "services", "process", "contact"];

export function ConceptShell({
  projects,
  services,
  settings,
}: {
  projects: Project[];
  services: Service[];
  settings: SiteSettings;
}) {
  const { lang, t } = useI18n();
  const copy = conceptCopy[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.2,
  });

  const stageProjects = useMemo(() => {
    const featured = projects.filter((project) => project.featured);
    const rest = projects.filter((project) => !project.featured);
    return [...featured, ...rest].slice(0, 3);
  }, [projects]);

  const navLinks = [
    { id: "work", label: copy.nav.work },
    { id: "services", label: copy.nav.services },
    { id: "about", label: copy.nav.about },
    { id: "contact", label: copy.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      if (window.scrollY < window.innerHeight * 0.65) setActiveSection("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -52% 0px", threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <div
      id="top"
      className="concept-shell"
      data-lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
    >
      <motion.span className="concept-progress" style={{ scaleX: progress }} aria-hidden="true" />

      <header className={cn("concept-header", scrolled && "is-scrolled")}>
        <div className="concept-container concept-header-inner">
          <a href="#top" className="concept-logo" aria-label={t("nav.home")}>
            <span className="concept-logo-mark">AJ</span>
            <span className="concept-logo-word">
              {lang === "ar" ? "أبو جاسم" : "ABU JASEM"}
              <small>STUDIO / ©26</small>
            </span>
          </a>

          <nav className="concept-nav" aria-label={t("nav.main")}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(activeSection === link.id && "is-active")}
                aria-current={activeSection === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="concept-header-actions">
            <span className="concept-header-lang">
              <LanguageSwitcher tone="light" />
            </span>
            <a href="#contact" className="concept-header-cta">
              {copy.cta}
              <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="concept-menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label={lang === "ar" ? "القائمة" : "Menu"}
              aria-expanded={menuOpen}
              aria-controls="concept-mobile-menu"
            >
              <MenuIcon size={18} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="concept-mobile-menu"
            className="concept-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={lang === "ar" ? "قائمة التنقل" : "Navigation menu"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="concept-mobile-menu-top">
              <span className="concept-logo">
                <span className="concept-logo-mark">AJ</span>
                <span className="concept-logo-word">
                  {lang === "ar" ? "أبو جاسم" : "ABU JASEM"}
                  <small>STUDIO / ©26</small>
                </span>
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className="concept-mobile-close"
                onClick={() => setMenuOpen(false)}
                aria-label={lang === "ar" ? "إغلاق" : "Close"}
              >
                <CloseIcon size={19} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>

            <nav className="concept-mobile-nav" aria-label={t("nav.mobile")}>
              {navLinks.map((link, index) => (
                <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {link.label}
                  <ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
            </nav>

            <div className="concept-mobile-menu-foot">
              <a href={`mailto:${settings.email}`} className="concept-mobile-email">
                {settings.email}
              </a>
              <div className="concept-mobile-meta">
                <span>{copy.announcement}</span>
                <LanguageSwitcher tone="light" />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main id="main">
        <section className="concept-hero">
          <div className="concept-hero-glow" aria-hidden="true" />
          <div className="concept-hero-lines" aria-hidden="true" />

          <div className="concept-container concept-hero-inner">
            <div className="concept-hero-meta">
              <span>{copy.edition}</span>
              <span className="concept-hero-meta-status">
                <span className="concept-dot" aria-hidden="true" />
                {copy.hero.status}
              </span>
              <span className="concept-hero-meta-coords">31.95° N / 35.23° E</span>
            </div>

            <div className="concept-hero-main">
              <div className="concept-hero-copy">
                <p className="concept-hero-eyebrow">{copy.hero.eyebrow}</p>

                <h1 className="concept-hero-title">
                  <span className="concept-hero-line1">{copy.hero.line1}</span>
                  <span className="concept-hero-line2">
                    {copy.hero.line2.split(" ").map((word, index) => (
                      <span key={`${word}-${index}`}>{word}</span>
                    ))}
                  </span>
                  <span className="concept-hero-line3">{copy.hero.line3}</span>
                </h1>

                <p className="concept-hero-intro">{copy.hero.intro}</p>

                <div className="concept-hero-actions">
                  <a href="#work" className="concept-btn concept-btn--primary">
                    {copy.hero.primary}
                    <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                  <a href="#about" className="concept-btn concept-btn--ghost">
                    {copy.hero.secondary}
                    <ArrowDown size={14} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                </div>

                <div className="concept-hero-status">
                  <span className="concept-dot" aria-hidden="true" />
                  {copy.hero.status}
                </div>
              </div>

              <ConceptStage projects={stageProjects} />
            </div>

            <div className="concept-hero-foot">
              <div className="concept-hero-stats">
                {copy.about.stats.map((stat) => (
                  <div key={stat.label} className="concept-hero-stat">
                    <span>{stat.value}</span>
                    <small>{stat.label}</small>
                  </div>
                ))}
              </div>

              <a href="#about" className="concept-scroll">
                <span className="concept-scroll-icon">
                  <ArrowDown size={15} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>{copy.hero.scroll}</span>
              </a>

              <div className="concept-hero-coords">
                <span>PALESTINE</span>
                <span>WORKING WORLDWIDE</span>
              </div>
            </div>
          </div>
        </section>

        <ConceptMarquee items={copy.marquee} />

        <ConceptAbout settings={settings} />
        <ConceptWork projects={projects} />
        <ConceptServices services={services} />
        <ConceptProcess />
        <ConceptQuote />
        <ConceptContact settings={settings} />
      </main>

      <ConceptFooter />
    </div>
  );
}
