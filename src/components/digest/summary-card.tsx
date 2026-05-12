import Link from "next/link"
import type { ItemSource } from "@/components/digest/item"
import { SourceChip } from "@/components/digest/source-chip"
import type { DigestFrontmatter } from "@/lib/digests"
import { cn } from "@/lib/utils"

const SOURCE_ORDER: ItemSource[] = ["x", "github", "youtube", "article", "other"]

export type SummaryCardProps = {
  slug: string
  frontmatter: DigestFrontmatter
  className?: string
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ slug, frontmatter, className }) => {
  const href = `/${slug}` as const
  const sources = SOURCE_ORDER.flatMap((source) => {
    const n = frontmatter.sources?.[source]
    return n ? [{ source, n }] : []
  })

  return (
    <Link
      className={cn(
        "not-prose group block border-border border-t py-6 transition-colors first:border-t-0 first:pt-0 hover:bg-muted/40 focus-visible:bg-muted/60 focus-visible:outline-none md:py-8",
        className
      )}
      href={href}
      prefetch
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="font-semibold font-serif text-2xl italic leading-tight tracking-tight md:text-3xl">
          {frontmatter.title}
        </h2>
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
    </Link>
  )
}
