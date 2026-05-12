import type { MDXComponents } from "mdx/types"
import { Item } from "@/components/digest/item"
import { linkProps } from "@/lib/utils"

const components: MDXComponents = {
  a: ({ href, children, ...props }) => (
    <a {...linkProps(href.toString())} {...props}>
      {children}
    </a>
  ),
  Item,
}

export const useMDXComponents = () => components
