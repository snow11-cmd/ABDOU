"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { settingsSchema } from "@/lib/validations";

import type { ActionResult } from "./projects";

export async function setMessageRead(id: string, read: boolean): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("contact_messages").update({ read }).eq("id", id);
  if (error) return { ok: false, error: "update_failed" };
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  return { ok: true };
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) return { ok: false, error: "delete_failed" };
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  return { ok: true };
}

export async function updateOrderStatus(id: string, status: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  if (!["pending", "paid", "cancelled", "failed"].includes(status)) {
    return { ok: false, error: "invalid_status" };
  }
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) return { ok: false, error: "update_failed" };
  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  return { ok: true };
}

export async function saveSettings(input: unknown): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const parsed = settingsSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "validation" };

  const data = parsed.data;
  const { error } = await supabase.from("site_settings").upsert({
    id: 1,
    name_ar: data.nameAr,
    name_en: data.nameEn,
    title_ar: data.titleAr,
    title_en: data.titleEn,
    bio_ar: data.bioAr,
    bio_en: data.bioEn,
    email: data.email,
    whatsapp: data.whatsapp,
    github: data.github,
    linkedin: data.linkedin,
    x: data.x,
    telegram: data.telegram,
  });

  if (error) return { ok: false, error: "save_failed" };
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { ok: true };
}
