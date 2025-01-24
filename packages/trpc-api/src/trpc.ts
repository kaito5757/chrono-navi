import { createClient } from "@repo/supabase-auth/server";
import type { UserResponse } from "@repo/supabase-auth/types";
import { db } from "@repo/supabase-db/db";
import { initTRPC } from "@trpc/server";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const createTRPCContext = async (opts: {
  cookies: () => Promise<ReadonlyRequestCookies>;
}): Promise<{ user: UserResponse; db: typeof db }> => {
  const client = await createClient(opts.cookies);
  const user = await client.auth.getUser();
  return {
    user,
    db,
  };
};

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create();

export const router = t.router;
export const publicProcedure = t.procedure;
