# Experiments log

Every bet the site makes, what we expected, when we judge it, and what happened. The weekly run reads this first and updates it last.

## Rules

- Judge on 28-day windows, never a single week. New SEO pages get 6 weeks before any verdict.
- Signal = a page with 100+ impressions and 3+ clicks in 28 days, a query cluster whose impressions grow two windows in a row, or any download, sign-up or sale.
- Double down on signals (same cluster, same format, internal links, title tests). At most 2 active double-down bets.
- Explore one week in three: a new format or topic, with a kill date written below before it starts.
- One change per page per 28 days, so results can be attributed.
- Channel checkpoint 15 Feb 2027: under 30 Google clicks a week and no paid sales means the search channel is falsified. Escalate to Imran for a channel decision instead of more topic tweaks.

## Active

| ID | Started | Bet | Expected | Judge on | Status |
| --- | --- | --- | --- | --- | --- |
| E1 | 2026-10-31 | Free Excel RTM on the RTM article; title now says "free Excel and Notion" | Clicks on /posts/requirements-traceability-matrix-template/ (165 impressions for "requirements traceability matrix excel" in 2 days before the change) | 2026-11-28 | Running. 9 Nov: 267 impressions, 0 clicks, position 77.6. 23 Nov (28 days): 601 impressions, 3 clicks, position 64.9. Meets the signal bar on clicks, but position is still page 7; the clicks come from long-tail "template excel" variants (1 click at position 47) |
| E2 | 2026-10-25 | Notion templates on Gumroad and the Notion Marketplace (1 paid, 3 free) | Free downloads and sales | 2026-11-28 | Weak: 0 downloads from about 25 visits by 31 Oct. 9 Nov: still 0. Notion Marketplace: RTM live; Stakeholder Register, RAID Log and paid tracker rejected. 23 Nov: still 0 Notion downloads or sales; Marketplace unchanged |
| E3 | 2026-10-26 | Reddit post in r/businessanalysis (assumption log), posted by Imran | Engagement and referral visits | 2026-11-28 | Engagement signal: 16 upvotes, 3 comments. Reddit is manual only (blocked for automation) |
| E4 | 2026-06 | Dev.to cross-posts | Views and referral clicks | 2026-11-28 | Weak: under 500 total views, 1 reaction |
| E5 | 2026-11-02 | Weekly article + free Excel/Word template chosen from Search Console template queries | Template pages reaching the signal bar | Each page 6 weeks after publishing | First article published 9 Nov (the 2 Nov run left no trace in the repo) |
| E6 | 2026-11-09 | $0+ Gumroad product for the RTM Excel (scfqu); RTM article Excel link now goes through it | Counted downloads and buyer emails | 2026-12-07 | Running. 23 Nov: 1 real download (10 Nov, from a requirementsfirst.com referral) out of about 4 Gumroad views from the site. First counted download ever |
| E7 | 2026-11-09 | Double-down on the business vs functional requirements cluster: new page /posts/brd-vs-frd-vs-srs/ with free Word BRD and FRD template (mbmqht), template section and link added to the signal page | New page reaches impressions in the BRD/FRD cluster; first downloads from the signal page | 2026-12-21 | Running. Evidence: signal page 373 impressions, 7 clicks, position 8.8 in 14 days of data; same cluster tops Bing. 23 Nov (28 days): new page 139 impressions, 1 click, position 7.7 after 2 weeks; BRD/FRD/SRS queries rank 4.5 to 11. 0 downloads of mbmqht. Signal page 810 impressions, 9 clicks, but only 1 click in the last 7 days (224 impressions, CTR 0.4%) |
| E8 | 2026-11-23 | Double-down on the RTM cluster with a worked-example page: /posts/requirements-traceability-matrix-example/ with a filled-in Excel RTM (Gumroad $0+ pjvkdi) | Ranks for the "example" and "sample" variants (about 60 impressions in 28 days at positions 50 to 76 on the template page) at a better position than the template page; counted downloads | 2027-01-04 | Running. Evidence: RTM cluster is the largest impression pool (601 on the template page), the only real download came from it, and the template page cannot be changed until 7 Dec |
| E9 | 2026-11-23 | JOB C paid kit: BA Template Kit (Excel + Word) at $19 (Gumroad lglkd). 3 free files plus 3 kit-only (RACI, change request log, decision log). Promo block on the RTM example page only | First paid sale | 2027-02-15 | Running. Trigger met by the letter: RTM template (3 clicks), BRD vs FRD vs SRS (1), stakeholder register (1), plus the BvF page with the Word template (9). Promo blocks on the other template pages wait until 7 Dec so E1, E6 and E7 stay attributable. Kit-only scripts kept out of the public repo |
| E10 | 2026-11-23 | Second Reddit post in r/businessanalysis, posted by Imran: "Does anyone actually maintain a BRD, FRD and SRS separately?" No link in the post; link to /posts/brd-vs-frd-vs-srs/ only if someone asks | Upvotes and comments vs E3 (16, 3); any reddit.com referral to the BRD page in Cloudflare or Search Console | 2026-12-21 | Running. Reddit is manual only; Imran reports engagement |
| E11 | 2026-11-24 | Explore (ISO week 48): new topic cluster, agile quality terms. Comparison page /posts/acceptance-criteria-vs-definition-of-done/ with a free Excel tracker (acceptance criteria per story + team Definition of Done, status incl. "Works, not done"), linked through /download/acceptance-criteria-definition-of-done-checklist.xlsx/. Link added from acceptance-criteria-that-actually-prevent-bugs | Impressions for "acceptance criteria vs definition of done" and variants at positions under 15, like the other comparison pages; first counted downloads | 2027-01-05 (kill 2027-01-19 if under 50 impressions in 28 days and no download: no more agile-ceremony comparisons) | Running. Evidence: comparison pages rank 4.5 to 11 (BvF 10.1, BRD vs FRD vs SRS 7.7, BA vs PO vs PM 7.0) and the acceptance-criteria page sits at position 6.2 with 61 impressions, so the site already has standing on the topic. Both double-down slots are full (E7, E8), so this week went to exploration |

