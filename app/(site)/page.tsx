import type { Metadata } from "next";

import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { HomeCta } from "@/components/home/home-cta";
import { HomeMetadata } from "@/components/home/home-metadata";
import { getProjects, getSiteSettings } from "@/lib/data/queries";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  description: siteConfig.descriptionAr,
  alternates: { canonical: "/" },
};

// Keep the static shell fast while still picking up database edits even if a
// deploy happened before the initial content was seeded.
export const revalidate = 60;

export default async function HomePage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.nameEn,
    alternateName: settings.nameAr,
    jobTitle: settings.titleEn,
    email: `mailto:${settings.email}`,
    url: siteConfig.url,
    sameAs: [settings.github, settings.linkedin, settings.x, settings.telegram].filter(Boolean),
    knowsAbout: ["Web Development", "UI/UX Design", "Next.js", "React", "TypeScript"],
  };

  return (
    <>
      <HomeMetadata />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <FeaturedWork projects={projects} />
      <HomeCta />
    </>
  );
}
