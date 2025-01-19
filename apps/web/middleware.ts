import { updateSession } from "@repo/supabase-auth/middleware";
import { db } from "@repo/supabase-db/db";
import { users } from "@repo/supabase-db/schema";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ignorePaths = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = await updateSession(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userData = await db.select().from(users);
  console.log("Connection database test: user", userData);

  if (
    !user &&
    ignorePaths.every((path) => !request.nextUrl.pathname.startsWith(path))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (
    user &&
    ignorePaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
