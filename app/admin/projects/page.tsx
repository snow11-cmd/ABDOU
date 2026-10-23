import type { Metadata } from "next";

import { ProjectsTable } from "@/components/admin/projects-table";
import { requireAdmin } from "@/lib/auth";
import { getAdminProjects } from "@/lib/data/admin";

export const metadata: Metadata = { title: "المشاريع", robots: { index: false } };

export default async function AdminProjectsPage() {
  const { supabase } = await requireAdmin();
  const projects = await getAdminProjects(supabase);
  return <ProjectsTable projects={projects} />;
}
