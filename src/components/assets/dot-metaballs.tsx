"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const dotmetaballscn = cn("h-[30vh] min-h-[128px] w-screen")

export const DotMetaballsSkeleton = () => <Skeleton className={dotmetaballscn} />

const Metaballs = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.Metaballs),
  { ssr: false, loading: DotMetaballsSkeleton }
)

export const DotMetaballs: React.FC = () => (
  <Metaballs
    className={dotmetaballscn}
    colorBack="#00000000"
    colors={["#cbcada", "#c0d0cb", "#e1dbcd"]}
    count={7}
    size={0.75}
  />
)
