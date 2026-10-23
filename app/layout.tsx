import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";

import { LanguageProvider } from "@/lib/i18n/provider";
import { siteConfig } from "@/lib/site-config";

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
  themeColor: "#04050a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js')`}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
