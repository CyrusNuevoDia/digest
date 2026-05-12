import type { MetadataRoute } from "next"

const isDisallowed = process.env.ROBOTS_DISALLOW === "true"

const robots: MetadataRoute.Robots = {
  rules: isDisallowed ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
}

export default () => robots
