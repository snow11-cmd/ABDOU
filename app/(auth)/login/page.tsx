import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "تسجيل الدخول", robots: { index: false } };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; setup?: string; error?: string }>;
}) {
  const params = await searchParams;
  return (
    <LoginForm
      nextPath={params.next}
      forceSetup={params.setup === "required"}
      forbidden={params.error === "forbidden"}
      authError={params.error === "auth"}
    />
  );
}
