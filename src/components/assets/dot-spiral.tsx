"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const dotspiralcn = cn("h-[30vh] min-h-[240px] w-full rounded-lg")

export const DotSpiralSkeleton = () => <Skeleton className={dotspiralcn} />

const Dithering = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.Dithering),
  { ssr: false, loading: DotSpiralSkeleton }
)

export const DotSpiral: React.FC = () => (
  <Dithering
    className={dotspiralcn}
    colorBack="#00000000"
    colorFront="#74abae"
    scale={0.75}
    shape="swirl"
    size={1}
    speed={0.25}
    type="4x4"
  />
)
