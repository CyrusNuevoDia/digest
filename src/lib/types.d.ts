declare module "*.mdx" {
  import type { MDXContent } from "mdx/types"

  const Component: MDXContent
  export default Component
}

declare module "*.md" {
  import type { MDXContent } from "mdx/types"

  const Component: MDXContent
  export default Component
}
