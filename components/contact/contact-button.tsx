"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CheckedIcon, CopyIcon, MailFilledIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n/provider";
import { cn, gmailComposeUrl } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactButton({
  email,
  label,
  className,
}: {
  email: string;
  label?: string;
  className?: string;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    setCopied(true);
    if (timeout.current) window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setCopied(false), 1700);
  };

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <motion.div
        layout
        transition={{ layout: { duration: 0.45, ease: EASE } }}
        className="inline-flex h-11 items-center rounded-xl bg-neutral-950 p-1.5 text-white shadow-[0_16px_35px_-22px_rgba(0,0,0,0.8)] dark:bg-[#f4f1ea] dark:text-neutral-950 dark:shadow-[0_16px_35px_-18px_rgba(0,0,0,0.9)]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.a
              key="email"
              href={gmailComposeUrl(email)}
              target="_blank"
              rel="noreferrer noopener"
              title={t("hero.openGmail")}
              aria-label={`${t("hero.openGmail")}: ${email}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="group inline-flex h-8 items-center gap-2 rounded-lg px-3 text-[13px] font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:hover:bg-black/[0.08] dark:focus-visible:outline-neutral-950"
            >
              <MailFilledIcon
                size={14}
                strokeWidth={1.75}
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6"
                aria-hidden="true"
              />
              <span dir="ltr" className="max-w-[46vw] truncate sm:max-w-none">
                {email}
              </span>
              <ArrowUpRight
                className="size-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </motion.a>
          ) : (
            <motion.button
              key="toggle"
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="group inline-flex h-8 items-center gap-2 rounded-lg px-3 text-[13px] font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:hover:bg-black/[0.08] dark:focus-visible:outline-neutral-950"
            >
              <MailFilledIcon
                size={14}
                strokeWidth={1.75}
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6"
                aria-hidden="true"
              />
              <span className="max-w-[46vw] truncate sm:max-w-none">
                {label ?? t("hero.ctaContact")}
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.button
              key="copy"
              type="button"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 32 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              onClick={copyEmail}
              aria-label={t("hero.copyEmail")}
              title={t("hero.copyEmail")}
              className="grid h-8 shrink-0 place-items-center overflow-hidden rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-black/[0.08] dark:text-neutral-950 dark:hover:bg-black/[0.14] dark:focus-visible:outline-neutral-950"
            >
              {copied ? (
                <CheckedIcon size={14} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <CopyIcon size={14} strokeWidth={1.75} aria-hidden="true" />
              )}
            </motion.button>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? t("hero.emailCopied") : ""}
      </span>
    </div>
  );
}
