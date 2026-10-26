import type { Project, Service, SiteSettings } from "./types";

export const demoProjects: Project[] = [
  {
    id: "demo-1",
    slug: "luxora-store",
    titleAr: "لوكسورا — متجر أزياء",
    titleEn: "LUXORA — Fashion Store",
    descriptionAr: "متجر إلكتروني فاخر بتجربة شراء سلسة، سلة ذكية، ودفع آمن متكامل.",
    descriptionEn:
      "A premium fashion e-commerce experience with a fluid checkout, smart cart and secure payments.",
    longDescriptionAr:
      "لوكسورا منصة تجارة إلكترونية كاملة صُممت لعلامة أزياء راقية. تشمل كتالوجاً ديناميكياً، بحثاً فورياً، سلة محفوظة، ولوحة تحكم لإدارة المنتجات والطلبات. ركّزنا على سرعة التحميل وتجربة شراء لا تتجاوز ثلاث خطوات.",
    longDescriptionEn:
      "LUXORA is a complete e-commerce platform built for a premium fashion brand. It includes a dynamic catalog, instant search, persistent cart, and a dashboard for managing products and orders. The focus was exceptional load speed and a three-step checkout.",
    category: "ecommerce",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Supabase"],
    imageUrl: null,
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    featured: true,
    published: true,
    sortOrder: 1,
    createdAt: "2026-02-10T00:00:00Z",
  },
  {
    id: "demo-2",
    slug: "nabd-tasks",
    titleAr: "نبض — منصة إدارة مهام",
    titleEn: "Nabd — Task Platform",
    descriptionAr:
      "منصة SaaS لإدارة المهام والتعاون الفوري بين الفرق، بواجهة نظيفة وتحديثات لحظية.",
    descriptionEn:
      "A SaaS task management and real-time team collaboration platform with a clean UI and instant updates.",
    longDescriptionAr:
      "نبض منصة إنتاجية للفرق الصغيرة والمتوسطة. تدعم المشاريع، المهام الفرعية، التعليقات، الإشعارات اللحظية، وأدوار المستخدمين. بُنيت بواجهة سريعة الاستجابة ووضع ليلي كامل، مع طبقة اشتراكات قابلة للتوسع.",
    longDescriptionEn:
      "Nabd is a productivity platform for small and mid-sized teams. It supports projects, subtasks, comments, real-time notifications and user roles. Built with a responsive interface and full dark mode, plus a scalable subscription layer.",
    category: "saas",
    tech: ["Next.js", "Supabase", "PostgreSQL", "Realtime", "Framer Motion"],
    imageUrl: null,
    demoUrl: "https://example.com",
    repoUrl: null,
    featured: true,
    published: true,
    sortOrder: 2,
    createdAt: "2025-11-02T00:00:00Z",
  },
  {
    id: "demo-3",
    slug: "aura-studio",
    titleAr: "أورا ستوديو — موقع وكالة",
    titleEn: "AURA Studio — Agency Site",
    descriptionAr: "موقع تعريفي لوكالة إبداعية بتجربة بصرية غنية وحركات سينمائية.",
    descriptionEn: "An agency website with a rich visual experience and cinematic motion design.",
    longDescriptionAr:
      "موقع وكالة إبداعية يضع التجربة البصرية في المقدمة: انتقالات سلسة بين الأقسام، وسائط متحركة، وصفحات دراسات حالة غنية. تم تحسين الأداء عبر تحميل كسول للوسائط وتقديم بدائل ثابتة للأجهزة الضعيفة.",
    longDescriptionEn:
      "A creative agency site that puts visual experience first: smooth section transitions, animated media, and rich case-study pages. Performance was optimized with lazy media loading and static fallbacks for low-power devices.",
    category: "web",
    tech: ["Next.js", "GSAP", "Tailwind CSS", "Sanity", "Vercel"],
    imageUrl: null,
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    featured: true,
    published: true,
    sortOrder: 3,
    createdAt: "2025-08-19T00:00:00Z",
  },
  {
    id: "demo-4",
    slug: "sanad-estate",
    titleAr: "سند — منصة عقارية",
    titleEn: "Sanad — Real Estate Platform",
    descriptionAr: "منصة بحث عن العقارات مع خرائط تفاعلية، فلاتر متقدمة، وحجز معاينات.",
    descriptionEn:
      "A real-estate discovery platform with interactive maps, advanced filters and viewing bookings.",
    longDescriptionAr:
      "سند يربط المشترين والمستأجرين بأصحاب العقارات عبر تجربة بحث ذكية. تشمل خرائط تفاعلية، فلاتر دقيقة، صفحات عقار غنية بالصور، ونظام حجز معاينة. صُممت الواجهة لتكون واضحة وسريعة حتى على الاتصالات الضعيفة.",
    longDescriptionEn:
      "Sanad connects buyers and renters with property owners through smart discovery. It includes interactive maps, precise filters, media-rich property pages and a viewing booking system. The interface stays clear and fast even on slow connections.",
    category: "web",
    tech: ["Next.js", "TypeScript", "Mapbox", "Prisma", "PostgreSQL"],
    imageUrl: null,
    demoUrl: null,
    repoUrl: "https://github.com",
    featured: false,
    published: true,
    sortOrder: 4,
    createdAt: "2025-05-14T00:00:00Z",
  },
  {
    id: "demo-5",
    slug: "pulse-analytics",
    titleAr: "بولس — لوحة تحليلات",
    titleEn: "Pulse — Analytics Dashboard",
    descriptionAr: "لوحة تحكم تحليلية بواجهات بيانات غنية، رسوم تفاعلية، وتجربة استخدام مدروسة.",
    descriptionEn:
      "An analytics dashboard with rich data visualization, interactive charts and a carefully crafted UX.",
    longDescriptionAr:
      "بولس لوحة تحليلات لفرق المنتج. تعرض مؤشرات الأداء، مسارات التحويل، والسلوك اليومي عبر رسوم تفاعلية عالية الأداء. أعدنا تصميم نظام الألوان والمكونات بالكامل لتحسين القراءة وتقليل الحمل البصري.",
    longDescriptionEn:
      "Pulse is an analytics dashboard for product teams. It surfaces KPIs, conversion funnels and daily behavior through high-performance interactive charts. The color system and components were fully redesigned to improve readability and reduce visual load.",
    category: "uiux",
    tech: ["React", "TypeScript", "D3.js", "Tailwind CSS", "Storybook"],
    imageUrl: null,
    demoUrl: "https://example.com",
    repoUrl: null,
    featured: false,
    published: true,
    sortOrder: 5,
    createdAt: "2025-03-08T00:00:00Z",
  },
  {
    id: "demo-6",
    slug: "zaytoun-market",
    titleAr: "زيتون — سوق طبيعي",
    titleEn: "Zaytoun — Organic Market",
    descriptionAr: "متجر إلكتروني لمنتجات طبيعية بتجربة هادئة وهوية بصرية دافئة.",
    descriptionEn: "An organic products store with a calm experience and a warm visual identity.",
    longDescriptionAr:
      "زيتون متجر لمنتجات طبيعية محلية. يجمع بين تصوير منتجات دافئ، تصفح بسيط، واشتراكات شهرية للصناديق الموسمية. تم بناء تجربة شراء سريعة مع دعم كامل للغة العربية واتجاه RTL.",
    longDescriptionEn:
      "Zaytoun is a store for local organic products, combining warm product photography, simple browsing and monthly seasonal box subscriptions. The checkout is fast with full Arabic and RTL support.",
    category: "ecommerce",
    tech: ["Next.js", "Sanity", "Stripe", "Tailwind CSS"],
    imageUrl: null,
    demoUrl: null,
    repoUrl: null,
    featured: false,
    published: true,
    sortOrder: 6,
    createdAt: "2024-12-11T00:00:00Z",
  },
];

