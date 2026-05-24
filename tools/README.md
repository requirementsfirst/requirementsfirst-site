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
