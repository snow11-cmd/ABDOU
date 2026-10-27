"use client";

import { Check, ChevronDown, Mail, MailOpen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { deleteMessage, setMessageRead } from "@/lib/actions/admin";
import type { ContactMessage } from "@/lib/data/types";
import { useI18n } from "@/lib/i18n/provider";
import { cn, formatDate } from "@/lib/utils";

import { AdminPageHeader } from "./page-header";

export function MessagesManager({ messages }: { messages: ContactMessage[] }) {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? messages : messages.filter((message) => !message.read)),
    [filter, messages],
  );

  const markRead = async (message: ContactMessage) => {
    setBusyId(message.id);
    await setMessageRead(message.id, !message.read);
    setBusyId(null);
    router.refresh();
  };

  const remove = async (message: ContactMessage) => {
    if (!window.confirm(t("admin.confirmDeleteMessage"))) return;
    setBusyId(message.id);
    await deleteMessage(message.id);
    setBusyId(null);
    router.refresh();
  };

  return (
    <div>
      <AdminPageHeader titleKey="admin.messages" subtitleKey="admin.overview" />

      <div className="mb-5 flex gap-1.5">
        {(
          [
            { key: "all", label: "admin.filterAll" },
            { key: "unread", label: "admin.unread" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold transition",
              filter === tab.key
                ? "border-[#c6a15b]/50 bg-[#c6a15b]/15 text-white"
                : "border-white/10 bg-white/[0.03] text-[#dbe1ec] hover:text-white",
            )}
          >
            {t(tab.label)}
            {tab.key === "unread" ? (
              <span className="ms-1.5 rounded-full bg-[#c6a15b]/25 px-1.5 py-0.5 text-[10px]">
                {messages.filter((message) => !message.read).length}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-sm text-[#c9d2e2]">
          {t("admin.empty")}
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((message) => {
            const open = openId === message.id;
            return (
              <li
                key={message.id}
                className={cn(
                  "overflow-hidden rounded-2xl border transition",
                  message.read
                    ? "border-white/[0.06] bg-white/[0.015]"
                    : "border-[#c6a15b]/20 bg-[#c6a15b]/[0.045]",
                )}
              >
                <div className="flex items-start gap-3 p-4 sm:items-center sm:p-5">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : message.id)}
                    className="flex min-w-0 flex-1 items-start gap-3 text-start sm:items-center"
                    aria-expanded={open}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold",
                        message.read
                          ? "bg-white/[0.05] text-[#dbe1ec]"
                          : "bg-gradient-to-br from-[#c6a15b] to-[#8a6730] text-white",
                      )}
                    >
                      {message.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-sm font-semibold text-white">
                          {message.name}
                        </span>
                        {!message.read ? <Badge tone="info">{t("admin.unread")}</Badge> : null}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-[#dbe1ec]">
                        {message.subject} · <span dir="ltr">{message.email}</span>
                      </span>
                    </span>
                    <span className="hidden shrink-0 text-[10px] text-[#b9c3d6] sm:block">
                      {formatDate(message.createdAt, lang)}
                    </span>
                    <ChevronDown
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0 text-[#c9d2e2] transition sm:mt-0",
                        open && "rotate-180",
                      )}
                    />
                  </button>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => markRead(message)}
                      disabled={busyId === message.id}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-[#eaeef5] transition hover:text-white disabled:opacity-50"
                      aria-label={message.read ? t("admin.markUnread") : t("admin.markRead")}
                    >
                      {message.read ? (
                        <Mail className="h-3.5 w-3.5" />
                      ) : (
                        <MailOpen className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(message)}
                      disabled={busyId === message.id}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-[#eaeef5] transition hover:border-rose-400/40 hover:text-rose-300 disabled:opacity-50"
                      aria-label={t("admin.delete")}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {open ? (
                  <div className="border-t border-white/[0.06] bg-black/20 px-4 py-4 sm:px-5">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-[#eef1f7]">
                      {message.message}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-[#c9d2e2]">
                      <a
                        href={`mailto:${message.email}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[#eef1f7] transition hover:text-white"
                        dir="ltr"
                      >
                        <Mail className="h-3 w-3" />
                        {message.email}
                      </a>
                      <span>{formatDate(message.createdAt, lang)}</span>
                      <button
                        type="button"
                        onClick={() => markRead(message)}
                        className="inline-flex items-center gap-1.5 text-[#d9b877] hover:text-white"
                      >
                        <Check className="h-3 w-3" />
                        {message.read ? t("admin.markUnread") : t("admin.markRead")}
                      </button>
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
