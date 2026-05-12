import { LuLink } from "react-icons/lu"
import { SiGithub, SiX, SiYoutube } from "react-icons/si"
import type { ItemSource } from "@/components/digest/item"
import { cn } from "@/lib/utils"

type SourceMeta = {
  label: string
  Icon: React.ComponentType<{ className?: string }>
}

const SOURCE_META: Record<ItemSource, SourceMeta> = {
  x: { label: "X", Icon: SiX },
  github: { label: "GitHub", Icon: SiGithub },
  youtube: { label: "YouTube", Icon: SiYoutube },
  article: { label: "Article", Icon: LuLink },
  other: { label: "Link", Icon: LuLink },
}

export type SourceChipProps = React.ComponentProps<"span"> & {
  source: ItemSource
}

export const SourceChip: React.FC<SourceChipProps> = ({ source, className, ...props }) => {
  const meta = SOURCE_META[source]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-muted-foreground text-xs uppercase tracking-wide",
        className
      )}
      {...props}
    >
      <meta.Icon className="size-3.5" />
      {meta.label}
    </span>
  )
}
