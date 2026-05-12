import Link, { type LinkProps } from "next/link"
import { HoverButton, type HoverButtonProps } from "@/components/ui/hover-button"
import { cn, linkProps } from "@/lib/utils"

export type CTALinkButtonProps<R extends string> = LinkProps<R> & HoverButtonProps

export const CTALinkButton = <R extends string>({
  className,
  variant,
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  onMouseEnter,
  onTouchStart,
  onClick,
  onNavigate,
  children,
  disabled,
}: CTALinkButtonProps<R>) => (
  <Link
    {...linkProps<R>(href)}
    aria-disabled={disabled}
    as={as}
    className={cn("inline-block", disabled && "pointer-events-none")}
    locale={locale}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onNavigate={onNavigate}
    onTouchStart={onTouchStart}
    passHref={passHref}
    prefetch={prefetch}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
  >
    <HoverButton className={className} disabled={disabled} tabIndex={-1} variant={variant}>
      {children}
    </HoverButton>
  </Link>
)
