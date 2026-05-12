"use client"

import { useTheme } from "next-themes"
import { useCallback, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { LuMoon, LuSun } from "react-icons/lu"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export type ThemeTogglerProps = React.ComponentPropsWithoutRef<"button"> & {
  duration?: number
}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  className,
  duration = 0.4,
  ...props
}) => {
  const reducedMotion = useReducedMotion()
  const { resolvedTheme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) {
      return
    }

    const next = isDark ? "light" : "dark"

    if (!document.startViewTransition || reducedMotion) {
      setTheme(next)
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
    await transition.ready

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] },
      {
        duration: duration * 1000,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration, reducedMotion, setTheme])

  return (
    <button
      aria-label="Toggle theme"
      className={cn(
        "rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      onClick={toggleTheme}
      ref={buttonRef}
      type="button"
      {...props}
    >
      {mounted && isDark ? <LuSun className="size-4" /> : <LuMoon className="size-4" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
