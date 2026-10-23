import type { Metadata } from "next";

import { Projects } from "@/components/home/projects";
import { getProjects } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "أعمالي",
  description:
    "مشاريع مختارة في تطوير المواقع والمتاجر الإلكترونية ومنصات SaaS وتصميم واجهات — بأداء عالٍ وتصميم مميز.",
  alternates: { canonical: "/work" },
};

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <div className="site-route">
      <Projects projects={projects} />
    </div>
  );
}
