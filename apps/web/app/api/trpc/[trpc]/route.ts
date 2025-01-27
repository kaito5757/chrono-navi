import { appWebRouter } from "@repo/trpc-api/root";
import { createTRPCContext } from "@repo/trpc-api/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";

const handler = async (req: NextRequest) => {
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appWebRouter,
    req,
    createContext: () => createTRPCContext(req.cookies),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error);
    },
  });

  return response;
};

export { handler as GET, handler as POST };
