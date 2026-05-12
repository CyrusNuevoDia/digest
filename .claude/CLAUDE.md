# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses Bun as the primary package manager and runtime. All development commands should use `bun` instead of `npm`.

- **Development server**: `bun run dev` or `just dev`
- **Production build**: `bun run build`
- **Production preview**: `bun run build && bun run start` or `just preview`
- **Linting**: `bun run lint` or `just lint` (uses Biome)
- **Formatting**: `bun run format` or `just fmt` (uses Biome)

The project includes a `justfile` for convenient task running. Use `just <command>` for common tasks.

## Architecture Overview

This is a Next.js 16 application with the App Router, built as a marketing landing page for The Grand Library. Key architectural decisions:

### Project Structure

- **App Directory**: `src/app/` - Next.js 16 App Router structure
  - Root layout and page in `src/app/`
  - Global styles in `src/app/globals.css`
- **Components**: `src/components/` - React components organized by purpose
  - `src/components/ui/` - Reusable UI components (shadcn/ui + custom)
  - `src/components/providers/` - React context providers
- **Utilities**: `src/lib/` - Shared utilities and helpers

### Key Technologies

- **Framework**: Next.js 15 with App Router and React 19
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: shadcn/ui (New York style) + custom animated components
- **MDX**: Content pages using @next/mdx with frontmatter support
- **Theming**: next-themes for dark/light mode
- **Code Quality**: Biome for linting and formatting (replaces ESLint/Prettier)
- **Fonts**: Inter (sans), Geist Mono, Crimson Pro (serif)

### Component Architecture

- Uses compound component patterns for complex UI (Tabs, Accordion, etc.)
- Extensive use of animation libraries (Framer Motion via "motion" package)
- Custom UI components with variant-based styling using class-variance-authority
- Radix UI primitives as foundation for accessible components

### Styling Conventions

- Tailwind with CSS variables for theming
- Custom animations and micro-interactions throughout
- Responsive design with mobile-first approach
- Uses `cn()` utility (clsx + tailwind-merge) for conditional classes

### MDX Content

- Content pages are in `src/app/(mdx)/` with dedicated layout
- Supports frontmatter with remark plugins
- Pages include: `/agi`, `/researchers`, `/biopharma`

## Development Notes

- The codebase uses TypeScript strict mode
- Biome is configured with Next.js and React domain rules
- Components follow the "use client" directive pattern where needed for interactivity
- Path aliases are configured: `@/` maps to `src/`
- Analytics integration with PostHog
- The site targets researchers, AI labs, and biopharma companies

## Coding Style

Follow these established TypeScript/React patterns when writing components:

### Component Definition Patterns

- Use `export const ComponentName: React.FC<Props>` for component definitions
- Named exports for all components (avoid `export default` except for Next.js pages)
- Use `React.ComponentProps<"element">` to extend HTML element props
- Combine custom props with intersection types: `React.ComponentProps<"div"> & CustomProps`

### TypeScript Conventions

- Define component props with `export type ComponentNameProps`
- Use `type` keyword for type definitions (not `interface`)
- Use `React.FC<React.PropsWithChildren<Props>>` for components with children
- Import types with `import type` when possible

### File Organization

- "use client" directive at the top when client-side features are needed
- Import order: external packages → internal components with `@/` alias
- Group related exports at the bottom: `export { Component1, Component2, ... }`

### Component Patterns

- Use `forwardRef` when components need ref forwarding:
  ```tsx
  export const Component = forwardRef<HTMLElement, Props>(
    ({ className, ...props }, ref) => (...)
  )
  ```
- For compound components, define sub-components as functions and export together
- Use `data-slot` attributes for component parts in UI libraries

### Styling Approach

- Use `cva()` (class-variance-authority) for variant-based component styling
- Apply `cn()` utility for combining conditional classes
- Define variants object with TypeScript for type safety
- Use Tailwind classes with responsive prefixes (`md:`, `lg:`, etc.)

### Props and Event Handling

- Destructure `className` and spread remaining props: `{ className, ...props }`
- Use `React.ComponentProps<typeof SomeComponent>` for extending third-party components
- Handle events with proper TypeScript typing

## Common Patterns

- Animation components wrap content with presets like `blur`, `fade`
- Theme switching is available throughout the app
- Charts and data visualization using Recharts
- Logo marquee and testimonial sections for social proof
- Mobile-responsive navigation and interactions

## Prose

For prose in .md/.mdx files, use sentence case for headings.

# Ultracite Code Standards

This project uses **Ultracite**, a zero-config Biome preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `bun x ultracite fix`
- **Check for issues**: `bun x ultracite check`
- **Diagnose setup**: `bun x ultracite doctor`

Biome (the underlying engine) provides extremely fast Rust-based linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**

- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**

- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**

- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `bun x ultracite fix` before committing to ensure compliance.
