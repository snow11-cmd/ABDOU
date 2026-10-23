import type { Metadata } from "next";

import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = { title: "مشروع جديد", robots: { index: false } };

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader titleKey="admin.newProject" subtitleKey="admin.projects" />
      <ProjectForm />
    </div>
  );
}
