"use client";

import { useContext } from "react";

import type { AnimatedIconComponent } from "@/components/icons";
import { IconHoverContext, useIconDrive } from "@/components/icons/hover";
import { cn } from "@/lib/utils";

const sizes = {
  sm: { frame: "size-9 rounded-[0.7rem]", icon: 16 },
  md: { frame: "size-11 rounded-[0.9rem]", icon: 20 },
  lg: { frame: "size-14 rounded-[1.05rem]", icon: 24 },
} as const;

export function IconTile({
  icon: Icon,
  size = "md",
  className,
  iconClassName,
}: {
  icon: AnimatedIconComponent;
  size?: keyof typeof sizes;
  className?: string;
  iconClassName?: string;
}) {
  const sizing = sizes[size];
  // `null` keeps the icon self-hovered; a hover group drives it in and out.
  const groupActive = useContext(IconHoverContext);
  const driveRef = useIconDrive(groupActive);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "icon-tile grid shrink-0 place-items-center border border-black/[0.09] bg-white text-neutral-900 shadow-[0_1px_0_rgba(0,0,0,0.03)] dark:border-white/[0.12] dark:bg-white/[0.055] dark:text-neutral-100 dark:shadow-none",
        sizing.frame,
        className,
      )}
    >
      <Icon
        ref={driveRef}
        size={sizing.icon}
        strokeWidth={1.75}
        className={cn(
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          iconClassName,
        )}
      />
    </span>
  );
}
