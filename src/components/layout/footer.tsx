"use client"

import Link from "next/link"
import { Wordmark } from "@/components/assets/wordmark"
import { Box } from "@/components/layout/box"
import { VStack } from "@/components/layout/stack"
import { cn } from "@/lib/utils"

export const Footer: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <Box className={cn("relative overflow-hidden", className)} {...props}>
    <VStack
      as="footer"
      className="gap-0 p-6 pb-8 text-center text-muted-foreground lg:p-12 lg:pb-16"
      items="center"
      justify="center"
    >
      <Link href="/" prefetch>
        <Wordmark className="scale-125" shimmer />
      </Link>

      <a
        className="mt-8 mb-4 text-muted-foreground text-sm underline underline-offset-2 transition-all hover:text-foreground hover:underline-offset-4"
        href="mailto:cyrus@thegrandlibrary.com"
      >
        Write to us
      </a>

      <h6 className="text-center font-mono text-sm uppercase">© {new Date().getFullYear()}</h6>
    </VStack>
  </Box>
)
