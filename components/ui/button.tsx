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
    "btn-3d group/btn relative inline-flex items-center justify-center rounded-full font-semibold transition-[filter,opacity] duration-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300";
  const sizes: Record<Size, string> = {
    sm: "h-9 text-sm [--btn-px:1rem]",
    md: "h-11 text-[0.95rem] [--btn-px:1.5rem]",
    lg: "h-13 text-base [--btn-px:2rem]",
  };
  const variants: Record<Variant, string> = {
    primary:
      "btn-3d--primary bg-[linear-gradient(112deg,#a8ffe3_0%,#59edff_34%,#75a8ff_68%,#b69cff_100%)] text-[#031018] [text-shadow:0_1px_0_rgba(255,255,255,0.24)]",
    secondary:
      "btn-3d--secondary border border-white/12 bg-white/[0.06] text-white backdrop-blur hover:border-cyan-200/25 hover:bg-white/[0.1]",
    ghost:
      "btn-3d--ghost text-[#c3cbdd] hover:bg-white/[0.06] hover:text-white",
    outline:
      "btn-3d--outline border border-white/15 text-white hover:border-cyan-300/55 hover:bg-cyan-300/10",
  };
  return cn(base, sizes[size], variants[variant], className);
}

function ButtonFaces({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="btn3d-depth" aria-hidden="true" />
      <span className="btn3d-face">{children}</span>
    </>
  );
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
      <ButtonFaces>{children}</ButtonFaces>
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
      <ButtonFaces>{children}</ButtonFaces>
    </Link>
  );
}
