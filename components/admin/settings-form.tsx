"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/form";
import { saveSettings } from "@/lib/actions/admin";
import type { SiteSettings } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";
import { settingsSchema } from "@/lib/validations";

import { AdminPageHeader } from "./page-header";

type FormValues = z.infer<typeof settingsSchema>;

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const { t } = useI18n();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    const result = await saveSettings(values);
    if (!result.ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
    router.refresh();
  };

  return (
    <div>
      <AdminPageHeader titleKey="admin.settings" subtitleKey="admin.overview" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <section className="card p-5 sm:p-6">
          <h2 className="mb-5 text-sm font-bold text-white">{t("admin.settingsPersonal")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="nameAr">{t("admin.settingsNameAr")}</Label>
              <Input id="nameAr" {...register("nameAr")} />
              <FieldError>{errors.nameAr?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="nameEn">{t("admin.settingsNameEn")}</Label>
              <Input id="nameEn" dir="ltr" {...register("nameEn")} />
              <FieldError>{errors.nameEn?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="titleAr">{t("admin.settingsTitleAr")}</Label>
              <Input id="titleAr" {...register("titleAr")} />
              <FieldError>{errors.titleAr?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="titleEn">{t("admin.settingsTitleEn")}</Label>
              <Input id="titleEn" dir="ltr" {...register("titleEn")} />
              <FieldError>{errors.titleEn?.message}</FieldError>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="bioAr">{t("admin.settingsBioAr")}</Label>
              <Textarea id="bioAr" rows={4} {...register("bioAr")} />
              <FieldError>{errors.bioAr?.message}</FieldError>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="bioEn">{t("admin.settingsBioEn")}</Label>
              <Textarea id="bioEn" rows={4} dir="ltr" {...register("bioEn")} />
              <FieldError>{errors.bioEn?.message}</FieldError>
            </div>
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="mb-5 text-sm font-bold text-white">{t("admin.settingsContact")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">{t("admin.settingsEmail")}</Label>
              <Input id="email" type="email" dir="ltr" {...register("email")} />
              <FieldError>{errors.email?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="whatsapp">{t("admin.settingsWhatsapp")}</Label>
              <Input id="whatsapp" dir="ltr" placeholder="970..." {...register("whatsapp")} />
              <FieldError>{errors.whatsapp?.message}</FieldError>
            </div>
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="mb-5 text-sm font-bold text-white">{t("admin.settingsSocial")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="github">{t("admin.settingsGithub")}</Label>
              <Input
                id="github"
                type="url"
                dir="ltr"
                placeholder="https://github.com/..."
                {...register("github")}
              />
              <FieldError>{errors.github?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="linkedin">{t("admin.settingsLinkedin")}</Label>
              <Input
                id="linkedin"
                type="url"
                dir="ltr"
                placeholder="https://linkedin.com/in/..."
                {...register("linkedin")}
              />
              <FieldError>{errors.linkedin?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="x">{t("admin.settingsX")}</Label>
              <Input
                id="x"
                type="url"
                dir="ltr"
                placeholder="https://x.com/..."
                {...register("x")}
              />
              <FieldError>{errors.x?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="telegram">{t("admin.settingsTelegram")}</Label>
              <Input
                id="telegram"
                type="url"
                dir="ltr"
                placeholder="https://t.me/..."
                {...register("telegram")}
              />
              <FieldError>{errors.telegram?.message}</FieldError>
            </div>
          </div>
        </section>

        {status === "success" ? (
          <div
            role="status"
            className="flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
          >
            <Check className="h-4 w-4" />
            {t("admin.saved")}
          </div>
        ) : null}
        {status === "error" ? (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
          >
            <AlertCircle className="h-4 w-4" />
            {t("admin.error")}
          </div>
        ) : null}

        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? t("admin.saving") : t("admin.save")}
          <Save className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
