const deployedHost = (
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL
)?.replace(/^https?:\/\//, "");

export const siteConfig = {
  descriptionAr:
    "أبو جاسم — مطور ويب متكامل ومصمم تجارب رقمية. أبني مواقع ومنتجات رقمية سريعة، أنيقة، وقابلة للتوسع باستخدام Next.js وReact وTypeScript.",
  descriptionEn:
    "Abu Jasem — full-stack developer and digital experience designer building fast, elegant, scalable web products with Next.js, React and TypeScript.",
  email: "hello@abujasem.dev",
  nameAr: "أبو جاسم",
  nameEn: "Abu Jasem",
  roleAr: "مطور ويب ومصمم تجارب رقمية",
  roleEn: "Full-Stack Developer & Digital Experience Designer",
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    telegram: "https://t.me/abo_jasem_info",
    x: "https://x.com/",
  },
  url: deployedHost
    ? `https://${deployedHost}`
    : (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  whatsapp: "970000000000",
} as const;
