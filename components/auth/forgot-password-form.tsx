"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, MailCheck, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/form";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/utils";
import { resetRequestSchema } from "@/lib/validations";

import { AuthShell, SetupRequiredNotice } from "./auth-shell";

type FormValues = z.infer<typeof resetRequestSchema>;

export function ForgotPasswordForm() {
  const { t } = useI18n();
  const configured = isSupabaseConfigured();
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(resetRequestSchema),
    defaultValues: { email: "" },
  });

  const translate = (message?: string) =>
    message && (message.startsWith("contact.") || message.startsWith("auth."))
      ? t(message as DictKey)
      : message;

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      if (error) {
        setServerError(t("auth.genericError"));
        return;
      }
      setSent(true);
    } catch {
      setServerError(t("auth.genericError"));
    }
  };

  return (
    <AuthShell
      title={t("auth.resetTitle")}
      subtitle={t("auth.resetDesc")}
      footer={
        <Link href="/login" className="auth-link">
          {t("auth.backToLogin")}
        </Link>
      }
    >
      {!configured ? (
        <SetupRequiredNotice />
      ) : sent ? (
        <div className="rounded-2xl border border-emerald-600/25 bg-emerald-500/10 p-5 text-sm text-emerald-900 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-200">
          <div className="flex items-center gap-2 font-semibold">
            <MailCheck className="h-4 w-4" />
            {t("auth.resetSent")}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input
              id="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            <FieldError>{translate(errors.email?.message)}</FieldError>
          </div>

          {serverError ? (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-rose-600/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-900 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {serverError}
            </div>
          ) : null}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? t("auth.loading") : t("auth.sendReset")}
            <Send className="h-4 w-4" />
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
