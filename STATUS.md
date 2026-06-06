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
- LinkedIn: Page "RequirementsFirst" (id 118074270). Comment as Page. Geography priority: US-based profiles first (per 6 June pivot — Indian audience underconverts on $20+ tools, US/EU drives affiliate revenue).
  
  HIGH-PRIORITY rotation (US-based, target most comments here):
  - lennyrachitsky (Lenny Rachitsky) — PM, growth
  - mhcagan (Marty Cagan) — PM craft
  - shreyasdoshi (Shreyas Doshi) — product + leadership
  - teresatorres (Teresa Torres) — continuous discovery
  - jackiebavaro (Jackie Bavaro) — PM career
  - rich-mironov-12a4a (Rich Mironov) — PM classics
  - majavoje (Maja Voje) — GTM
  
  MID-PRIORITY (US-based + India audience overlap):
  - aakashg0 (Aakash Gupta) — PM career + AI
  - petrawille (Petra Wille) — product leadership
  - andre-albuquerque (Andre Albuquerque) — builder PM
  
  LOW-PRIORITY (India-based, comment occasionally only):
  - aatirr (Aatir Abdul Rauf) — India PM/PLG
  - pavanbelagatti (Pavan Belagatti) — India devrel/product
  
  Rotation rule: cycle through profiles; don't comment on the same person twice in a row unless they're the only one with a relevant fresh post. Aim 70%+ of comments at HIGH-PRIORITY tier.
  PENDING: create generic LinkedIn account as primary admin to sever identity link from real account. Cover story if discovered: family member owns page.
- Hacker News: queued for articles #4 (Claude interrogation) and #10 (requirements document is dead). Submit during US business hours (~7-10 PM IST). Not a daily channel; bursty distribution for HN-friendly pieces only.
- Twitter/X: deferred 2 weeks (need account setup + voice calibration). Plan: comment on US PM/BA voices for distribution; not posting original content yet.

## Monetization
- Affiliates PAUSED until Month 2 (need traffic first; premature apps get rejected and flag future ones). ClickUp application pending. PartnerStack Network rejected.
- PayPal Business approved, payout email sinaqvi.008@gmail.com. W-8BEN: PAN as foreign TIN, India treaty.
- Gumroad: requirementsfirst.gumroad.com claimed, no products yet.
- Revenue stack: affiliate links + Gumroad products + Ezoic ads (needs 50k pageviews) + sponsored.

## Cadence
Daily ~45min Mon-Fri: review article draft + paste Claude Code prompt + 1 distribution comment. Friday status check (use Cloudflare Referrers data). Downgrade to 12-month plan if 2 consecutive Fridays missed.

## Traffic
Baseline 28 May 2026: single-digit daily visits. 7-day rolling: 96 visits (6 June), India 91%, US 8%. Core Web Vitals green. Catalog effect emerging: 4 articles getting views (#2 strongest, 31 visits/week). 

Geography concern (locked 6 June): India audience at 91% is wrong for the affiliate/digital-products monetization model. US visitor worth ~30-50x Indian visitor for affiliate revenue. Strategic pivot to rebalance distribution toward US/EU channels (LinkedIn US profiles, Hacker News, Twitter/X). Decision gate: if US/EU share doesn't reach ≥25% by Month 3 (early August), shift to India-monetization model (Option 3 from 6 June discussion).

## Failure-mode signals (track weekly)
- Geography mix: target ≥25% US/EU by 8 weeks. Currently 8% US.
- Newsletter conversion: 0 organic subscribers across ~200 visits. Watch closely; popup test queued.
- Operator burnout: 1 Friday miss (5 June). Two consecutive Fridays missed = downgrade to 12-month plan.
- SEO compounding: 0 Google referrals. Expected pre-Month 3; concern if still 0 at Month 4.

## Backlog / Experiments
- Popup email-capture test: exit-intent only, easy dismiss, plain copy. Realistic gain 2-4 subs/week per industry benchmarks. Implement within 2 weeks if 0 subs persists.
- Open Case Files article series: launch around article #15-18. Reader-submitted BA/PM problems solved publicly in subsequent piece. Needs submission form (Beehiiv survey or Google Form).
- India monetization (Option 3 contingency): if US geography pivot fails by Month 3, pivot to India-priced templates (₹199-499) + Indian SaaS sponsorships. Don't start unless gate triggered.
- Newsletter form cosmetic polish (iframe whitespace + "Ent" truncation): logged in KNOWN_ISSUES, defer to Month 2 when subscriber count justifies the effort.

## Workflow rules
- Every technical task = ONE Claude Code prompt with autonomy clause, never terminal commands to operator.
- Publish prompt pattern: step 0 run now-iso.mjs → create file verbatim → npm run build → commit → push → wait 90s → verify.mjs → curl URL → report.
- Infrastructure task >30min not shipping content/traffic → stop, accept manual or defer.
- New Brain chat per session to control token cost. Paste this file at top.
- Article frontmatter: always wrap BOTH title and description fields in double quotes when they contain a colon (YAML colon-space bug aborts the build).
