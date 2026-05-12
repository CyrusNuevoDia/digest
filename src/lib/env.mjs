import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_ENABLED: z.enum(["true", "false"]).default("false"),
  },
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    ROBOTS_DISALLOW: z.enum(["true", "false"]).optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_POSTHOG_ENABLED: process.env.NEXT_PUBLIC_POSTHOG_ENABLED,
    NODE_ENV: process.env.NODE_ENV,
    ROBOTS_DISALLOW: process.env.ROBOTS_DISALLOW,
  },
})
