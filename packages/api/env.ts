import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    UMAMI_API_CLIENT_USER_LOGIN: z.string().min(1),
    UMAMI_API_CLIENT_USER_PASSWORD: z.string().min(1),
    UMAMI_API_CLIENT_ENDPOINT: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: {},
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
