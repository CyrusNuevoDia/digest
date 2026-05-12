# AGENTS.md

Rules for any AI agent (or human) editing this repo.

## The hands-off rule

**Don't hand-edit files in `content/digests/`.** Those are written by a separate Zo agent that pulls Cyrus's saved items, generates TL;DRs and takeaways, and commits one `.mdx` file per day. Manual edits will produce confusing merge conflicts on the next agent run.

If you need to test rendering or design, create a file with a leading underscore — e.g. `content/digests/_sample.mdx`. The digest loader (`src/lib/digests.ts`) skips any file whose name starts with `_`.

## Auto-deploy

New `.mdx` files committed to `main` should auto-deploy via Vercel. Don't add a competing CI workflow. The existing `.github/workflows/build.yml` only runs lint + a build sanity check.

## Frontmatter schema

Every digest file in `content/digests/` looks like this:

```mdx
---
date: "2026-05-11"           # YYYY-MM-DD in PT, or "backlog" for the special file
title: "May 11, 2026"        # display title; "Backlog" for the backlog file
count: 12                    # number of items in this digest
sources:                     # tally by source type
  x: 10
  github: 2
top_picks:                   # optional, 1–3 best item ids
  - "ab82d6e4..."
---
```

The agent can write any subset of `sources` (only the source types that appear in the digest). Order doesn't matter.

## `<Item>` component contract

The body of each digest is a sequence of `<Item>` components. `Item` is registered globally in `src/mdx-components.tsx`, so MDX files use it without imports.

```tsx
<Item
  id="ab82d6e4d1e45eb7a97321400887cf764d9383eb950bdf6c2418b04cb6dae8a9"
  url="https://x.com/i/web/status/2020557234602717646"
  source="x"
  author="@clairevo"
  title="Boil the ocean — yes is the new no"
  savedAt="2026-05-11T17:55:59-08:00"
  tags={["thread", "engineering-culture"]}
>

**TL;DR.** Drop the "precious engineering bandwidth" framing — build from a token-abundance mindset.

**Takeaways**

- Saying yes scales further than carefully chosen no's when capacity is cheap.
- "Yes is the new no" — Claire's 2024 Figma Config talk; she's standing by it.
- Aligns with @garrytan: boil the ocean, don't ration.

</Item>
```

Props:

| Prop       | Type                                                  | Required | Notes                                                                 |
| ---------- | ----------------------------------------------------- | -------- | --------------------------------------------------------------------- |
| `id`       | `string`                                              | yes      | item id (hex hash); used as the DOM anchor for deep links             |
| `url`      | `string`                                              | yes      | the bookmarked URL; opens in a new tab                                |
| `source`   | `"x" \| "github" \| "youtube" \| "article" \| "other"` | yes      |                                                                       |
| `title`    | `string`                                              | yes      | short — rendered as h2                                                |
| `savedAt`  | `string`                                              | yes      | ISO 8601 with timezone offset                                         |
| `tags`     | `string[]`                                            | no       |                                                                       |
| `author`   | `string`                                              | no       | e.g. `"@clairevo"`                                                    |
| `stars`    | `number`                                              | no       | github                                                                |
| `language` | `string`                                              | no       | github                                                                |
| `duration` | `string`                                              | no       | youtube                                                               |
| `domain`   | `string`                                              | no       | article                                                               |

The body inside the tags is normal MDX/markdown. Start it with a `**TL;DR.**` line — the first paragraph of each item is visually emphasized so it's the focal point. Follow it with a `**Takeaways**` bulleted list.

If you change this contract, update both `src/components/digest/item.tsx` and this file, and tell Cyrus so the Zo agent's writing template can be updated.

## URL structure

- `/` — reverse-chronological index of digests, with the backlog pinned at the bottom.
- `/<date>` — renders `content/digests/<date>.mdx` (e.g. `/2026-05-11`).
- `/backlog` — renders `content/digests/backlog.mdx`.

The Zo agent will SMS the URL `https://digest.cyrusnewday.com/<date>#<item-id>` after each run, so the route shape and the anchor ids need to match.

## Development

```bash
bun install
bun run dev      # next dev
bun run build    # next build
bun run lint     # biome via ultracite
bun run fmt      # biome --write
```

The project uses Bun, Biome (ultracite), and `just`. Don't introduce npm scripts or alternative formatters.

## Layout / styling

- Typography-first reading site. Don't add chrome.
- All copy in MDX files: sentence case for headings.
- Mobile must be flawless — Cyrus reads on his phone before bed.
- No analytics in v1 (PostHog plumbing exists but is gated behind `NEXT_PUBLIC_POSTHOG_ENABLED=true`).

<!-- stripe-projects-cli managed:agents-md:start -->
## Stripe Projects CLI

This repository is initialized for the Stripe project "digest".

## Tools used

- [Stripe CLI](https://docs.stripe.com/stripe-cli) with the `projects` plugin to manage third-party services, credentials, and deployments for this project. Use the stripe-projects-cli to manage deploying and access to third party services.
<!-- stripe-projects-cli managed:agents-md:end -->
