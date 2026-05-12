import { LuStar } from "react-icons/lu"
import { SourceChip } from "@/components/digest/source-chip"
import { cn } from "@/lib/utils"

export type ItemSource = "x" | "github" | "youtube" | "article" | "other"

export type ItemProps = React.PropsWithChildren<{
  id: string
  url: string
  source: ItemSource
  title: string
  savedAt: string
  tags?: string[]
  author?: string
  stars?: number
  language?: string
  duration?: string
  domain?: string
}>

export const Item: React.FC<ItemProps> = ({
  id,
  url,
  source,
  title,
  savedAt,
  tags,
  author,
  stars,
  language,
  duration,
  domain,
  children,
}) => {
  const time = formatSavedAt(savedAt)
  const extras = collectExtras({ author, stars, language, duration, domain })

  return (
    <article
      className="not-prose scroll-mt-24 border-border border-t py-10 first:border-t-0 first:pt-2 md:py-14"
      id={id}
    >
      <header className="mb-5 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <SourceChip source={source} />
          {time && (
            <time className="font-mono text-muted-foreground text-xs" dateTime={savedAt}>
              {time}
            </time>
          )}
        </div>
        <h2 className="text-balance font-semibold font-serif text-2xl italic leading-tight tracking-tight md:text-3xl">
          <a
            className="text-foreground underline decoration-border underline-offset-4 transition-[text-decoration-color,text-underline-offset] hover:decoration-foreground hover:underline-offset-[6px]"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {title}
          </a>
        </h2>
        {(extras.length > 0 || tags?.length) && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-muted-foreground text-sm">
            {extras.map((extra) => (
              <span className="inline-flex items-center gap-1" key={extra.key}>
                {extra.value}
              </span>
            ))}
            {tags?.map((tag) => (
              <span
                className="rounded-full border border-border px-2 py-0.5 font-mono text-xs"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose mx-0 max-w-none">{children}</div>
    </article>
  )
}

type Extra = { key: string; value: React.ReactNode }

const collectExtras = ({
  author,
  stars,
  language,
  duration,
  domain,
}: Pick<ItemProps, "author" | "stars" | "language" | "duration" | "domain">): Extra[] => {
  const extras: Extra[] = []
  if (author) {
    extras.push({ key: "author", value: <span className="font-medium">{author}</span> })
  }
  if (typeof stars === "number") {
    extras.push({
      key: "stars",
      value: (
        <>
          <LuStar className={cn("size-3.5")} />
          {formatStars(stars)}
        </>
      ),
    })
  }
  if (language) {
    extras.push({ key: "language", value: <span>{language}</span> })
  }
  if (duration) {
    extras.push({ key: "duration", value: <span>{duration}</span> })
  }
  if (domain) {
    extras.push({ key: "domain", value: <span>{domain}</span> })
  }
  return extras
}

const STARS_TRAILING_ZERO_RE = /\.0$/

const formatStars = (n: number): string => {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(STARS_TRAILING_ZERO_RE, "")}k`
  }
  return n.toString()
}

const SAVED_AT_RE = /T(\d{2}):(\d{2})/

const formatSavedAt = (savedAt: string): string | null => {
  const match = savedAt.match(SAVED_AT_RE)
  if (!match) {
    return null
  }
  const hour24 = Number(match[1])
  const minute = match[2]
  const period = hour24 >= 12 ? "PM" : "AM"
  const hour12 = ((hour24 + 11) % 12) + 1
  return `${hour12}:${minute} ${period}`
}
