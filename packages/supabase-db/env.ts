import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {},
  server: {
    DATABASE_URL: z.string().url(),
  },
  shared: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
