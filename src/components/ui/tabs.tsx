"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>

export const Tabs: React.FC<TabsProps> = ({ className, ...props }) => (
  <TabsPrimitive.Root
    className={cn("flex flex-col gap-2", className)}
    data-slot="tabs"
    {...props}
  />
)

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>

export const TabsList: React.FC<TabsListProps> = ({ className, ...props }) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex w-fit items-center justify-center rounded-full border border-muted bg-muted text-muted-foreground dark:border-[.5px]",
      className
    )}
    data-slot="tabs-list"
    {...props}
  />
)

export type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger>

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ className, ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex h-full flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-transparent p-2 font-medium text-foreground text-sm transition-[color,box-shadow] focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background dark:text-muted-foreground dark:data-[state=active]:border-muted dark:data-[state=active]:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className
    )}
    data-slot="tabs-trigger"
    {...props}
  />
)

export type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>

export const TabsContent: React.FC<TabsContentProps> = ({ className, ...props }) => (
  <TabsPrimitive.Content
    className={cn("flex-1 outline-none", className)}
    data-slot="tabs-content"
    {...props}
  />
)
