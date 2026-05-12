import { cn } from "@/lib/utils"

export type ContainerProps = React.ComponentProps<"section">

export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => (
  <section className={cn("container mx-auto min-w-85 px-4", className)} {...props}>
    {children}
  </section>
)
