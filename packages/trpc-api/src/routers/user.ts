import { db } from "@repo/supabase-db/db";
import { users } from "@repo/supabase-db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const usersData = await db.select().from(users);
    const authUser = ctx.user.data.user;
    return { usersData, user: authUser?.id };
  }),
});
