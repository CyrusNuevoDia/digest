import "server-only"

import fs from "node:fs"
import path from "node:path"
import type { ItemSource } from "@/components/digest/item"

const DIGESTS_DIR = path.join(process.cwd(), "content", "digests")
const SLUG_RE = /^(?:\d{4}-\d{2}-\d{2}|backlog)$/
const MDX_EXT_RE = /\.mdx$/

export type DigestFrontmatter = {
  date: string
  title: string
  count: number
  sources: Partial<Record<ItemSource, number>>
  top_picks?: string[]
}

type DigestModule = {
  default: React.ComponentType
  frontmatter: DigestFrontmatter
}

export type DigestSummary = {
  slug: string
  frontmatter: DigestFrontmatter
}

export const listDigestSlugs = (): string[] => {
  if (!fs.existsSync(DIGESTS_DIR)) {
    return []
  }
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(MDX_EXT_RE, ""))
    .filter((slug) => SLUG_RE.test(slug))
}

export const loadDigest = async (slug: string): Promise<DigestModule> => {
  if (!SLUG_RE.test(slug)) {
    throw new Error(`Invalid digest slug: ${slug}`)
  }
  return (await import(`../../content/digests/${slug}.mdx`)) as DigestModule
}

export const listDigests = async (): Promise<DigestSummary[]> => {
  const slugs = listDigestSlugs()
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter } = await loadDigest(slug)
      return { slug, frontmatter }
    })
  )
  return entries.sort(compareDigests)
}

const compareDigests = (a: DigestSummary, b: DigestSummary): number => {
  if (a.slug === "backlog") {
    return 1
  }
  if (b.slug === "backlog") {
    return -1
  }
  return b.slug.localeCompare(a.slug)
}
