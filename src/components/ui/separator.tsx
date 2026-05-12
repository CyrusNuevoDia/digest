"use client"

import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

export type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root>

export const Separator: React.FC<SeparatorProps> = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) => (
  <SeparatorPrimitive.Root
    className={cn(
      "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
      className
    )}
    data-slot="separator"
    decorative={decorative}
    orientation={orientation}
    {...props}
  />
)
