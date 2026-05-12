import posthog from "posthog-js"
import { env } from "@/lib/env.mjs"

if (env.NEXT_PUBLIC_POSTHOG_ENABLED === "true" && env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    ui_host: "https://us.i.posthog.com",
    defaults: "2026-01-30",
    person_profiles: "always",
  })
}
