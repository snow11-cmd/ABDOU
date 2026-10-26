import type { Metadata } from "next";

import "./concept.css";

export const metadata: Metadata = {
  title: "Concept — اتجاه بصري تجريبي",
  description:
    "تجربة بصرية تجريبية من استوديو أبو جاسم: طباعة كبيرة، بطاقات مشاريع ثلاثية الأبعاد، وحركة مدروسة.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function ConceptLayout({ children }: { children: React.ReactNode }) {
  return <div className="concept-root">{children}</div>;
}
