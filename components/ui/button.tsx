import Link from "next/link";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white";
  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-[11px]",
    md: "h-11 px-5 text-[12px]",
    lg: "h-12 px-6 text-sm",
  };
  const variants: Record<Variant, string> = {
    primary:
      "bg-neutral-950 text-white shadow-[0_14px_30px_-24px_rgba(0,0,0,0.65)] hover:-translate-y-0.5 hover:bg-neutral-800 dark:bg-[#f4f1ea] dark:text-neutral-950 dark:shadow-none dark:hover:bg-white",
    secondary:
      "border border-black/[0.09] bg-white text-neutral-900 hover:-translate-y-0.5 hover:border-black/[0.16] hover:shadow-[0_14px_30px_-24px_rgba(0,0,0,0.45)] dark:border-white/[0.12] dark:bg-white/[0.05] dark:text-neutral-100 dark:hover:border-white/[0.2] dark:hover:bg-white/[0.08] dark:hover:shadow-none",
    ghost:
      "text-neutral-600 hover:bg-black/[0.05] hover:text-neutral-950 dark:text-neutral-100 dark:hover:bg-white/[0.07] dark:hover:text-white",
    outline:
      "border border-black/[0.12] text-neutral-900 hover:-translate-y-0.5 hover:border-black/[0.2] hover:bg-black/[0.03] dark:border-white/[0.16] dark:text-neutral-100 dark:hover:border-white/[0.26] dark:hover:bg-white/[0.05]",
  };

  return cn(base, sizes[size], variants[variant], className);
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={buttonClasses({ variant, size, className })}
      data-variant={variant ?? "primary"}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={buttonClasses({ variant, size, className })}
      data-variant={variant ?? "primary"}
      {...props}
    >
      {children}
    </Link>
  );
}
