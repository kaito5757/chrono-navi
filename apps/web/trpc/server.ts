import { cache } from "react";

import { createCaller } from "@repo/trpc-api/root";
import { createTRPCContext } from "@repo/trpc-api/trpc";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache((cookies: ReadonlyRequestCookies) => {
  return createTRPCContext(cookies);
});

export const createApi = async (cookies: ReadonlyRequestCookies) =>
  createCaller(await createContext(cookies));
