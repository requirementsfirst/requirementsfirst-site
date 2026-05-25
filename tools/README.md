# tools/

Operational scripts for the RequirementsFirst site. Self-contained — these
do not run as part of the Astro build or the Cloudflare deploy. They're for
verifying the live site from your laptop after a change ships.

## verify.mjs — post-deploy sanity check

Hits `https://requirementsfirst.com` in headless Chromium and runs four
assertions against the live deploy:

1. **Fonts.** On a post page, the article H1 is rendered in Inter and a
   paragraph inside `article.app-prose` is rendered in Source Serif 4. On
   the home page, the H1 is also Inter. Confirms the typography stack
   actually reaches the browser (not just declared in CSS).
2. **Default OG image.** `GET /og.png` returns 200, image content type,
   reasonable size (5KB–500KB). Saves the PNG for eyeballing.
3. **Per-post OG image.** The `index.png` under a representative post
   route returns 200, is image content, and is byte-different from the
   default OG — proves the per-post Satori generator is actually firing,
   not silently falling back to the static default.
4. **Newsletter embed.** Exactly one Beehiiv loader script and exactly
   one `<section aria-labelledby="newsletter-signup-heading">` on a post
   page. Catches both regressions: the embed disappearing, and the embed
   being duplicated (e.g. accidentally placed in a shared layout AND the
   post page).

Screenshots land in `tools/screenshots/` and a final verdict in
`tools/verdict.txt`. Both are gitignored.

## Running it

```bash
cd tools
npm install          # installs Playwright; postinstall fetches Chromium
node verify.mjs
```

Exit code is `0` if all checks pass, `1` otherwise.

## When to run it

- After a Cloudflare Pages deploy completes, to confirm the live site
  actually changed the way you expected.
- After any design pass (fonts, OG layout, favicon, layout reshuffles).
- After changes to the content collection (new posts, slug renames) that
  could affect the OG endpoint or break a route.
- Before announcing a change publicly — quick second opinion that what's
  live matches what you intended.

It is intentionally narrow. It is not a full crawl or accessibility
audit; it's a four-bullet smoke test that catches the regressions we've
actually shipped in the past.

## verify-homepage.mjs — homepage polish assertions

Companion to `verify.mjs`. Asserts the editorial homepage treatment is
intact: RSS icon recolour, hero free of article-masthead artefacts,
serif description, Inter sign-off, hero stripped of the Social Links
row, article masthead untouched, and dark-mode CSS coverage for the
new hero elements. Outputs to `verdict-homepage.txt` + `.json` and a
hero screenshot. Run after homepage changes.

```bash
cd tools
node verify-homepage.mjs
```

## now-iso.mjs — safely-past pubDatetime stamp

One-liner that prints the current IST time minus 6 hours, formatted as
`YYYY-MM-DDTHH:mm:ss.000+05:30` — the exact shape Astro Paper expects
in the `pubDatetime` frontmatter field.

```bash
node tools/now-iso.mjs
# 2026-05-25T07:11:48.000+05:30
```

Why this exists: Astro Paper filters posts whose `pubDatetime` is in
the future at build time. We've shipped articles with future-dated
IST stamps three times because the chat-side brain wrote the date
without checking what UTC actually was when Cloudflare built. The
six-hour back-shift guarantees the moment is unambiguously past in
UTC regardless of where the build clock sits, with comfortable buffer
for the gap between paste and deploy.

Run it before creating a new post file and paste the output verbatim
into the frontmatter, ignoring whatever `pubDatetime` was suggested in
the task spec.

## find-threads.mjs — Reddit distribution candidate finder

Surfaces 3-5 ranked candidate threads to comment on each day. Hits
Reddit's public JSON search API across a small set of BA / PM / agile
subreddits using a configurable keyword list, applies sanity filters
(no dead/stickied/old/off-topic threads), and scores survivors by
question-shape, freshness, comment-volume, and effort signals (post
body length, question verbs in title).

The script needs no dependencies beyond Node's built-in `fetch` (Node
18+) and no API keys. It identifies itself with a User-Agent header
and sleeps 1 s between requests to stay polite. 429s get one 5 s
back-off retry; 403/404 sub responses are logged and skipped without
aborting the run.

```bash
node tools/find-threads.mjs
```

Output is markdown — top 5 candidates with URL, age, score/comment
counts, and a 200-char snippet — printed to stdout *and* saved to
`tools/thread-candidates-YYYY-MM-DD.md` for history. The history files
are gitignored; keep them locally if you want to scan past weeks.

Edit the `SUBS` and `QUERIES_PER_SUB` constants at the top of the file
when distribution targets shift. Future work: CLI args for one-off
overrides without editing the file.

Use it as the first step of the daily distribution routine: run it,
pick one thread that's actually worth a thoughtful comment, write the
comment by hand.
