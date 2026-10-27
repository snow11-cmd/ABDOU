"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/form";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/utils";
import { signInSchema } from "@/lib/validations";

import { AuthShell, SetupRequiredNotice } from "./auth-shell";

type FormValues = z.infer<typeof signInSchema>;

const REMEMBERED_EMAIL_KEY = "aj-remembered-email";

export function LoginForm({
  nextPath,
  forceSetup = false,
  forbidden = false,
  authError = false,
}: {
  nextPath?: string;
  forceSetup?: boolean;
  forbidden?: boolean;
  authError?: boolean;
}) {
  const { t } = useI18n();
  const router = useRouter();
  const configured = isSupabaseConfigured() && !forceSetup;
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    try {
      const savedEmail = window.localStorage.getItem(REMEMBERED_EMAIL_KEY);
      if (!savedEmail) return;
      setValue("email", savedEmail);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRemember(true);
    } catch {
      // localStorage can be unavailable in restricted browsing contexts.
    }
  }, [setValue]);

  const translate = (message?: string) =>
    message && (message.startsWith("contact.") || message.startsWith("auth."))
      ? t(message as DictKey)
      : message;

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) {
        setServerError(t("auth.invalidCredentials"));
        return;
      }

      // Supabase owns the auth session. This preference only remembers the
      // email locally so the form can be prefilled next time — never the password.
      try {
        if (remember) window.localStorage.setItem(REMEMBERED_EMAIL_KEY, values.email);
        else window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      } catch {
        // Ignore storage failures; authentication already succeeded.
      }

      const target =
        nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/admin";
      router.push(target);
      router.refresh();
    } catch {
      setServerError(t("auth.genericError"));
    }
  };

  return (
    <AuthShell
      title={t("auth.loginTitle")}
      subtitle={t("auth.loginSubtitle")}
      footer={
        <>
          {t("auth.noAccount")}{" "}
          <Link href="/signup" className="auth-link">
            {t("auth.createAccount")}
          </Link>
        </>
      }
    >
      {!configured ? (
        <SetupRequiredNotice />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {forbidden || authError ? (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-amber-600/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-100"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {t(forbidden ? "auth.forbidden" : "auth.callbackError")}
            </div>
          ) : null}

          <div>
            <Label htmlFor="email">{t("auth.email")}</Label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]"
                aria-hidden="true"
              />
              <Input
                id="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                style={{ paddingLeft: "2.75rem" }}
                {...register("email")}
              />
            </div>
            <FieldError id="email-error">{translate(errors.email?.message)}</FieldError>
          </div>

          <div>
            <Label htmlFor="password">{t("auth.password")}</Label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]"
                aria-hidden="true"
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                dir="ltr"
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
                style={{ paddingLeft: "2.75rem", paddingRight: "3rem" }}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={t(showPassword ? "auth.hidePassword" : "auth.showPassword")}
                aria-pressed={showPassword}
                className="absolute top-1/2 right-2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-[var(--muted-foreground)] transition hover:bg-black/[0.05] hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:bg-white/[0.06]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <FieldError id="password-error">{translate(errors.password?.message)}</FieldError>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label
              title={t("auth.rememberHint")}
              className="inline-flex cursor-pointer items-center gap-2 text-xs text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
            >
              <span className="relative grid h-4 w-4 place-items-center">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => {
                    const checked = event.target.checked;
                    setRemember(checked);
                    if (!checked) {
                      try {
                        window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
                      } catch {
                        // Ignore storage failures in restricted contexts.
                      }
                    }
                  }}
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded-[5px] border border-[var(--input)] bg-[var(--card)] transition checked:border-[#c6a15b] checked:bg-[#c6a15b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a8813f] dark:focus-visible:outline-[#d9b877]"
                />
                <Check className="pointer-events-none absolute h-3 w-3 scale-75 text-neutral-950 opacity-0 transition peer-checked:scale-100 peer-checked:opacity-100" />
              </span>
              {t("auth.remember")}
              <span className="sr-only">— {t("auth.rememberHint")}</span>
            </label>
            <Link href="/forgot-password" className="auth-link text-xs">
              {t("auth.forgot")}
            </Link>
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

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="group w-full"
          >
            {isSubmitting ? t("auth.loading") : t("auth.signIn")}
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            )}
          </Button>

          <p className="flex items-center justify-center gap-1.5 text-[11px] leading-relaxed text-[var(--muted-foreground)]">
            <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400/70" />
            {t("auth.secureSession")}
          </p>
        </form>
      )}
    </AuthShell>
  );
}