export const demoServices: Service[] = [
  {
    id: "svc-1",
    slug: "website-development",
    titleAr: "تطوير المواقع",
    titleEn: "Website Development",
    descriptionAr: "مواقع سريعة ومتجاوبة مبنية بأحدث التقنيات، من صفحة الهبوط إلى المنصة الكاملة.",
    descriptionEn:
      "Fast, responsive websites built with modern technologies — from landing pages to full platforms.",
    icon: "Code2",
    price: 450,
    active: true,
    sortOrder: 1,
  },
  {
    id: "svc-2",
    slug: "frontend-development",
    titleAr: "تطوير الواجهات الأمامية",
    titleEn: "Frontend Development",
    descriptionAr: "واجهات تفاعلية دقيقة Pixel-perfect مع حركات سلسة وأداء عالٍ وإمكانية وصول.",
    descriptionEn:
      "Pixel-perfect interactive interfaces with smooth motion, high performance and accessibility.",
    icon: "LayoutTemplate",
    price: 300,
    active: true,
    sortOrder: 2,
  },
  {
    id: "svc-3",
    slug: "backend-development",
    titleAr: "تطوير الواجهة الخلفية",
    titleEn: "Backend Development",
    descriptionAr: "واجهات API آمنة، قواعد بيانات منظمة، ومصادقة وتكاملات جاهزة للتوسع.",
    descriptionEn:
      "Secure APIs, well-structured databases, authentication and integrations built to scale.",
    icon: "Server",
    price: 500,
    active: true,
    sortOrder: 3,
  },
  {
    id: "svc-4",
    slug: "ui-ux-implementation",
    titleAr: "تنفيذ واجهات UI/UX",
    titleEn: "UI/UX Implementation",
    descriptionAr: "تحويل تصاميم Figma إلى كود نظيف ومتجاوب مع نظام مكونات موحد.",
    descriptionEn:
      "Turning Figma designs into clean, responsive code with a consistent component system.",
    icon: "PenTool",
    price: 250,
    active: true,
    sortOrder: 4,
  },
  {
    id: "svc-5",
    slug: "ecommerce-development",
    titleAr: "تطوير المتاجر الإلكترونية",
    titleEn: "E-commerce Development",
    descriptionAr: "متاجر متكاملة مع إدارة منتجات، سلة، دفع آمن، ولوحة طلبات.",
    descriptionEn:
      "Complete stores with product management, cart, secure payments and an orders dashboard.",
    icon: "ShoppingCart",
    price: 700,
    active: true,
    sortOrder: 5,
  },
  {
    id: "svc-6",
    slug: "ai-integrations",
    titleAr: "تكاملات الذكاء الاصطناعي",
    titleEn: "AI Integrations",
    descriptionAr: "دمج نماذج الذكاء الاصطناعي في منتجك: مساعدون، بحث دلالي، وتوليد محتوى.",
    descriptionEn:
      "Integrating AI models into your product: assistants, semantic search and content generation.",
    icon: "Sparkles",
    price: 650,
    active: true,
    sortOrder: 6,
  },
];

export const demoSettings: SiteSettings = {
  nameAr: "أبو جاسم",
  nameEn: "Abu Jasem",
  titleAr: "مطور ويب متكامل ومصمم تجارب رقمية",
  titleEn: "Full-Stack Developer & Digital Experience Designer",
  bioAr: "مطور ويب متكامل بخبرة تتجاوز 6 سنوات في بناء مواقع ومنصات رقمية عالية الأداء.",
  bioEn:
    "Full-stack developer with 6+ years of experience building high-performance websites and digital platforms.",
  email: "hello@abujasem.dev",
  whatsapp: "970000000000",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  x: "https://x.com/",
  telegram: "https://t.me/abo_jasem_info",
};
