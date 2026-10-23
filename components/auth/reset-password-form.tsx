"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, KeyRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/form";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/utils";
import { updatePasswordSchema } from "@/lib/validations";

import { AuthShell, SetupRequiredNotice } from "./auth-shell";

type FormValues = z.infer<typeof updatePasswordSchema>;

export function ResetPasswordForm() {
  const { t } = useI18n();
  const configured = isSupabaseConfigured();
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!configured) return;
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => setHasSession(Boolean(data.session)));
  }, [configured]);

  const translate = (message?: string) =>
    message && (message.startsWith("contact.") || message.startsWith("auth."))
      ? t(message as DictKey)
      : message;

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password: values.password });
      if (error) {
        setStatus("error");
        return;
      }
      setStatus("success");
      await supabase.auth.signOut();
    } catch {
      setStatus("error");
    }
  };

  return (
    <AuthShell
      title={t("auth.resetTitle")}
      subtitle={t("auth.resetDesc")}
      footer={
        <Link href="/login" className="font-semibold text-[#9db8ff] hover:text-white">
          {t("auth.backToLogin")}
        </Link>
      }
    >
      {!configured ? (
        <SetupRequiredNotice />
      ) : hasSession === null ? (
        <div className="skeleton h-32 rounded-2xl" />
      ) : !hasSession ? (
        <div className="space-y-4 rounded-2xl border border-amber-400/25 bg-amber-400/[0.07] p-5 text-sm text-amber-100/80">
          <p>{t("auth.resetLinkInvalid")}</p>
          <Link
            href="/forgot-password"
            className="inline-flex font-semibold text-[#9db8ff] hover:text-white"
          >
            {t("auth.sendReset")}
          </Link>
        </div>
      ) : status === "success" ? (
        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-5 text-sm text-emerald-200">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="h-4 w-4" />
            {t("auth.passwordUpdated")}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <Label htmlFor="password">{t("auth.newPassword")}</Label>
            <Input
              id="password"
              type="password"
              dir="ltr"
              autoComplete="new-password"
              placeholder="••••••••"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
            <FieldError>{translate(errors.password?.message)}</FieldError>
          </div>
          <div>
            <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              dir="ltr"
              autoComplete="new-password"
              placeholder="••••••••"
              aria-invalid={Boolean(errors.confirmPassword)}
              {...register("confirmPassword")}
            />
            <FieldError>{translate(errors.confirmPassword?.message)}</FieldError>
          </div>

          {status === "error" ? (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {t("auth.genericError")}
            </div>
          ) : null}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? t("auth.loading") : t("auth.updatePassword")}
            <KeyRound className="h-4 w-4" />
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
