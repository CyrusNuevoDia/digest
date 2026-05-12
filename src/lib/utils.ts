import { type ClassValue, clsx } from "clsx"
import type { LinkProps } from "next/link"
import { twMerge } from "tailwind-merge"

export const cast = <A, B>(a: A): B => a as unknown as B

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const isExternalLink = (href: string) =>
  !(
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:")
  )

export const linkProps = <R extends string>(href: LinkProps<R>["href"]) =>
  isExternalLink(href.toString())
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href }

export type CSS = React.CSSProperties & {
  [variable: `--${string}`]: string | number
}

export const css = (styles: CSS) => styles as React.CSSProperties
