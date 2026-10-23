import type { Metadata } from "next";

import { Contact } from "@/components/home/contact";
import { getSiteSettings } from "@/lib/data/queries";
import { isSupabaseConfigured } from "@/lib/utils";

export const metadata: Metadata = {
  title: "تواصل",
  description:
    "لديك فكرة أو مشروع؟ أرسل تفاصيله وسأعود إليك خلال 24 ساعة لنبدأ العمل معاً.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <div className="site-route">
      <Contact
        settings={settings}
        configured={isSupabaseConfigured() && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)}
      />
    </div>
  );
}
