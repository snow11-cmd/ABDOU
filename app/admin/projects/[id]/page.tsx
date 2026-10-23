import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/auth";
import { getAdminProjectById } from "@/lib/data/admin";

export const metadata: Metadata = { title: "تعديل مشروع", robots: { index: false } };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const project = await getAdminProjectById(supabase, id);
  if (!project) notFound();

  return (
    <div>
      <AdminPageHeader titleKey="admin.editProject" subtitleKey="admin.projects" />
      <ProjectForm project={project} />
    </div>
  );
}
