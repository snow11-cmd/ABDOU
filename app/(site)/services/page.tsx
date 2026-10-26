import type { Metadata } from "next";

import { ServicesPageContent } from "@/components/services/services-page";
import { getServices } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "الخدمات",
  description:
    "خدمات تطوير ويب وتصميم واجهات وتجارة إلكترونية وتكاملات ذكاء اصطناعي — من الفكرة إلى الإطلاق بجودة عالية.",
  alternates: { canonical: "/services" },
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesPageContent services={services} />;
}
