import { appRouter } from "@repo/trpc-api/root";
import { createTRPCContext, fetchRequestHandler } from "@repo/trpc-api/trpc";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const handler = async (req: NextRequest) => {
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () => createTRPCContext(cookies()),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error);
    },
  });
  return response;
};

export { handler as GET, handler as POST };
