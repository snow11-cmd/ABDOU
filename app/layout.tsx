import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import { LanguageProvider } from "@/lib/i18n/provider";
import { siteConfig } from "@/lib/site-config";

/** IBM Plex Sans Arabic — self-hosted through next/font, weights 100–700. */
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.nameAr} — ${siteConfig.roleAr}`,
    template: `%s | ${siteConfig.nameAr}`,
  },
  description: siteConfig.descriptionAr,
  keywords: [
    "مطور ويب",
    "تصميم مواقع",
    "Next.js",
    "React",
    "TypeScript",
    "Full-Stack Developer",
    "portfolio",
  ],
  authors: [{ name: siteConfig.nameEn }],
  creator: siteConfig.nameEn,
  openGraph: {
    type: "website",
    locale: "ar_AR",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    siteName: siteConfig.nameAr,
    title: `${siteConfig.nameAr} — ${siteConfig.roleAr}`,
    description: siteConfig.descriptionAr,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.nameAr} — ${siteConfig.roleAr}`,
    description: siteConfig.descriptionAr,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={plexArabic.variable}
    >
      <head>
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js')`}
        </Script>
        <Script id="theme-flag" strategy="beforeInteractive">
          {`(function(){try{var k='portfolio-theme';var s=localStorage.getItem(k);var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){}})()`}
        </Script>
      </head>
      <body className="min-h-screen antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
