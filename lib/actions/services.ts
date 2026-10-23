"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { serviceSchema } from "@/lib/validations";

import type { ActionResult } from "./projects";

export async function saveService(input: unknown): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const parsed = serviceSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "validation" };

  const data = parsed.data;
  const payload = {
    slug: slugify(data.slug),
    title_ar: data.titleAr,
    title_en: data.titleEn,
    description_ar: data.descriptionAr,
    description_en: data.descriptionEn,
    icon: data.icon,
    price: data.price,
    active: data.active,
    sort_order: data.sortOrder,
  };

  if (data.id) {
    const { error } = await supabase.from("services").update(payload).eq("id", data.id);
    if (error) return { ok: false, error: "save_failed" };
  } else {
    const { error } = await supabase.from("services").insert(payload);
    if (error) return { ok: false, error: "save_failed" };
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  return { ok: true };
}

export async function deleteService(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) return { ok: false, error: "delete_failed" };
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { ok: true };
}

export async function setServiceActive(id: string, active: boolean): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("services").update({ active }).eq("id", id);
  if (error) return { ok: false, error: "update_failed" };
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { ok: true };
}
