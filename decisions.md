# RequirementsFirst — Strategic Decisions Log

Locked decisions with their reasoning. Append new ones; do not silently reverse. If a decision is changed, add a dated entry explaining why rather than editing the old one.

Last updated: 17 June 2026

## Decision 1: Minimum distribution, not zero, not full grind (17 June 2026)

CHOSEN: "Minimum" distribution intensity — roughly 1 good distribution action per channel cycle, not the daily full grind, with a defined month-6 exit.

REASONING:
- Zero distribution is the only option that actively hurts the outcome: a new domain with no authority signals sees its SEO ramp slip 2-3 months, pushing the income target ~a quarter later. Saves ~30 min/week, costs months. Rejected.
- Full grind (daily LinkedIn + Reddit, ongoing) buys only ~15-20% more traffic than Minimum for ~5x the weekly time, indefinitely, with the highest quit risk. A strategy abandoned in month 4 returns zero, and the grind is exactly what triggers quitting. Rejected as default.
- Minimum captures ~85% of full-grind traffic at ~15% of the effort. It is a slightly higher-variance bet on SEO behaving (if SEO underdelivers, thin direct traffic leaves us exposed), but the effort/outcome ratio wins. CHOSEN.
- Operator strongly dislikes mechanical distribution work; sustainability favours Minimum.

CONCRETE SHAPE: maintain LinkedIn (1 comment/cycle, maintenance only), Reddit (genuine participation via Worldofbarca, no grind), Twitter (light-touch), Dev.to (cross-post via script, near-zero effort). Do NOT scale to daily multi-channel pushing.

## Decision 2: On-page/technical SEO automated permanently (17 June 2026)

DONE. Full technical SEO pass shipped (commit 3bbe84f): sitemap, robots, RSS, JSON-LD (BlogPosting + WebSite + Organization), full meta/OG/Twitter, tag-based related-posts internal linking. Runs on every build, data-driven from frontmatter. No recurring SEO task except baking a searchable description into new evergreen articles at write time (folds into publishing). Meta-description audit of existing articles also complete (commits 6c05b9f, 98469f2, 3ae277e).

## Decision 3: Month-6 distribution kill/reassess rule (17 June 2026)

RULE: At month 6 (early December 2026), evaluate organic search traffic. If SEO-sourced visits are NOT clearly ramping (benchmark: under ~400 visits/month from search), treat it as a signal that either the sandbox is longer than modelled or AI Overviews are suppressing clicks harder than expected. At that checkpoint, decide explicitly: continue Minimum, escalate distribution as a hedge, or pivot strategy. The point is a real finish line so Minimum does not become indefinite open-ended grind by default.

## Decision 4: Revenue timeline reality check (17 June 2026)

ADOPTED a more conservative mid-case than the original briefing.
- Original briefing assumed ~₹60k-1.2L/month by month 12.
- Realistic mid-case (Minimum strategy): ~₹13-18k/month by month 12, ~₹17-25k by month 14. Revenue in-window ≈ affiliate + newsletter products; display ads (Ezoic) do not fire because the site won't hit ~50k pageviews/month in-window.
- ₹50k+ is NOT a steady-state blog-RPM outcome. It runs through the EMAIL LIST and a digital PRODUCT, scaling with list size, realised as lumpy product-launch spikes around month 12-14+.
- ₹1L is a month-14+ product-launch-and-list story, consistent with the briefing's own "month 15 if sustained" line.
- NOTE: these figures are directional estimates on untested assumptions (SEO ramp, conversion rate, RPM). The SHAPE is the takeaway, not the exact numbers.

## Decision 5 (OPEN — next strategic session): Model the product lever

NOT YET DECIDED. The highest-leverage unmodelled move is making the newsletter real and shipping a first digital product (anonymous-compatible: Gumroad product, sponsorship, paid tier). ₹50k-100k runs through list size × product, not distribution intensity. Next dedicated session: model list size at month 9-10 → product-launch revenue spikes, and decide whether the ₹50k-100k stretch is on the table and what product to build first. Until then, distribution stays Minimum and content stays as-is.
