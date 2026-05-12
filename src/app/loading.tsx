"use client"

import { motion } from "motion/react"
import { Spinner } from "@/components/ui/spinner"

export default function LoadingPage() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="flex flex-row items-center justify-center gap-3"
      initial={{ opacity: 0 }}
    >
      <Spinner className="mt-1" size={21} variant="ring" />
    </motion.div>
  )
}
