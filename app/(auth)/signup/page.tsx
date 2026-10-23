import type { Metadata } from "next";

import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = { title: "إنشاء حساب", robots: { index: false } };

export default function SignupPage() {
  return <SignupForm />;
}
