"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, MailCheck, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/form";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/utils";
import { signUpSchema } from "@/lib/validations";

import { AuthShell, SetupRequiredNotice } from "./auth-shell";

type FormValues = z.infer<typeof signUpSchema>;

export function SignupForm() {
  const { t } = useI18n();
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const translate = (message?: string) =>
    message && (message.startsWith("contact.") || message.startsWith("auth."))
      ? t(message as DictKey)
      : message;

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { full_name: values.fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
        },
      });
      if (error) {
        setServerError(
          /already registered|already exists/i.test(error.message)
            ? t("auth.emailExists")
            : t("auth.genericError"),
        );
        return;
      }
      if (data.session) {
        router.push("/admin");
        router.refresh();
      } else {
        setSent(true);
      }
    } catch {
      setServerError(t("auth.genericError"));
    }
  };

  return (
    <AuthShell
      title={t("auth.signupTitle")}
      subtitle={t("auth.signupSubtitle")}
      footer={
        <>
          {t("auth.hasAccount")}{" "}
          <Link href="/login" className="auth-link">
            {t("auth.signInNow")}
          </Link>
        </>
      }
    >
      {!configured ? (
        <SetupRequiredNotice />
      ) : sent ? (
        <div className="rounded-2xl border border-emerald-600/25 bg-emerald-500/10 p-5 text-sm text-emerald-900 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-200">
          <div className="flex items-center gap-2 font-semibold">
            <MailCheck className="h-4 w-4" />
            {t("auth.checkEmail")}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <Label htmlFor="fullName">{t("auth.fullName")}</Label>
            <Input
              id="fullName"
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName")}
            />
            <FieldError>{translate(errors.fullName?.message)}</FieldError>
          </div>
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
          <div>
            <Label htmlFor="password">{t("auth.password")}</Label>
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
            {isSubmitting ? t("auth.loading") : t("auth.signUp")}
            <UserPlus className="h-4 w-4" />
          </Button>
          <p className="text-center text-[11px] leading-relaxed text-[var(--muted-foreground)]">
            {t("admin.authorizationNote")}
          </p>
        </form>
      )}
    </AuthShell>
  );
}
