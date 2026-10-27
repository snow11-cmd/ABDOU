"use client";

import {
  Briefcase,
  ExternalLink,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  ReceiptText,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/site/language-switcher";
import { Logo } from "@/components/ui/logo";
import type { DictKey } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", key: "admin.overview" as DictKey, icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", key: "admin.projects" as DictKey, icon: FolderKanban },
  { href: "/admin/services", key: "admin.services" as DictKey, icon: Briefcase },
  { href: "/admin/messages", key: "admin.messages" as DictKey, icon: Mail },
  { href: "/admin/orders", key: "admin.orders" as DictKey, icon: ReceiptText },
  { href: "/admin/settings", key: "admin.settings" as DictKey, icon: Settings },
];

export function AdminSidebar({ name, email }: { name: string; email: string }) {
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const signOut = async () => {
    setSigningOut(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-5">
        <Logo tone="auto" />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t("nav.close")}
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-[#f4f1ea] lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mx-4 mb-5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#c6a15b] to-[#8a6730] text-xs font-bold text-[#0b0b0c]">
            {(name || email || "A").charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-[#f4f1ea]">{name || "Admin"}</p>
            <p className="truncate text-[10px] text-[#b8b2a7]" dir="ltr">
              {email}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label={t("admin.navLabel")}>
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "border border-[#c6a15b]/30 bg-[#c6a15b]/12 text-[#f4f1ea] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "border border-transparent text-[#d6d1c7] hover:bg-white/[0.04] hover:text-[#f4f1ea]",
              )}
            >
              <item.icon className={cn("h-4 w-4", active ? "text-[#d9b877]" : "text-[#b8b2a7]")} />
              {t(item.key)}
              {active ? <span className="ms-auto h-1.5 w-1.5 rounded-full bg-[#c6a15b]" /> : null}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/[0.06] p-3">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[10px] tracking-wider text-[#a8a39a] uppercase">
            {t("admin.language")}
          </span>
          <LanguageSwitcher compact />
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#d6d1c7] transition hover:bg-white/[0.04] hover:text-[#f4f1ea]"
        >
          <ExternalLink className="h-4 w-4 text-[#b8b2a7]" />
          {t("admin.viewSite")}
        </Link>
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#d6d1c7] transition hover:bg-rose-500/10 hover:text-rose-200 disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />
          {signingOut ? t("auth.loading") : t("nav.logout")}
        </button>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[10px] text-[#a8a39a]">
          <Sparkles className="h-3 w-3 text-[#d9b877]" />
          {t("admin.rlsProtected")}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/[0.06] bg-[#0b0b0c]/90 px-4 py-3 backdrop-blur-lg lg:hidden">
        <Logo tone="auto" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("nav.menu")}
          aria-expanded={open}
          aria-controls="admin-mobile-menu"
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[#f4f1ea]"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 start-0 z-30 hidden w-64 border-e border-white/[0.06] bg-[#0b0b0c] lg:block">
        {content}
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="admin-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("admin.navLabel")}
            className="absolute inset-y-0 start-0 w-[280px] border-e border-white/10 bg-[#0b0b0c] shadow-2xl"
          >
            {content}
          </div>
        </div>
      ) : null}
    </>
  );
}
