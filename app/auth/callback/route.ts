import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextParam = url.searchParams.get("next") ?? "/admin";
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/admin";

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(new URL("/login?setup=required", url.origin));
  }

  if (code) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        return NextResponse.redirect(new URL("/login?error=auth", url.origin));
      }
    } catch {
      return NextResponse.redirect(new URL("/login?error=auth", url.origin));
    }
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
