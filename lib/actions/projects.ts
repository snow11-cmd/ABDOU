"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { projectSchema } from "@/lib/validations";

export type ActionResult = {
  ok: boolean;
  error?: string;
  id?: string;
};

function revalidateProject(slug?: string) {
  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/projects/${slug}`);
}

export async function saveProject(input: unknown): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "validation" };
  }

  const data = parsed.data;
  const tech = (data.tech ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);

  const payload = {
    slug: slugify(data.slug),
    title_ar: data.titleAr,
    title_en: data.titleEn,
    description_ar: data.descriptionAr,
    description_en: data.descriptionEn,
    long_description_ar: data.longDescriptionAr || null,
    long_description_en: data.longDescriptionEn || null,
    category: data.category,
    tech,
    image_url: data.imageUrl || null,
    demo_url: data.demoUrl || null,
    repo_url: data.repoUrl || null,
    featured: data.featured,
    published: data.published,
    sort_order: data.sortOrder,
  };

  if (data.id) {
    const { error } = await supabase.from("projects").update(payload).eq("id", data.id);
    if (error) {
      console.error("saveProject update:", error.message);
      return { ok: false, error: "save_failed" };
    }
    revalidateProject(payload.slug);
    return { ok: true, id: data.id };
  }

  const { data: created, error } = await supabase
    .from("projects")
    .insert(payload)
    .select("id")
    .single();

  if (error || !created) {
    console.error("saveProject insert:", error?.message);
    return { ok: false, error: "save_failed" };
  }

  revalidateProject(payload.slug);
  return { ok: true, id: created.id };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  if (!id) return { ok: false, error: "invalid_id" };
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { ok: false, error: "delete_failed" };
  revalidateProject();
  return { ok: true };
}

export async function setProjectPublished(id: string, published: boolean): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("projects").update({ published }).eq("id", id);
  if (error) return { ok: false, error: "update_failed" };
  revalidateProject();
  return { ok: true };
}

export async function uploadProjectCover(
  formData: FormData,
): Promise<{ ok: boolean; url?: string; error?: string }> {
  const { supabase } = await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "no_file" };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { ok: false, error: "too_large" };
  }
  const extensions: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/avif": "avif",
  };
  const ext = extensions[file.type];
  if (!ext) {
    return { ok: false, error: "invalid_type" };
  }

  const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("project-covers").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) {
    console.error("uploadProjectCover:", error.message);
    return { ok: false, error: "upload_failed" };
  }
  const { data } = supabase.storage.from("project-covers").getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}