## Closed

None yet.

## Page classification (23 Nov, 28 days, 25 Oct to 21 Nov)

Site: 18 clicks, 1,990 impressions, position 27.2. Last 7 days: 4 clicks, 646 impressions, position 25.

- Signal: business-requirements-vs-functional-requirements (9 clicks, 810 impressions, position 10.1; clicks slowing: 1 in the last 7 days). requirements-traceability-matrix-template (3 clicks, 601 impressions, position 64.9; signal on clicks, not on position).
- Growing: brd-vs-frd-vs-srs (1 click, 139 impressions, position 7.7, two weeks old). assumption-log-template (105 impressions, position 24.1). acceptance-criteria (61, position 6.2). ba-vs-po-vs-pm (1 click, 38, position 7.0).
- Flat: invest-spidr (2 clicks, 15 impressions), what-to-write-up-after-discovery (1 click, 25), stakeholder-register-template (1 click, 4), the remaining essays (under 35 impressions each).
- Dead: raid-log-template (19 impressions, position 49.4).

## Page classification (9 Nov, 14 days of data, 25 Oct to 7 Nov)

- Signal: business-requirements-vs-functional-requirements (7 clicks, 373 impressions, position 8.8).
- Growing, too small to judge: invest-spidr-both-miss-the-point (2 clicks, 8 impressions, position 2.0), assumption-log-template (38 impressions, position 18.1), acceptance-criteria (27, position 6.3), ba-vs-po-vs-pm (18, position 7.9).
- Not ranking: requirements-traceability-matrix-template (267 impressions, position 77.6), raid-log-template (19, position 49.4).

## Decisions

- 2026-11-24: docs/search-data.md does not exist yet: the Weekly data workflow was added on 23 Nov after its Monday slot and has never run, and no API secrets are confirmed. This run had no new search data, so it judged on the 23 Nov numbers and spent the week on the scheduled explore slot (ISO week 48) instead of a double-down. First data due Monday 30 Nov.
- 2026-11-23: Publishing moves to a cloud scheduled task that pushes to GitHub directly, so a week is never skipped when the laptop is off (the 16 Nov run was lost that way). The laptop task keeps only Search Console, Bing and Gumroad.

- 2026-10-31: Stop building new Notion templates. Marketplaces are checkouts, not traffic. Search demand from BAs wanting Excel/Word files is the only measured demand.
- 2026-10-31: Paid "BA Template Kit (Excel + Word)" at about $19 once 3 or more free template pages each get Google clicks in a 28-day window.
- 2026-11-09: Google ranks us at positions 6 to 10 for conceptual comparison queries and at 75 to 95 for template and file queries. Template-intent impressions at those positions do not count as demand. Double down on comparisons, with a template attached, not templates alone.
- 2026-10-31: Free files are delivered through $0+ Gumroad products so downloads are counted and buyers' emails are collected.
- 2026-11-23: No 16 Nov run reached the repo, so this run judged on 28-day data. RTM cluster becomes the second double-down bet (E8) alongside E7. Paid kit (E9) built because the written trigger fired, knowing the volume is tiny: it is the only way to test the paid half of the 15 Feb checkpoint before that date.
- 2026-11-23: For the 7 Dec monthly review: CTR title tests are due for business-requirements-vs-functional-requirements (810 impressions, CTR 1.1%, close to the 1% bar) and requirements-traceability-matrix-template (601, CTR 0.5%). Add kit promo blocks to the RTM, BvF and BRD vs FRD vs SRS pages in the same pass.
