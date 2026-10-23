import type { Metadata } from "next";

import { ServicesManager } from "@/components/admin/services-manager";
import { requireAdmin } from "@/lib/auth";
import { getAdminServices } from "@/lib/data/admin";

export const metadata: Metadata = { title: "الخدمات", robots: { index: false } };

export default async function AdminServicesPage() {
  const { supabase } = await requireAdmin();
  const services = await getAdminServices(supabase);
  return <ServicesManager services={services} />;
}
