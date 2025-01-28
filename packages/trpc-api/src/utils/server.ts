import "server-only";

import { cache } from "react";

import type { appRouter } from "@repo/trpc-api/root";
import { createCaller } from "@repo/trpc-api/root";
import { createTRPCContext } from "@repo/trpc-api/trpc";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cookies } from "next/headers";
import { makeQueryClient } from "../utils/query-client";

export const getQueryClient = cache(makeQueryClient);

export const createServerApi = async () => {
  return createHydrationHelpers<typeof appRouter>(
    createCaller(await createTRPCContext(cookies())),
    getQueryClient,
  );
};
