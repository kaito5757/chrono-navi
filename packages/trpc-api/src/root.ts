import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { userRouter } from "./routers/user";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  web: {
    user: userRouter,
  },
  admin: {
    user: userRouter,
  },
});

export const createCaller = createCallerFactory(appRouter);
export type AppRouter = typeof appRouter;
export type AppRouterInputs = inferRouterInputs<AppRouter>;
export type AppRouterOutputs = inferRouterOutputs<AppRouter>;
