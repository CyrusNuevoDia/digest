import { Box, type BoxProps } from "@/components/layout/box"
import { TextShimmer } from "@/components/ui/text-shimmer"
import { cn } from "@/lib/utils"

export type WordmarkProps = BoxProps & {
  shimmer?: boolean
}

// Do not extract the text elements into their own components,
// they need to be inline to work with the TextShimmer component.
export const Wordmark: React.FC<WordmarkProps> = ({ shimmer, className, ...props }) => (
  <Box
    className={cn(
      className,
      "text-center font-serif text-bold text-xl italic leading-[0.8] tracking-tight"
    )}
    {...props}
  >
    {shimmer ? (
      <TextShimmer as="h2" spread={4}>
        The Grand Library
      </TextShimmer>
    ) : (
      <h2>The Grand Library</h2>
    )}
  </Box>
)
