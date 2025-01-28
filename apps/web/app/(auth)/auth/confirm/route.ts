import type { EmailOtpType } from "@repo/supabase-auth/types";
import type { NextRequest } from "next/server";

import { createClient } from "@repo/supabase-auth/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token");
  const type = searchParams.get("type") as EmailOtpType | null;
  const redirectTo = searchParams.get("redirect_to") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient(cookies());

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(redirectTo);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
