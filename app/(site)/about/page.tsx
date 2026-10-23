import type { Metadata } from "next";

import { About } from "@/components/home/about";

export const metadata: Metadata = {
  title: "عني",
  description:
    "تعرّف على أبو جاسم: مطور ويب متكامل يصمّم ويبني منتجات رقمية سريعة ومدروسة من الفكرة إلى الإطلاق.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="site-route">
      <About />
    </div>
  );
}
