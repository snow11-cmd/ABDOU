"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, type ReactNode } from "react";

import { Reveal } from "@/components/ui/motion-primitives";
import type { Project, ProjectCategory, Service, SiteSettings } from "@/lib/data/types";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

import { conceptCopy } from "./concept-copy";
import { ConceptLabel, ConceptOrb, ConceptProjectVisual } from "./concept-ui";

const categoryKeys: Record<ProjectCategory, DictKey> = {
  web: "work.web",
  ecommerce: "work.ecommerce",
  saas: "work.saas",
  uiux: "work.uiux",
};

function SectionHead({
  label,
  title,
  body,
  action,
  solo = false,
}: {
  label: string;
  title: string;
  body?: string;
  action?: ReactNode;
  solo?: boolean;
}) {
  return (
    <div className="concept-section-block">
      <ConceptLabel>{label}</ConceptLabel>
      <div className={cn("concept-section-head", solo && "is-solo")}>
        <h2 className="concept-section-title">{title}</h2>
        {body || action ? (
          <div className="concept-section-head-side">
            {body ? <p>{body}</p> : null}
            {action}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ConceptAbout({ settings }: { settings: SiteSettings }) {
  const { lang, t } = useI18n();
  const copy = conceptCopy[lang];

  return (
    <section id="about" className="concept-section concept-about">
      <div className="concept-container">
        <Reveal>
          <ConceptLabel>{copy.about.label}</ConceptLabel>
        </Reveal>

        <div className="concept-about-grid">
          <Reveal className="concept-about-copy">
            <h2 className="concept-about-title">
              <span>{copy.about.title}</span>
              <span className="concept-about-highlight">{copy.about.highlight}</span>
            </h2>

            <p className="concept-about-body">{copy.about.body}</p>

            <ul className="concept-principles">
              {copy.about.principles.map((principle, index) => (
                <li key={principle} className="concept-principle">
                  <span className="concept-principle-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="concept-principle-text">{principle}</span>
                </li>
              ))}
            </ul>

            <div className="concept-about-signature">
              <span className="concept-signature-line" aria-hidden="true" />
              <span>{copy.about.signature}</span>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="concept-about-aside">
            <div className="concept-portrait">
              <Image
                src="/portrait.webp"
                alt={t("hero.portraitAlt")}
                fill
                sizes="(max-width: 900px) 92vw, (max-width: 1280px) 34vw, 430px"
                className="concept-portrait-img"
              />
              <span className="concept-portrait-wash" aria-hidden="true" />
              <span className="concept-portrait-tag">
                {settings.nameEn} / {lang === "ar" ? "بورتريه" : "PORTRAIT"} · 2026
              </span>
            </div>

            <div className="concept-stats">
              {copy.about.stats.map((stat) => (
                <div key={stat.label} className="concept-stat">
                  <span className="concept-stat-value">{stat.value}</span>
                  <span className="concept-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  project,
  index,
  viewLabel,
}: {
  project: Project;
  index: number;
  viewLabel: string;
}) {
  const { t, locale } = useI18n();
  const title = locale(project.titleAr, project.titleEn);
  const description = locale(project.descriptionAr, project.descriptionEn);
  const year = new Date(project.createdAt).getFullYear();

  return (
    <Reveal className="concept-work-item" delay={Math.min(index * 0.06, 0.24)}>
      <Link
        href={`/projects/${project.slug}`}
        className="concept-work-card"
        aria-label={`${viewLabel}: ${title}`}
      >
        <div className="concept-work-art">
          <ConceptProjectVisual project={project} title={title} />
          <span className="concept-work-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="concept-work-category">{t(categoryKeys[project.category])}</span>
          <span className="concept-work-hover">
            <span className="concept-work-hover-label">{viewLabel}</span>
            <span className="concept-work-arrow">
              <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </span>
        </div>

        <div className="concept-work-body">
          <div className="concept-work-copy">
            <h3 className="concept-work-title">{title}</h3>
            <p className="concept-work-desc">{description}</p>
          </div>
          <div className="concept-work-meta">
            <span>{Number.isNaN(year) ? "—" : year}</span>
            <span>{project.tech.slice(0, 2).join(" / ")}</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function ConceptWork({ projects }: { projects: Project[] }) {
  const { lang } = useI18n();
  const copy = conceptCopy[lang];

  const selected = useMemo(() => {
    const featured = projects.filter((project) => project.featured);
    const rest = projects.filter((project) => !project.featured);
    return [...featured, ...rest].slice(0, 4);
  }, [projects]);

  if (selected.length === 0) return null;

  return (
    <section id="work" className="concept-section concept-work">
      <div className="concept-container">
        <Reveal>
          <SectionHead
            label={copy.work.label}
            title={copy.work.title}
            body={copy.work.body}
            action={
              <Link href="/work" className="concept-text-link">
                {copy.work.all}
                <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            }
          />
        </Reveal>

        <div className="concept-work-grid">
          {selected.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} viewLabel={copy.work.view} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConceptServices({ services }: { services: Service[] }) {
  const { lang, locale } = useI18n();
  const copy = conceptCopy[lang];

  if (services.length === 0) return null;

  return (
    <section id="services" className="concept-section concept-services">
      <div className="concept-container">
        <Reveal>
          <SectionHead
            label={copy.services.label}
            title={copy.services.title}
            body={copy.services.body}
            action={
              <Link href="/services" className="concept-text-link">
                {copy.services.all}
                <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            }
          />
        </Reveal>

        <Reveal>
          <div className="concept-service-list">
            {services.map((service, index) => (
              <Link key={service.id} href="/services" className="concept-service-row">
                <span className="concept-service-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="concept-service-title">
                  {locale(service.titleAr, service.titleEn)}
                </span>
                <span className="concept-service-desc">
                  {locale(service.descriptionAr, service.descriptionEn)}
                </span>
                <span className="concept-service-arrow">
                  <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ConceptProcess() {
  const { lang } = useI18n();
  const copy = conceptCopy[lang];

  return (
    <section id="process" className="concept-section concept-process-section">
      <div className="concept-container">
        <Reveal>
          <SectionHead label={copy.process.label} title={copy.process.title} solo />
        </Reveal>

        <Reveal>
          <ol className="concept-process">
            {copy.process.steps.map((step, index) => (
              <li key={step.title} className="concept-process-step">
                <span className="concept-process-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="concept-process-star" aria-hidden="true">
                  ✳
                </span>
                <h3 className="concept-process-title">{step.title}</h3>
                <p className="concept-process-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

export function ConceptQuote() {
  const { lang } = useI18n();
  const copy = conceptCopy[lang];

  return (
    <section className="concept-quote" aria-label={copy.quote.by}>
      <div className="concept-container">
        <Reveal className="concept-quote-inner">
          <span className="concept-quote-mark" aria-hidden="true">
            “
          </span>
          <div>
            <blockquote className="concept-quote-text">{copy.quote.text}</blockquote>
            <p className="concept-quote-by">
              <span aria-hidden="true">—</span> {copy.quote.by}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function whatsappHref(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

export function ConceptContact({ settings }: { settings: SiteSettings }) {
  const { lang } = useI18n();
  const copy = conceptCopy[lang];

  const socials = [
    { label: "GitHub", href: settings.github },
    { label: "LinkedIn", href: settings.linkedin },
    { label: "X", href: settings.x },
    { label: "Telegram", href: settings.telegram },
    { label: "WhatsApp", href: whatsappHref(settings.whatsapp) },
  ].filter((social): social is { label: string; href: string } => Boolean(social.href));

  return (
    <section id="contact" className="concept-contact">
      <div className="concept-contact-dots" aria-hidden="true" />
      <div className="concept-container">
        <Reveal>
          <ConceptLabel>{copy.contact.label}</ConceptLabel>
        </Reveal>

        <div className="concept-contact-grid">
          <Reveal className="concept-contact-copy">
            <h2 className="concept-contact-title">{copy.contact.title}</h2>
            <p className="concept-contact-body">{copy.contact.body}</p>

            <div className="concept-contact-status">
              <span className="concept-dot" aria-hidden="true" />
              <span>{copy.announcement}</span>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="concept-contact-actions">
            <ConceptOrb
              href={`mailto:${settings.email}`}
              label={`${copy.contact.email}: ${settings.email}`}
              text="LET'S TALK · OPEN FOR PROJECTS · LET'S TALK · OPEN FOR PROJECTS · "
            />

            <div className="concept-contact-email-block">
              <span className="concept-contact-email-label">{copy.contact.email}</span>
              <a href={`mailto:${settings.email}`} className="concept-contact-email">
                {settings.email}
              </a>
            </div>

            {socials.length > 0 ? (
              <div className="concept-socials-wrap">
                <span className="concept-socials-label">{copy.contact.social}</span>
                <div className="concept-socials">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="concept-social"
                    >
                      {social.label}
                      <ArrowUpRight size={11} strokeWidth={1.7} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ConceptFooter() {
  const { lang } = useI18n();
  const copy = conceptCopy[lang];

  const links = [
    { href: "#work", label: copy.nav.work },
    { href: "#services", label: copy.nav.services },
    { href: "#about", label: copy.nav.about },
    { href: "#contact", label: copy.nav.contact },
  ];

  return (
    <footer className="concept-footer">
      <div className="concept-container">
        <div className="concept-footer-top">
          <div className="concept-footer-brand">
            <span className="concept-footer-mark">AJ</span>
            <span>{copy.edition}</span>
          </div>

          <nav
            className="concept-footer-nav"
            aria-label={lang === "ar" ? "روابط الموقع" : "Site links"}
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} className="concept-footer-link">
                {link.label}
              </a>
            ))}
            <a href="#top" className="concept-footer-link concept-footer-top-link">
              {copy.footer.top}
              <ArrowUp size={11} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </nav>
        </div>

        <div className="concept-footer-word" aria-hidden="true">
          ABU JASEM
        </div>

        <div className="concept-footer-bottom">
          <span>{copy.footer.rights}</span>
          <span>{copy.footer.built}</span>
          <a href="#top" className="concept-footer-back">
            {copy.footer.top}
            <ArrowUp size={12} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
