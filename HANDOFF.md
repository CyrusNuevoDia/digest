# `digest` — handoff for the coding agent

You're building **`digest`**: a small site that renders a daily reading digest of things Cyrus saved during the day. The content is written for you by a separate Zo agent that commits .mdx files into this repo. Your job is the **app, the design, and the deploy** — Cyrus is choosing the stack, framework, and host himself, so this doc only covers the **content contract** you need to honor.

Cyrus saves links throughout the day (mostly X bookmarks, plus some GitHub repos). Each evening at 8pm PT, the Zo agent runs, pulls the last 24h of saves, generates a punchy TL;DR + key takeaways for each one, writes a new `.mdx` file into this repo, and pushes. The site auto-deploys. The agent then SMSes Cyrus the link to the day's page.

---

## Content model

A digest is **one `.mdx` file per day**, named by the day the items were saved (Pacific time):

```
content/digests/2026-05-11.mdx
content/digests/2026-05-12.mdx
...
```

There is also exactly **one** special file:

```
content/digests/backlog.mdx
```

…which contains the one-time dump of every bookmark saved before this system started. Treat it like any other digest, but its "date" is "Backlog".

### .mdx file shape

Every digest file looks like this:

```mdx
---
date: "2026-05-11" # YYYY-MM-DD in PT; "backlog" for the backlog file
title: "May 11, 2026" # Pretty display title; "Backlog" for the backlog file
count: 12 # Number of items in this digest
sources: # Tally by source type
  x: 10
  github: 2
top_picks: # Optional. IDs of 1-3 items the agent thinks are the best
  - "ab82d6e4..."
---

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

<Item
  id="f0f18dad..."
  url="https://github.com/imputnet/helium"
  source="github"
  title="imputnet/helium"
  savedAt="2026-05-11T09:14:35-08:00"
  tags={["browser", "privacy"]}
  stars={15747}
  language="C++"
>

**TL;DR.** Privacy-first Chromium fork with built-in ad-blocking. Beta.

**Takeaways**

- Positioned against Brave/Arc; pitch is "no bloat, no noise".
- C++ on Chromium base — non-trivial maintenance commitment.
- 15.7k stars, 387 forks, very active.

</Item>
```

Two things to notice:

1. **Frontmatter is metadata-only.** Title, date, counts, top picks. Use it for the index page, sorting, SEO.
2. **Body is a sequence of `<Item>` MDX components**, one per bookmark, with markdown inside. The agent will write the markdown body (TL;DR + Takeaways). You design `<Item>`.

---

## `<Item>` MDX component — required prop contract

This is the single most important component in the app. Implement it once, well. The Zo agent writes these props by hand into every .mdx file, so the names and types here are a contract.

```ts
type ItemProps = {
  id: string; // keep item id (hex hash); use as the DOM id for anchor links
  url: string; // the bookmarked URL (open in a new tab)
  source: "x" | "github" | "youtube" | "article" | "other";
  title: string; // short — render as h2/h3
  savedAt: string; // ISO 8601 with timezone offset
  tags?: string[];
  author?: string; // e.g. "@clairevo"
  // source-specific extras (all optional):
  stars?: number; // github
  language?: string; // github
  duration?: string; // youtube
  domain?: string; // article
  children: React.ReactNode; // the TL;DR + Takeaways markdown
};
```

The `id` prop should become the DOM anchor (`<section id={id}>` or similar) so the SMS can deep-link to a specific item: `https://<your-domain>/2026-05-11#ab82d6e4...`.

If you change this contract later, tell Cyrus so the agent's writing template can be updated.

---

## URL structure

The Zo agent will SMS Cyrus URLs in this exact shape, so the routes need to match:

- `/` — Index. Reverse-chronological list of all digests with item counts and source breakdowns.
- `/<date>` — Renders `content/digests/<date>.mdx`, where `<date>` is the file basename (e.g. `2026-05-11`).
- `/backlog` — Renders `content/digests/backlog.mdx`.

Every new .mdx file the agent commits should become a live page at `/<basename>` after the next deploy.

---

## Design intent

This is a **reading site**, not a portfolio. The vibe target is a hybrid of Readwise's daily review and a personal blog.

- Typography-first. Generous line-height, comfortable measure, no walls of text.
- Mobile must be flawless — Cyrus reads on his phone before bed.
- One item per card, lightly separated. Don't over-design the card chrome.
- Source gets a small visual tell (favicon + one-word chip) but the TL;DR is the focal point.
- The `**TL;DR.**` first line of each item is the hook — style it so the eye lands on it first.
- Takeaways: tight bulleted list, generous spacing between bullets.
- External links open in a new tab.
- No comments, reactions, or share buttons. Just reading.

---

## Auth

Default to **public, no auth**. Most of this is already publicly bookmarked content.

If Cyrus asks for protection later, simplest options are platform-level password protection or a tiny basic-auth middleware against a single shared secret. Don't build account/email auth — there's exactly one reader.

Optionally support a `ROBOTS_DISALLOW=true` env-driven `robots.txt` so the site can be quickly delisted from search.

---

## AGENTS.md (please create this in the repo root)

Drop an `AGENTS.md` so future agents touching this repo know the rules:

- "Don't hand-edit files in `content/digests/`. Those are written by a separate Zo agent. Conflicts will be confusing."
- "If you need to test rendering, create `content/digests/_sample.mdx` (leading underscore so it's ignored) and skip leading-underscore files in the digest loader."
- "New digest files should auto-deploy on push to `main`. Don't add CI that competes with that."
- Copy the .mdx schema from this handoff.

---

## What the Zo agent (separately) does — context only

You don't need to build any of this, but knowing the shape helps you make good choices:

1. At 8pm PT daily, fetch the last 24h of saved items from the `keep` CLI.
2. For each item: get the extracted markdown, then generate a 1-line TL;DR + 2-4 bullet takeaways.
3. Bucket items by save-date in PT (usually just today).
4. Write `content/digests/YYYY-MM-DD.mdx` into a local clone of this repo, following the schema above.
5. `git add`, `git commit`, `git push`.
6. SMS Cyrus the new page's URL.

The agent writes `.mdx` files using exactly the schema above. If the schema changes, the agent's template needs to change with it.

---

## First-pass scope ("done" for v1)

1. Repo initialized, pushed to GitHub, auto-deploys on push.
2. `/` renders an index of digests from `content/digests/`.
3. `/<date>` and `/backlog` render their .mdx files with working `<Item>` cards.
4. Mobile-clean, typography dialed in.
5. `AGENTS.md` written so the Zo agent knows the contract.
6. Drop a `content/digests/_sample.mdx` with 2-3 fake items so the design can be reviewed before any real content lands.
7. Send Cyrus the URL.

No auth, no analytics, no fancy interactions in v1. Reader + ship.

---

## Things to ask Cyrus before shipping

- Custom domain, or fine with the platform's default URL for now?
- Any visual references he wants to crib from?

If no answer, ship on the default URL with no auth and iterate.
