import type { Metadata } from "next";

import { AboutPageContent } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "عني",
  description:
    "تعرّف على أبو جاسم: مطور ويب متكامل يصمّم ويبني منتجات رقمية سريعة ومدروسة من الفكرة إلى الإطلاق.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
