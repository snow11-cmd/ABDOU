import { ImmersiveBackground } from "@/components/site/immersive-background";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { SiteEffects } from "@/components/site/site-effects";
import { SkipLink } from "@/components/site/skip-link";
import { getSiteSettings } from "@/lib/data/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <div className="relative flex min-h-screen flex-col">
      <ImmersiveBackground />
      <SiteEffects />
      <SkipLink />
      <Navbar />
      <main id="main" className="relative z-10 flex-1">
        {children}
      </main>
      <Footer settings={settings} />
    </div>
  );
}
