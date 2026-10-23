import type { Metadata } from "next";

import { MessagesManager } from "@/components/admin/messages-manager";
import { requireAdmin } from "@/lib/auth";
import { getAdminMessages } from "@/lib/data/admin";

export const metadata: Metadata = { title: "الرسائل", robots: { index: false } };

export default async function AdminMessagesPage() {
  const { supabase } = await requireAdmin();
  const messages = await getAdminMessages(supabase, 100);
  return <MessagesManager messages={messages} />;
}
