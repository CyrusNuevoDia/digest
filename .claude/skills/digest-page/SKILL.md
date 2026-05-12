---
name: digest-page
description: Write a new digest page under `content/digests/`. Use when producing a real dated digest (`YYYY-MM-DD.mdx`), updating the backlog, or scaffolding a `_*.mdx` for design/render testing. Covers file location, frontmatter, the `<Item>` contract, and how to verify locally.
---

# Writing a digest page

A digest is a single `.mdx` file in `content/digests/` that renders at `/<slug>`. The full contract lives in `AGENTS.md` (frontmatter schema, `<Item>` props, URL structure) — this skill is the workflow on top of it. Read both.

## When to use

- Generating a daily digest (`YYYY-MM-DD.mdx`).
- Adding or updating `content/digests/backlog.mdx`.
- Scaffolding a `_<name>.mdx` test file to iterate on rendering without polluting the live index.

Don't hand-edit an existing dated digest unless the user explicitly asks. Those files are owned by the Zo agent — concurrent edits cause merge conflicts on the next run (`AGENTS.md` § the hands-off rule).

## File path and naming

| Kind | Path | Route |
| --- | --- | --- |
| Daily | `content/digests/YYYY-MM-DD.mdx` (date in PT) | `/YYYY-MM-DD` |
| Backlog | `content/digests/backlog.mdx` | `/backlog` |
| Test/design | `content/digests/_<anything>.mdx` | none — skipped |

The loader (`src/lib/digests.ts:8`) validates slugs with `^(?:\d{4}-\d{2}-\d{2}|backlog)$` and skips any file whose name starts with `_` (line 35). A misnamed file silently fails to render rather than throwing — name it correctly the first time.

## Frontmatter

Canonical spec: `AGENTS.md` § frontmatter schema. Quick reference:

```yaml
---
date: "2026-05-11"        # YYYY-MM-DD in PT, or "backlog"
title: "May 11, 2026"     # display title; "Backlog" for the backlog file
count: 12                 # number of <Item>s in the body
sources:                  # tally by source — include only types that appear
  x: 10
  github: 2
top_picks:                # optional, 1–3 item ids
  - "ab82d6e4..."
---
```

`sources` keys are restricted to `x | github | youtube | article | other` (the `ItemSource` union in `src/components/digest/item.tsx:5`). Order within `sources` doesn't matter. `count` should equal the number of `<Item>` elements in the body — keep them in sync.

## `<Item>` contract

`Item` is registered globally in `src/mdx-components.tsx:11` — do **not** import it in MDX. Canonical spec: `AGENTS.md` § `<Item>` component contract. Type: `ItemProps` at `src/components/digest/item.tsx:7-19`.

Required props: `id`, `url`, `source`, `title`, `savedAt`.
Optional props: `tags` (string[]), `author`, `stars` (number, github), `language` (github), `duration` (youtube), `domain` (article).

| Prop | Notes |
| --- | --- |
| `id` | Hex hash — used as the DOM anchor for deep links (`/<slug>#<id>`). Must be unique within the file. |
| `url` | The bookmarked URL. Opens in a new tab automatically. |
| `source` | One of `x \| github \| youtube \| article \| other`. |
| `title` | Short — rendered as `h2`. Sentence case. |
| `savedAt` | ISO 8601 with timezone offset, e.g. `2026-05-11T17:55:59-08:00`. |

Body convention: open with a `**TL;DR.**` paragraph (visually emphasized as the focal point), then a `**Takeaways**` bullet list. Standard MDX/markdown inside.

## Paste-ready scaffold

```mdx
---
date: "2026-05-12"
title: "May 12, 2026"
count: 1
sources:
  x: 1
---

<Item
  id="REPLACE_WITH_SHA256_HEX"
  url="https://..."
  source="x"
  author="@handle"
  title="Sentence-case headline"
  savedAt="2026-05-12T09:30:00-08:00"
  tags={["tag-a", "tag-b"]}
>

**TL;DR.** One-sentence punch.

**Takeaways**

- Bullet.
- Bullet.

</Item>
```

For a fuller example with multiple sources (`x`, `github`, `article`) and the optional `stars` / `language` / `domain` props, read `content/digests/_sample.mdx`.

## Verify

After writing the file:

1. `bun run dev` and open `http://localhost:3000/<slug>` (or `http://localhost:3000/` for the index).
2. Confirm the deep link works: `http://localhost:3000/<slug>#<item-id>`.
3. `bun run build` — confirms MDX compiles and frontmatter parses. Catches missing required `<Item>` props at build time.
4. Biome runs automatically after Edit/Write via the `PostToolUse` hook in `.claude/settings.json`. Run `bun run lint` manually if you want to re-check.

## Don'ts

- Don't import `Item` — it's already in scope via `src/mdx-components.tsx`.
- Don't hand-edit existing dated `.mdx` files unless the user explicitly asks.
- Don't add npm scripts, alternative formatters, or competing CI workflows (`AGENTS.md` § development, auto-deploy).
- Don't add page chrome, analytics, or non-typographic styling — this is a reading site.
- Don't invent new `source` values; the union is closed.
