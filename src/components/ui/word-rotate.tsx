"use client"

import { AnimatePresence, type MotionProps, motion } from "motion/react"
import { useEffect, useState } from "react"
import { onlyText } from "react-children-utilities"
import { Box, type BoxProps } from "@/components/layout/box"
import { cn } from "@/lib/utils"

export type WordRotateProps = BoxProps & {
  words: React.ReactNode[]
  duration?: number
  motionProps?: MotionProps
  className?: string
}

export const WordRotate: React.FC<WordRotateProps> = ({
  words,
  duration = 2000,
  motionProps = {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 },
    transition: { duration: 0.15, ease: "easeOut" },
  },
  className,
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <Box className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1 className={cn(className)} key={onlyText(words[index])} {...motionProps}>
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </Box>
  )
}
