import { ArrowUpLeft, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { AnimeNavBarDemo } from "@/components/ui/demo";

export const metadata: Metadata = {
  title: "Anime Navbar — معاينة",
  description: "معاينة تفاعلية لمكوّن شريط التنقل AnimeNavBar.",
  robots: { index: false, follow: false },
};

const sections = [
  {
    id: "home",
    eyebrow: "01 / الرئيسية",
    title: "شريط تنقل حي",
    body: "مكوّن AnimeNavBar جاهز للاستخدام مع تأثيرات Framer Motion، شخصية متحركة تتبع التبويب النشط، ودعم كامل للجوال.",
  },
  {
    id: "about",
    eyebrow: "02 / عن المكوّن",
    title: "مصمم ليكون مستقلاً",
    body: "لا يعتمد على أي مزوّد سياق أو مكتبة واجهة إضافية. يكفي تمرير عناصر التنقل والأيقونات، وسيتكفل المكوّن بالبقية.",
  },
  {
    id: "services",
    eyebrow: "03 / الاستخدام",
    title: "مرن وقابل للتخصيص",
    body: "يمكن استخدامه مع روابط الصفحات أو المراسي داخل الصفحة. يحافظ على سلوك الروابط الأصلي ويحدّث التبويب النشط تلقائياً.",
  },
  {
    id: "work",
    eyebrow: "04 / التفاصيل",
    title: "حركة خفيفة ومتجاوبة",
    body: "تتقلص التسميات إلى أيقونات على الشاشات الصغيرة، وتظهر الشخصية الكرتونية أعلى التبويب النشط دون التأثير على تجربة اللمس.",
  },
  {
    id: "contact",
    eyebrow: "05 / التواصل",
    title: "جرّبه الآن",
    body: "تنقل بين الأقسام من الشريط العلوي، أو عد إلى الموقع الرئيسي لمشاهدة التصميم الكامل.",
  },
];

export default function AnimeNavbarDemoPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030409] text-[#e9edf7]">
      <AnimeNavBarDemo />

      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(91,124,255,0.18),transparent_70%),radial-gradient(45%_40%_at_85%_70%,rgba(157,123,255,0.1),transparent_70%)]"
        aria-hidden="true"
      />

      <main className="container-x pb-24">
        {sections.map((section, index) => {
          const Heading = index === 0 ? "h1" : "h2";

          return (
            <section
              key={section.id}
              id={section.id}
              className="flex min-h-[85svh] scroll-mt-32 flex-col justify-center border-b border-white/[0.06] py-24 last:border-b-0"
            >
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.08em] text-[#a9bcff] backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#5b7cff] to-[#22d3ee]" />
                  {section.eyebrow}
                </span>
                <Heading
                  className={
                    index === 0
                      ? "mt-6 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.3] font-black tracking-[-0.04em] text-balance text-white"
                      : "mt-6 text-3xl leading-tight font-extrabold tracking-[-0.03em] text-balance text-white sm:text-4xl"
                  }
                >
                  {section.title}
                </Heading>
                <p className="mt-5 text-base leading-[1.9] text-pretty text-[#96a0b6] sm:text-lg">
                  {section.body}
                </p>

                {index === 0 ? (
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href="/"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#3d63f5] via-[#5b7cfa] to-[#8b5cf6] px-6 text-sm font-semibold text-white shadow-[0_12px_32px_-12px_rgba(79,124,255,0.75)] transition hover:-translate-y-0.5"
                    >
                      العودة إلى الموقع
                      <ArrowUpLeft className="h-4 w-4" />
                    </Link>
                    <span className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-xs text-[#aab4ca]">
                      <Sparkles className="h-4 w-4 text-[#c4b5fd]" />
                      Framer Motion · Lucide
                    </span>
                  </div>
                ) : null}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
