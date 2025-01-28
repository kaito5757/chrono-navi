import { createClient } from "@repo/supabase-auth/server";
import { TRPCError, initTRPC } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cache } from "react";

export { fetchRequestHandler };

export const createTRPCContext = cache(
  async (cookies: Promise<ReadonlyRequestCookies>) => {
    const client = await createClient(cookies);
    const userResponse = await client.auth.getUser();
    return {
      userResponse,
    };
  },
);

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userResponse.data.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.userResponse.data.user,
    },
  });
});
