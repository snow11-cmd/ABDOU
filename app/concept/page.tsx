import { ConceptShell } from "@/components/concept/concept-shell";
import { getProjects, getServices, getSiteSettings } from "@/lib/data/queries";

export const revalidate = 60;

export default async function ConceptPage() {
  const [projects, services, settings] = await Promise.all([
    getProjects(),
    getServices(),
    getSiteSettings(),
  ]);

  return <ConceptShell projects={projects} services={services} settings={settings} />;
}
