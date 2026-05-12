import "./prose.css"
import { cn } from "@/lib/utils"
import { Box, type BoxProps } from "./box"

export const Prose: React.FC<BoxProps> = ({ children, className, ...props }) => (
  <Box className={cn("prose mx-auto w-full max-w-[80ch]", className)} {...props}>
    {children}
  </Box>
)
