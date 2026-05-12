import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { ItemSource } from "@/components/digest/item"
import { SourceChip } from "@/components/digest/source-chip"
import { Prose } from "@/components/layout/prose"
import { listDigestSlugs, loadDigest } from "@/lib/digests"

export const dynamicParams = false

const SOURCE_ORDER: ItemSource[] = ["x", "github", "youtube", "article", "other"]

export const generateStaticParams = (): Array<{ slug: string }> =>
  listDigestSlugs().map((slug) => ({ slug }))

type PageProps = {
  params: Promise<{ slug: string }>
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  try {
    const { frontmatter } = await loadDigest(slug)
    return { title: frontmatter.title }
  } catch {
    return {}
  }
}

export default async function DigestPage({ params }: PageProps) {
  const { slug } = await params

  let mod: Awaited<ReturnType<typeof loadDigest>>
  try {
    mod = await loadDigest(slug)
  } catch {
    notFound()
  }

  const { default: Content, frontmatter } = mod
  const sources = SOURCE_ORDER.flatMap((source) => {
    const n = frontmatter.sources?.[source]
    return n ? [{ source, n }] : []
  })

  return (
    <Prose>
      <header className="not-prose mb-6 border-border border-b pb-6">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className="font-semibold font-serif text-3xl italic leading-tight tracking-tight md:text-4xl">
            {frontmatter.title}
          </h1>
          {slug !== "backlog" && (
            <span className="font-mono text-muted-foreground text-xs">{slug}</span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-sm">
          <span className="font-medium">
            {frontmatter.count} item{frontmatter.count === 1 ? "" : "s"}
          </span>
          {sources.map(({ source, n }) => (
            <span className="inline-flex items-center gap-1.5" key={source}>
              <SourceChip source={source} />
              <span className="font-mono text-xs">×{n}</span>
            </span>
          ))}
        </div>
      </header>
      <Content />
    </Prose>
  )
}
