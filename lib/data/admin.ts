import type { SupabaseClient } from "@supabase/supabase-js";

import { demoSettings } from "./demo";
import type {
  AdminStats,
  ContactMessage,
  Order,
  OrderStatus,
  Project,
  ProjectCategory,
  Service,
  SiteSettings,
} from "./types";

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

export function mapProjectRow(row: ProjectRow): Project {
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

export function mapServiceRow(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    titleAr: row.title_ar,
    titleEn: row.title_en,
    descriptionAr: row.description_ar,
    descriptionEn: row.description_en,
    icon: row.icon,
    price: Number(row.price),
    active: row.active,
    sortOrder: row.sort_order,
  };
}

export function mapSettingsRow(row: SettingsRow): SiteSettings {
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

export async function getAdminProjects(supabase: SupabaseClient): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getAdminProjects:", error.message);
    return [];
  }
  return ((data ?? []) as ProjectRow[]).map(mapProjectRow);
}

export async function getAdminProjectById(
  supabase: SupabaseClient,
  id: string,
): Promise<Project | null> {
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return mapProjectRow(data as ProjectRow);
}

export async function getAdminServices(supabase: SupabaseClient): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getAdminServices:", error.message);
    return [];
  }
  return ((data ?? []) as ServiceRow[]).map(mapServiceRow);
}

export async function getAdminMessages(
  supabase: SupabaseClient,
  limit = 50,
): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, subject, message, read, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
  }));
}

export async function getAdminOrders(supabase: SupabaseClient, limit = 50): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, service_id, service_title, customer_name, customer_email, notes, amount, currency, status, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    serviceId: row.service_id,
    serviceTitle: row.service_title,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    notes: row.notes,
    amount: Number(row.amount),
    currency: row.currency,
    status: row.status as OrderStatus,
    createdAt: row.created_at,
  }));
}

export async function getAdminStats(supabase: SupabaseClient): Promise<AdminStats> {
  const [projects, published, messages, orders, payments] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("published", true),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("read", false),
    supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("payments").select("amount").eq("status", "paid"),
  ]);

  const paidRevenue = (payments.data ?? []).reduce(
    (total, row) => total + Number(row.amount ?? 0),
    0,
  );

  return {
    projects: projects.count ?? 0,
    published: published.count ?? 0,
    unreadMessages: messages.count ?? 0,
    pendingOrders: orders.count ?? 0,
    paidRevenue,
  };
}

export async function getAdminSettings(supabase: SupabaseClient): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return demoSettings;
  return mapSettingsRow(data as SettingsRow);
}
