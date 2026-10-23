import { redirect } from "next/navigation";
import { cache } from "react";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "admin" | "user";
};

export const getCurrentUser = cache(async () => {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getCurrentProfile = cache(async (): Promise<Profile | null> => {
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .maybeSingle();
  if (!data) {
    return { id: user.id, email: user.email ?? null, full_name: null, role: "user" };
  }
  return data as Profile;
});

/**
 * Server-side admin gate. This is the authoritative check used by the admin
 * layout and every privileged server action. RLS provides a second layer.
 */
export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    redirect("/login?setup=required");
  }
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?next=/admin");
  }
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") {
    redirect("/login?error=forbidden");
  }
  const supabase = await createSupabaseServerClient();
  return { user, profile, supabase };
}
