import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { userRouter } from "./router/user";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appWebRouter = createTRPCRouter({
  user: userRouter,
});

export const createCaller = createCallerFactory(appWebRouter);
export type AppWebRouter = typeof appWebRouter;
export type AppWebRouterInputs = inferRouterInputs<AppWebRouter>;
export type AppWebRouterOutputs = inferRouterOutputs<AppWebRouter>;
