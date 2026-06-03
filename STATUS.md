# RequirementsFirst — Status

Anonymous BA/PM content site. Target ₹1L/month in 8-9 months. Operator non-technical (pastes prompts into Claude Code). Persona: Arun Mehta. Updated 28 May 2026.

## Stack
- Astro Paper v6, Cloudflare Pages, auto-deploy from `main`. Content: src/content/posts/
- Newsletter: Beehiiv iframe embed, form id 99df1d7d-e98a-4de3-a4c6-1272408e66c8
- Cloudflare Web Analytics: live (Referrers view is key metric)
- Tools: now-iso.mjs (run as step 0 of every publish), verify.mjs (6 checks, mobile viewport), find-threads.mjs (Reddit candidate finder)
- Docs: LESSONS.md (strategy), KNOWN_ISSUES.md (technical), this file

## Articles live (8)
1. Writing better user stories is the wrong goal
2. The question most BAs forget to ask before opening Jira
3. Why "as a user, I want to" is the worst thing that happened to user stories
4. How I use Claude to interrogate my own requirements
5. Acceptance criteria that actually prevent bugs (12 examples)
6. Most stakeholder conflicts are authority disputes not requirements disputes
7. INVEST and SPIDR both miss the point
8. BA vs PO vs PM: the honest difference

Backlog #9: "What changed about being a BA 2020-2025 (and what didn't)"
Backlog #10: "The requirements document is dead. Long live the requirements document."

## Voice rules
Contrarian where defensible, Indian English (organise), no consultancy clichés (no "leverage/unlock/game-changer/10x/synergy"), no emojis in articles, no em dashes in social/Reddit/LinkedIn comments. Synthetic case studies only, never real employers. Each article ends with teaser for next + subscribe line.

## Distribution
- Reddit: account "Worldofbarca" (anon, 2400+ karma). Comment only on fresh threads with engaged OP. r/businessanalysis blocks links in comments.
- LinkedIn: Page "RequirementsFirst" (id 118074270). Comment as Page on PM/BA thought leaders (Aakash Gupta = linkedin.com/in/aakashg0, Shreyas Doshi, Lenny Rachitsky). PENDING: create generic LinkedIn account as primary admin to sever identity link from real account. Cover story if discovered: family member owns page.
- Lesson: engagement velocity > topic fit. Search engines can't discover LinkedIn posts (de-indexed).

## Monetization
- Affiliates PAUSED until Month 2 (need traffic first; premature apps get rejected and flag future ones). ClickUp application pending. PartnerStack Network rejected.
- PayPal Business approved, payout email sinaqvi.008@gmail.com. W-8BEN: PAN as foreign TIN, India treaty.
- Gumroad: requirementsfirst.gumroad.com claimed, no products yet.
- Revenue stack: affiliate links + Gumroad products + Ezoic ads (needs 50k pageviews) + sponsored.

## Cadence
Daily ~45min Mon-Fri: review article draft + paste Claude Code prompt + 1 distribution comment. Friday status check (use Cloudflare Referrers data). Downgrade to 12-month plan if 2 consecutive Fridays missed.

## Traffic
Baseline 28 May 2026: single-digit daily visits (expected, 3-week-old site). Cloudflare Web Analytics live. Core Web Vitals all green (LCP 92% good, INP/CLS 100%). No referrer data yet. Friday check: watch Referrers to validate Reddit/LinkedIn channels.

## Workflow rules
- Every technical task = ONE Claude Code prompt with autonomy clause, never terminal commands to operator.
- Publish prompt pattern: step 0 run now-iso.mjs → create file verbatim → npm run build → commit → push → wait 90s → verify.mjs → curl URL → report.
- Infrastructure task >30min not shipping content/traffic → stop, accept manual or defer.
- New Brain chat per session to control token cost. Paste this file at top.
- Article frontmatter: always wrap BOTH title and description fields in double quotes when they contain a colon (YAML colon-space bug aborts the build).
