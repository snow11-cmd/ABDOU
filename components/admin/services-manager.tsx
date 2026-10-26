"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Edit3, Eye, EyeOff, Plus, Power, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/form";
import { deleteService, saveService, setServiceActive } from "@/lib/actions/services";
import type { Service } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";
import { formatMoney } from "@/lib/utils";
import { serviceSchema } from "@/lib/validations";

import { AdminPageHeader } from "./page-header";

type FormValues = z.infer<typeof serviceSchema>;

const iconOptions = [
  "Code2",
  "LayoutTemplate",
  "Server",
  "PenTool",
  "ShoppingCart",
  "Sparkles",
  "Layers",
];

export function ServicesManager({ services }: { services: Service[] }) {
  const { t, lang, locale } = useI18n();
  const router = useRouter();
  const [editing, setEditing] = useState<Service | "new" | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      slug: "",
      titleAr: "",
      titleEn: "",
      descriptionAr: "",
      descriptionEn: "",
      icon: "Code2",
      price: 0,
      active: true,
      sortOrder: services.length + 1,
    },
  });

  const openCreate = () => {
    setEditing("new");
    setError(null);
    reset({
      slug: "",
      titleAr: "",
      titleEn: "",
      descriptionAr: "",
      descriptionEn: "",
      icon: "Code2",
      price: 0,
      active: true,
      sortOrder: services.length + 1,
    });
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    setError(null);
    reset({
      id: service.id,
      slug: service.slug,
      titleAr: service.titleAr,
      titleEn: service.titleEn,
      descriptionAr: service.descriptionAr,
      descriptionEn: service.descriptionEn,
      icon: service.icon,
      price: service.price,
      active: service.active,
      sortOrder: service.sortOrder,
    });
  };

  const onSubmit = async (values: FormValues) => {
    setError(null);
    const result = await saveService(values);
    if (!result.ok) {
      setError(t("admin.error"));
      return;
    }
    setEditing(null);
    router.refresh();
  };

  const remove = async (service: Service) => {
    if (!window.confirm(t("admin.confirmDeleteService"))) return;
    setBusyId(service.id);
    const result = await deleteService(service.id);
    if (!result.ok) setError(t("admin.error"));
    setBusyId(null);
    router.refresh();
  };

  const toggle = async (service: Service) => {
    setBusyId(service.id);
    const result = await setServiceActive(service.id, !service.active);
    if (!result.ok) setError(t("admin.error"));
    setBusyId(null);
    router.refresh();
  };

  return (
    <div>
      <AdminPageHeader titleKey="admin.services" subtitleKey="admin.overview">
        <Button size="sm" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          {t("admin.addService")}
        </Button>
      </AdminPageHeader>

      {error ? (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
        >
          {error}
        </div>
      ) : null}

      {editing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="card mb-6 p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">
              {editing === "new" ? t("admin.addService") : t("admin.editService")}
            </h2>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-[#eaeef5] hover:text-white"
              aria-label={t("admin.cancel")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="titleAr">{t("admin.titleAr")}</Label>
              <Input id="titleAr" {...register("titleAr")} />
              <FieldError>{errors.titleAr?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="titleEn">{t("admin.titleEn")}</Label>
              <Input id="titleEn" dir="ltr" {...register("titleEn")} />
              <FieldError>{errors.titleEn?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="slug">{t("admin.projectSlug")}</Label>
              <Input id="slug" dir="ltr" placeholder="service-slug" {...register("slug")} />
              <FieldError>{errors.slug?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="icon">{t("admin.icon")}</Label>
              <Select id="icon" {...register("icon")}>
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="descriptionAr">{t("admin.descAr")}</Label>
              <Textarea id="descriptionAr" rows={3} {...register("descriptionAr")} />
              <FieldError>{errors.descriptionAr?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="descriptionEn">{t("admin.descEn")}</Label>
              <Textarea id="descriptionEn" rows={3} dir="ltr" {...register("descriptionEn")} />
              <FieldError>{errors.descriptionEn?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="price">{t("admin.price")} (USD)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={1}
                {...register("price", { valueAsNumber: true })}
              />
              <FieldError>{errors.price?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="sortOrder">{t("admin.sortOrder")}</Label>
              <Input
                id="sortOrder"
                type="number"
                min={0}
                {...register("sortOrder", { valueAsNumber: true })}
              />
            </div>
          </div>

          <label className="mt-4 flex cursor-pointer items-center gap-2 text-xs text-[#eef1f7]">
            <input type="checkbox" className="h-4 w-4 accent-[#4f7cff]" {...register("active")} />
            {t("admin.active")}
          </label>

          <div className="mt-5 flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("admin.saving") : t("admin.save")}
              <Check className="h-4 w-4" />
            </Button>
            <Button type="button" variant="secondary" onClick={() => setEditing(null)}>
              {t("admin.cancel")}
            </Button>
          </div>
        </form>
      ) : null}

      {services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-sm text-[#c9d2e2]">
          {t("admin.empty")}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {locale(service.titleAr, service.titleEn)}
                  </h3>
                  <p className="mt-0.5 font-mono text-[10px] text-[#b9c3d6]" dir="ltr">
                    {service.slug}
                  </p>
                </div>
                <Badge tone={service.active ? "success" : "warning"}>
                  {service.active ? t("admin.active") : t("admin.unpublish")}
                </Badge>
              </div>

              <p className="mt-3 flex-1 text-xs leading-relaxed text-[#dbe1ec]">
                {locale(service.descriptionAr, service.descriptionEn)}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="text-sm font-bold text-white">
                  {formatMoney(service.price, "USD", lang)}
                </span>
                <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[10px] text-[#d2dae8]">
                  {service.icon}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openEdit(service)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] py-2 text-[11px] font-medium text-[#eef1f7] transition hover:border-[#4f7cff]/40 hover:text-white"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  {t("admin.edit")}
                </button>
                <button
                  type="button"
                  onClick={() => toggle(service)}
                  disabled={busyId === service.id}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-[#eaeef5] transition hover:text-white disabled:opacity-50"
                  aria-label={service.active ? t("admin.unpublish") : t("admin.publish")}
                >
                  {service.active ? (
                    <Eye className="h-3.5 w-3.5" />
                  ) : (
                    <EyeOff className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => remove(service)}
                  disabled={busyId === service.id}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-[#eaeef5] transition hover:border-rose-400/40 hover:text-rose-300 disabled:opacity-50"
                  aria-label={t("admin.delete")}
                >
                  <Power className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
