import { getSupabaseServerClient } from "@/lib/supabase/server";

import { demoProjects, demoServices, demoSettings } from "./demo";
import type { Project, ProjectCategory, Service, SiteSettings } from "./types";

type ProjectRow = {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  long_description_ar: string | null;
  long_description_en: string | null;
  category: ProjectCategory;
  tech: string[] | null;
  image_url: string | null;
  demo_url: string | null;
  repo_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
};

type ServiceRow = {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon: string;
  price: number;
  active: boolean;
  sort_order: number;
};

type SettingsRow = {
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  bio_ar: string;
  bio_en: string;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  x: string;
  telegram: string;
};

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    titleAr: row.title_ar,
    titleEn: row.title_en,
    descriptionAr: row.description_ar,
    descriptionEn: row.description_en,
    longDescriptionAr: row.long_description_ar,
    longDescriptionEn: row.long_description_en,
    category: row.category,
    tech: row.tech ?? [],
    imageUrl: row.image_url,
    demoUrl: row.demo_url,
    repoUrl: row.repo_url,
    featured: row.featured,
    published: row.published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    titleAr: row.title_ar,
    titleEn: row.title_en,
    descriptionAr: row.description_ar,
    descriptionEn: row.description_en,
    icon: row.icon,
    price: row.price,
    active: row.active,
    sortOrder: row.sort_order,
  };
}

function mapSettings(row: SettingsRow): SiteSettings {
  return {
    nameAr: row.name_ar,
    nameEn: row.name_en,
    titleAr: row.title_ar,
    titleEn: row.title_en,
    bioAr: row.bio_ar,
    bioEn: row.bio_en,
    email: row.email,
    whatsapp: row.whatsapp,
    github: row.github,
    linkedin: row.linkedin,
    x: row.x,
    telegram: row.telegram,
  };
}

export async function getProjects(options?: { includeDrafts?: boolean }): Promise<Project[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return demoProjects;

  let query = supabase.from("projects").select("*").order("sort_order", { ascending: true });
  if (!options?.includeDrafts) query = query.eq("published", true);

  const { data, error } = await query;
  if (error) {
    console.error("getProjects error:", error.message);
    return demoProjects;
  }
  return ((data ?? []) as ProjectRow[]).map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return demoProjects.find((p) => p.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("getProjectBySlug error:", error.message);
    return demoProjects.find((project) => project.slug === slug) ?? null;
  }
  return data ? mapProject(data as ProjectRow) : null;
}

export async function getServices(): Promise<Service[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return demoServices;

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getServices error:", error.message);
    return demoServices;
  }
  return ((data ?? []) as ServiceRow[]).map(mapService);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return demoSettings;

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) {
    if (error) console.error("getSiteSettings error:", error.message);
    return demoSettings;
  }
  return mapSettings(data as SettingsRow);
}
