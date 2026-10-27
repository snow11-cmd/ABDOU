"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ImagePlus, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/form";
import { saveProject, uploadProjectCover } from "@/lib/actions/projects";
import type { Project } from "@/lib/data/types";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { projectSchema } from "@/lib/validations";

type FormValues = z.infer<typeof projectSchema>;

export function ProjectForm({ project }: { project?: Project }) {
  const { t } = useI18n();
  const router = useRouter();
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      id: project?.id,
      slug: project?.slug ?? "",
      titleAr: project?.titleAr ?? "",
      titleEn: project?.titleEn ?? "",
      descriptionAr: project?.descriptionAr ?? "",
      descriptionEn: project?.descriptionEn ?? "",
      longDescriptionAr: project?.longDescriptionAr ?? "",
      longDescriptionEn: project?.longDescriptionEn ?? "",
      category: project?.category ?? "web",
      tech: project?.tech.join(", ") ?? "",
      imageUrl: project?.imageUrl ?? "",
      demoUrl: project?.demoUrl ?? "",
      repoUrl: project?.repoUrl ?? "",
      featured: project?.featured ?? false,
      published: project?.published ?? true,
      sortOrder: project?.sortOrder ?? 0,
    },
  });

  const translate = (message?: string) =>
    message && (message.startsWith("contact.") || message.startsWith("auth."))
      ? t(message as DictKey)
      : message;

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    let imageUrl = values.imageUrl ?? "";

    const file = coverFile;
    if (file && file.size > 0) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const upload = await uploadProjectCover(formData);
      setUploading(false);
      if (!upload.ok || !upload.url) {
        setServerError(t("admin.error"));
        return;
      }
      imageUrl = upload.url;
    }

    const result = await saveProject({ ...values, imageUrl });
    if (!result.ok) {
      setServerError(t("admin.error"));
      return;
    }
    router.push("/admin/projects");
    router.refresh();
  };

  const busy = isSubmitting || uploading;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-5 xl:grid-cols-[1.4fr_0.6fr]"
    >
      <div className="space-y-5">
        <section className="card p-5 sm:p-6">
          <h2 className="mb-5 text-sm font-bold text-white">{t("admin.projectTitle")}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="titleAr">{t("admin.titleAr")}</Label>
              <Input id="titleAr" aria-invalid={Boolean(errors.titleAr)} {...register("titleAr")} />
              <FieldError>{translate(errors.titleAr?.message)}</FieldError>
            </div>
            <div>
              <Label htmlFor="titleEn">{t("admin.titleEn")}</Label>
              <Input
                id="titleEn"
                dir="ltr"
                aria-invalid={Boolean(errors.titleEn)}
                {...register("titleEn")}
              />
              <FieldError>{translate(errors.titleEn?.message)}</FieldError>
            </div>
          </div>
          <div className="mt-5">
            <Label htmlFor="slug">{t("admin.projectSlug")}</Label>
            <Input
              id="slug"
              dir="ltr"
              placeholder="my-project-slug"
              aria-invalid={Boolean(errors.slug)}
              {...register("slug")}
            />
            <FieldError>{translate(errors.slug?.message)}</FieldError>
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="mb-5 text-sm font-bold text-white">{t("admin.projectDescription")}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="descriptionAr">{t("admin.descAr")}</Label>
              <Textarea id="descriptionAr" rows={4} {...register("descriptionAr")} />
              <FieldError>{translate(errors.descriptionAr?.message)}</FieldError>
            </div>
            <div>
              <Label htmlFor="descriptionEn">{t("admin.descEn")}</Label>
              <Textarea id="descriptionEn" rows={4} dir="ltr" {...register("descriptionEn")} />
              <FieldError>{translate(errors.descriptionEn?.message)}</FieldError>
            </div>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="longDescriptionAr">{t("admin.overviewAr")}</Label>
              <Textarea id="longDescriptionAr" rows={5} {...register("longDescriptionAr")} />
            </div>
            <div>
              <Label htmlFor="longDescriptionEn">{t("admin.overviewEn")}</Label>
              <Textarea
                id="longDescriptionEn"
                rows={5}
                dir="ltr"
                {...register("longDescriptionEn")}
              />
            </div>
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="mb-5 text-sm font-bold text-white">{t("work.stack")}</h2>
          <div>
            <Label htmlFor="tech">{t("admin.projectTech")}</Label>
            <Input
              id="tech"
              dir="ltr"
              placeholder="Next.js, TypeScript, Tailwind CSS"
              {...register("tech")}
            />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="demoUrl">{t("admin.projectDemo")}</Label>
              <Input
                id="demoUrl"
                type="url"
                dir="ltr"
                placeholder="https://"
                {...register("demoUrl")}
              />
              <FieldError>{translate(errors.demoUrl?.message)}</FieldError>
            </div>
            <div>
              <Label htmlFor="repoUrl">{t("admin.projectRepo")}</Label>
              <Input
                id="repoUrl"
                type="url"
                dir="ltr"
                placeholder="https://github.com/..."
                {...register("repoUrl")}
              />
              <FieldError>{translate(errors.repoUrl?.message)}</FieldError>
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-5">
        <section className="card p-5">
          <h2 className="mb-4 text-sm font-bold text-white">{t("admin.status")}</h2>
          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
            <span className="text-xs text-[#eef1f7]">{t("admin.projectPublished")}</span>
            <input
              type="checkbox"
              className="h-4 w-4 accent-[#c6a15b]"
              {...register("published")}
            />
          </label>
          <label className="mt-2 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
            <span className="text-xs text-[#eef1f7]">{t("admin.projectFeatured")}</span>
            <input type="checkbox" className="h-4 w-4 accent-[#f59e0b]" {...register("featured")} />
          </label>

          <div className="mt-4">
            <Label htmlFor="category">{t("admin.projectCategory")}</Label>
            <Select id="category" {...register("category")}>
              <option value="web">{t("work.web")}</option>
              <option value="ecommerce">{t("work.ecommerce")}</option>
              <option value="saas">{t("work.saas")}</option>
              <option value="uiux">{t("work.uiux")}</option>
            </Select>
          </div>
          <div className="mt-4">
            <Label htmlFor="sortOrder">{t("admin.sortOrder")}</Label>
            <Input
              id="sortOrder"
              type="number"
              min={0}
              {...register("sortOrder", { valueAsNumber: true })}
            />
          </div>
        </section>

        <section className="card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
            <ImagePlus className="h-4 w-4 text-[#d9b877]" />
            {t("admin.projectImage")}
          </h2>
          <Label htmlFor="imageUrl">URL</Label>
          <Input
            id="imageUrl"
            type="url"
            dir="ltr"
            placeholder="https://..."
            {...register("imageUrl")}
          />
          <FieldError>{translate(errors.imageUrl?.message)}</FieldError>

          <div className="my-4 flex items-center gap-3 text-[10px] tracking-wider text-[#b9c3d6] uppercase">
            <span className="h-px flex-1 bg-white/[0.07]" />
            {t("admin.or")}
            <span className="h-px flex-1 bg-white/[0.07]" />
          </div>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            onChange={(event) => setCoverFile(event.target.files?.[0] ?? null)}
            className="block w-full cursor-pointer rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-3 text-xs text-[#dbe1ec] file:me-3 file:rounded-lg file:border-0 file:bg-[#c6a15b]/15 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
          />
          <p className="mt-2 text-[10px] leading-relaxed text-[#b9c3d6]">{t("admin.imageHelp")}</p>
        </section>

        {serverError ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {serverError}
          </div>
        ) : null}

        <div className="flex gap-2">
          <Button type="submit" disabled={busy} className="flex-1">
            {busy ? t("admin.saving") : t("admin.save")}
            <Save className="h-4 w-4" />
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/admin/projects")}>
            {t("admin.cancel")}
          </Button>
        </div>
      </div>
    </form>
  );
}
