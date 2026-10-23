import type { Metadata } from "next";

import { SettingsForm } from "@/components/admin/settings-form";
import { requireAdmin } from "@/lib/auth";
import { getAdminSettings } from "@/lib/data/admin";

export const metadata: Metadata = { title: "الإعدادات", robots: { index: false } };

export default async function AdminSettingsPage() {
  const { supabase } = await requireAdmin();
  const settings = await getAdminSettings(supabase);
  return <SettingsForm settings={settings} />;
}
