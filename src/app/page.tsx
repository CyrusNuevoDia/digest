import { SummaryCard } from "@/components/digest/summary-card"
import { Prose } from "@/components/layout/prose"
import { listDigests } from "@/lib/digests"

export default async function IndexPage() {
  const digests = await listDigests()
  const dated = digests.filter((d) => d.slug !== "backlog")
  const backlog = digests.find((d) => d.slug === "backlog")

  return (
    <Prose>
      {digests.length === 0 ? (
        <p className="text-muted-foreground">
          No digests yet. The first one will land here once the agent runs.
        </p>
      ) : (
        <>
          {dated.map((d) => (
            <SummaryCard frontmatter={d.frontmatter} key={d.slug} slug={d.slug} />
          ))}
          {backlog && (
            <>
              <h3 className="mt-12 font-mono text-muted-foreground text-xs uppercase tracking-wide">
                Older
              </h3>
              <SummaryCard frontmatter={backlog.frontmatter} slug={backlog.slug} />
            </>
          )}
        </>
      )}
    </Prose>
  )
}
