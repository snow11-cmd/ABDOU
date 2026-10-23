import { AdminSidebar } from "@/components/admin/sidebar";
import { SkipLink } from "@/components/site/skip-link";
import { requireAdmin } from "@/lib/auth";

// Authentication and role checks must run on every request.
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#05070d]">
      <SkipLink />
      <AdminSidebar name={profile.full_name ?? ""} email={profile.email ?? ""} />
      <div className="lg:ms-64">
        <main id="main" className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
