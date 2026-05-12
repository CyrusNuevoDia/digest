import { Box, type BoxProps } from "@/components/layout/box"
import { cn } from "@/lib/utils"

export const Skeleton: React.FC<BoxProps> = ({ className, ...props }) => (
  <Box
    className={cn("animate-pulse rounded-lg bg-muted", className)}
    data-slot="skeleton"
    {...props}
  />
)
