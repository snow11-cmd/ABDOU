import type { SiteSettings } from "@/lib/data/types";
import { cn } from "@/lib/utils";

import { GithubIcon, LinkedinIcon, TelegramIcon, XIcon } from "./social-icons";

const sizes = {
  sm: "size-9 rounded-lg",
  md: "size-10 rounded-xl",
} as const;

export function SocialLinks({
  settings,
  size = "md",
  className,
}: {
  settings: SiteSettings;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const socials = [
    { href: settings.github, icon: GithubIcon, label: "GitHub" },
    { href: settings.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    { href: settings.x, icon: XIcon, label: "X" },
    { href: settings.telegram, icon: TelegramIcon, label: "Telegram" },
  ].filter((social) => Boolean(social.href));

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={cn(
            "grid place-items-center border border-white/10 bg-white/[0.03] text-[#a7b1c7] transition duration-500 hover:-translate-y-0.5 hover:border-[#5b7cff]/40 hover:bg-[#5b7cff]/10 hover:text-white",
            sizes[size],
          )}
        >
          <social.icon className="size-4" />
        </a>
      ))}
    </div>
  );
}
