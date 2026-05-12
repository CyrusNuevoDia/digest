import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type TextExplainProps = React.ComponentProps<typeof Popover> & {
  text: React.ReactNode
  explanation: React.ReactNode
  className?: string
}

export const TextExplain: React.FC<TextExplainProps> = ({
  text,
  explanation,
  className,
  ...props
}) => (
  <Popover {...props}>
    <PopoverTrigger asChild>
      <span
        className={cn(
          "cursor-help underline decoration-muted-foreground decoration-dashed underline-offset-3",
          className
        )}
      >
        {text}
      </span>
    </PopoverTrigger>
    <PopoverContent>
      <p className="text-balance text-muted-foreground">{explanation}</p>
    </PopoverContent>
  </Popover>
)
