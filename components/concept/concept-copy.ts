import type { Lang } from "@/lib/i18n/dictionaries";

export type ConceptCopy = {
  nav: {
    work: string;
    services: string;
    about: string;
    contact: string;
  };
  cta: string;
  announcement: string;
  edition: string;
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    intro: string;
    primary: string;
    secondary: string;
    status: string;
    scroll: string;
  };
  stage: {
    label: string;
    hint: string;
    explore: string;
    featured: string;
  };
  marquee: string[];
  about: {
    label: string;
    title: string;
    highlight: string;
    body: string;
    stats: { value: string; label: string }[];
    principles: string[];
    signature: string;
  };
  work: {
    label: string;
    title: string;
    body: string;
    all: string;
    view: string;
  };
  services: {
    label: string;
    title: string;
    body: string;
    all: string;
  };
  process: {
    label: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  quote: {
    text: string;
    by: string;
  };
  contact: {
    label: string;
    title: string;
    body: string;
    email: string;
    social: string;
  };
  footer: {
    rights: string;
    built: string;
    top: string;
  };
};

export const conceptCopy: Record<Lang, ConceptCopy> = {
  ar: {
    nav: {
      work: "الأعمال",
      services: "الخدمات",
      about: "عني",
      contact: "تواصل",
    },
    cta: "ابدأ مشروعاً",
    announcement: "متاح لمشاريع جديدة · 2026",
    edition: "الإصدار 2026 / استوديو أبو جاسم",
    hero: {
      eyebrow: "اتجاه بصري · تجربة سكرول",
      line1: "أصنع",
      line2: "تجارب رقمية",
      line3: "تستحق التمرير.",
      intro:
        "مواقع ومنتجات رقمية سريعة، أنيقة، ومبنية لتترك أثراً. من الفكرة الأولى إلى آخر بكسل — بأداء عالٍ وتفاصيل محسوبة.",
      primary: "استعرض الأعمال",
      secondary: "تعرّف على طريقتي",
      status: "متاح لمشاريع جديدة",
      scroll: "مرّر للأسفل",
    },
    stage: {
      label: "مختارات / 2026",
      hint: "اسحب أو مرّر",
      explore: "افتح المشروع",
      featured: "المشروع المميز",
    },
    marquee: [
      "تصميم واجهات",
      "تطوير Next.js",
      "أنظمة تصميم",
      "أنيميشن",
      "أداء",
      "تجربة مستخدم",
      "هوية رقمية",
    ],
    about: {
      label: "فلسفة العمل / 01",
      title: "التصميم ليس شكلاً.",
      highlight: "هو الطريقة التي تجعل بها الفكرة واضحة.",
      body: "أبدأ من السؤال، لا من القالب. كل مشروع يمر بفهم، ثم تصميم، ثم بناء، ثم صقل. النتيجة تجربة تبدو بسيطة، لكنها محسوبة في كل تفصيلة.",
      stats: [
        { value: "6+", label: "سنوات خبرة" },
        { value: "40+", label: "مشروع منجز" },
        { value: "25+", label: "عميل سعيد" },
      ],
      principles: ["وضوح قبل الزخرفة", "سرعة قبل التعقيد", "تفاصيل قبل الإطلاق"],
      signature: "أبو جاسم — مطور ومصمم",
    },
    work: {
      label: "أعمال مختارة / 02",
      title: "مشاريع تستحق أن تُرى.",
      body: "مجموعة من التجارب التي تجمع بين الوضوح، الأداء، والتفاصيل.",
      all: "كل الأعمال",
      view: "عرض المشروع",
    },
    services: {
      label: "ما أقدمه / 03",
      title: "من الفكرة إلى الإطلاق.",
      body: "خدمات مترابطة تغطي رحلة المنتج كاملة، من أول قرار إلى آخر تحسين.",
      all: "كل الخدمات",
    },
    process: {
      label: "طريقة العمل / 04",
      title: "أربع خطوات. صفر مفاجآت.",
      steps: [
        { title: "اكتشاف", body: "أفهم المشروع، الجمهور، والهدف قبل أي تصميم." },
        { title: "تصميم", body: "أرسم التجربة، أختبر الوضوح، وأبني نظاماً بصرياً." },
        { title: "تطوير", body: "أبني بأداء عالٍ وكود قابل للتوسع." },
        { title: "إطلاق", body: "أختبر، أقيس، وأسلّم مع دعم بعد الإطلاق." },
      ],
    },
    quote: {
      text: "أفضل واجهة هي التي تختفي، ليظهر المحتوى.",
      by: "فلسفة أبو جاسم",
    },
    contact: {
      label: "لنبدأ / 05",
      title: "عندك فكرة؟ لنصنع منها شيئاً يستحق التمرير.",
      body: "أخبرني بالهدف، وسأحوّله إلى تجربة رقمية واضحة وسريعة.",
      email: "راسلني",
      social: "أو تابعني",
    },
    footer: {
      rights: "© 2026 أبو جاسم. جميع الحقوق محفوظة.",
      built: "صُمم وبُني بعناية.",
      top: "العودة للأعلى",
    },
  },
  en: {
    nav: {
      work: "Work",
      services: "Services",
      about: "About",
      contact: "Contact",
    },
    cta: "Start a project",
    announcement: "Available for new projects · 2026",
    edition: "2026 EDITION / ABU JASEM STUDIO",
    hero: {
      eyebrow: "VISUAL DIRECTION · SCROLL EXPERIENCE",
      line1: "I BUILD",
      line2: "DIGITAL EXPERIENCES",
      line3: "WORTH SCROLLING.",
      intro:
        "Fast, considered websites and digital products built to leave a mark. From the first idea to the last pixel — with performance and detail baked in.",
      primary: "Explore my work",
      secondary: "See how I work",
      status: "Available for new projects",
      scroll: "Scroll to explore",
    },
    stage: {
      label: "SELECTED / 2026",
      hint: "Drag or scroll",
      explore: "Open project",
      featured: "Featured project",
    },
    marquee: [
      "UI DESIGN",
      "NEXT.JS",
      "DESIGN SYSTEMS",
      "MOTION",
      "PERFORMANCE",
      "UX",
      "DIGITAL IDENTITY",
    ],
    about: {
      label: "PHILOSOPHY / 01",
      title: "Design is not decoration.",
      highlight: "It is how you make an idea clear.",
      body: "I start with the question, not the template. Every project moves through understanding, design, build, and polish. The result feels simple, but every detail is considered.",
      stats: [
        { value: "6+", label: "Years of experience" },
        { value: "40+", label: "Projects shipped" },
        { value: "25+", label: "Happy clients" },
      ],
      principles: ["Clarity before decoration", "Speed before complexity", "Details before launch"],
      signature: "Abu Jasem — Developer & Designer",
    },
    work: {
      label: "SELECTED WORK / 02",
      title: "Projects worth seeing.",
      body: "A collection of experiences built around clarity, performance, and detail.",
      all: "All work",
      view: "View project",
    },
    services: {
      label: "WHAT I DO / 03",
      title: "From idea to launch.",
      body: "Connected services covering the full product journey, from the first decision to the final optimization.",
      all: "All services",
    },
    process: {
      label: "HOW I WORK / 04",
      title: "Four steps. Zero surprises.",
      steps: [
        {
          title: "Discover",
          body: "I understand the project, audience, and goal before any design.",
        },
        {
          title: "Design",
          body: "I shape the experience, test clarity, and build the visual system.",
        },
        { title: "Build", body: "I develop with performance and scalable code." },
        { title: "Launch", body: "I test, measure, and hand off with post-launch support." },
      ],
    },
    quote: {
      text: "The best interface is the one that disappears, so the content can speak.",
      by: "The Abu Jasem philosophy",
    },
    contact: {
      label: "LET'S TALK / 05",
      title: "Got an idea? Let's make it worth scrolling.",
      body: "Tell me the goal, and I'll turn it into a clear, fast digital experience.",
      email: "Email me",
      social: "Or follow along",
    },
    footer: {
      rights: "© 2026 Abu Jasem. All rights reserved.",
      built: "Designed and built with care.",
      top: "Back to top",
    },
  },
};
