import { createClient } from "@repo/supabase-auth/server";
import type { UserResponse } from "@repo/supabase-auth/types";
import { TRPCError, initTRPC } from "@trpc/server";
import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const createTRPCContext = async (
  cookies: ReadonlyRequestCookies | RequestCookies,
): Promise<{ user: UserResponse }> => {
  const client = await createClient(cookies);
  const user = await client.auth.getUser();
  return {
    user,
  };
};

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create();

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user.data.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
