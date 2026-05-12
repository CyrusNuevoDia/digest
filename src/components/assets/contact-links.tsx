"use client"

import { useCallback } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useMounted } from "@/hooks/use-mounted"
import { deobfuscate, obfuscate } from "@/lib/obfuscate" with { type: "macro" }
import { cn } from "@/lib/utils"

export type ContactLinkProps = Omit<React.ComponentProps<"a">, "href" | "children">

type ObfuscatedLinkProps = ContactLinkProps & {
  href: number[]
  children: number[]
}

const ObfuscatedLink: React.FC<ObfuscatedLinkProps> = ({
  href,
  onClick,
  className,
  children,
  ...props
}) => {
  const isMounted = useMounted()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      e.stopPropagation()
      onClick?.(e)
      window.location.href = deobfuscate(href)
    },
    [href, onClick]
  )

  return (
    // biome-ignore lint/a11y/useValidAnchor: silence!
    <a
      className={cn(
        "transition-all duration-100",
        "underline underline-offset-2 hover:underline-offset-4",
        className
      )}
      href="#"
      onClick={handleClick}
      {...props}
    >
      {isMounted ? deobfuscate(children) : <Skeleton className="h-[1.5em] w-[12ch]" />}
    </a>
  )
}

const email = {
  href: obfuscate("mailto:cyrus@thegrandlibrary.com"),
  text: obfuscate("cyrus@thegrandlibrary.com"),
}

export const EmailLink: React.FC<ContactLinkProps> = ({ className, onClick, ...props }) => (
  <ObfuscatedLink className={className} href={email.href} onClick={onClick} {...props}>
    {email.text}
  </ObfuscatedLink>
)
