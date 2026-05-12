import type { StackProps } from "@/components/layout/stack"
import { HStack } from "@/components/layout/stack"
import { cn } from "@/lib/utils"

export type HeroTitleProps = React.ComponentProps<"h1">

export const HeroTitle: React.FC<HeroTitleProps> = ({ className, children, ...props }) => (
  <h1
    className={cn(
      "text-center font-300 font-serif text-xl italic leading-[0.95] md:text-2xl lg:text-left lg:text-3xl",
      className
    )}
    {...props}
  >
    {children}
  </h1>
)

export type HeroLedeProps = React.ComponentProps<"h3">

export const HeroLede: React.FC<HeroLedeProps> = ({ className, children, ...props }) => (
  <h3
    className={cn("text-center text-muted-foreground leading-relaxed lg:text-left", className)}
    {...props}
  >
    {children}
  </h3>
)

export type HeroCTAProps = StackProps

export const HeroCTA: React.FC<HeroCTAProps> = ({ className, children, ...props }) => (
  <HStack
    className={cn("mt-1 gap-2 lg:justify-start", className)}
    items="center"
    justify="center"
    wrap
    {...props}
  >
    {children}
  </HStack>
)
