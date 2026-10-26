import { ContactFooter } from "@/components/site/contact-footer";
import { CursorFollower } from "@/components/site/cursor-follower";
import { Navbar } from "@/components/site/navbar";
import { PageBackdrop } from "@/components/site/page-backdrop";
import { SiteFrame } from "@/components/site/site-frame";
import { SkipLink } from "@/components/site/skip-link";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { getSiteSettings } from "@/lib/data/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <div id="top" className="site-theme relative flex min-h-screen flex-col overflow-x-clip">
      <SiteFrame />
      <PageBackdrop />
      <SmoothScroll />
      <CursorFollower />
      <SkipLink />
      <Navbar />
      <main id="main" className="relative z-10 flex-1">
        {children}
      </main>
      <ContactFooter settings={settings} />
    </div>
  );
}
