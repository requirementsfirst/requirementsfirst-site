# SEO On-Page Audit

On-page SEO method for RequirementsFirst evergreen articles. Operational doc, not part of the site build.

## Method (per evergreen article)

1. **Search the topic.** Find the high-volume phrasing people actually type. The recurring patterns for this niche:
   - how-to ("how to write acceptance criteria")
   - examples ("acceptance criteria examples")
   - template ("user story template")
   - "difference between" / "X vs Y" ("difference between BA and PO")
2. **Meta description.** Lead with the exact searched phrase, in natural language, within ~150–160 chars. The description is sales copy for the SERP click, not a summary — say what the reader gets.
3. **First paragraph.** Make sure the core keyword phrase appears naturally in the opening paragraph (Google weights early body text). If it is already there, leave it. If it is NOT there, **flag it for manual review — do not force it.** A jammed-in keyword reads worse than no keyword and we do not trade the voice for it.
4. **Keep the voice-y H1 (title).** Our titles are deliberately punchy/contrarian for shareability. Do not flatten them into keyword strings. The description carries the searchable phrasing; the title carries the voice.
5. **Never change slugs.** Slugs are live URLs. Changing one breaks inbound links, shares, and any indexed URL. Slug is frozen once published.

## Scope

Only the **~6–8 evergreen-topic articles** are SEO candidates — pieces that answer a standing, searched question (acceptance criteria, BA vs PO vs PM, INVEST/SPIDR, the requirements doc, what changed about the BA role, AI-assisted requirements, stakeholder discovery, the first question before Jira).

The **series pieces (#13–20)** on stakeholder craft and calibration are **share-only**, not search targets. Nobody searches their phrasing; they are distributed via the newsletter and social, and optimizing them for search is wasted effort. Leave their frontmatter alone.

## Caveat: domain sandbox

The domain is ~3 weeks old. New domains are effectively **sandboxed by Google for 2–4 months** — even well-optimized pages will not rank meaningfully during that window. This work is **plant-for-later**, not immediate traffic. We do it now so the pages are already correct when the sandbox lifts; we do not expect (or measure against) near-term search traffic.

## Going forward

For **new** evergreen articles, bake the searchable elements in **at write time**:
- searchable meta description (exact phrase, lead with it)
- keyword phrase present naturally in the first paragraph
- voice-y H1 kept

This folds into the normal publishing step — it is **not** a separate audit rotation. Only already-published evergreen articles need the retroactive batches below.

## Status

| Article (slug) | Meta description | First-para keyword | Status |
|---|---|---|---|
| acceptance-criteria-that-actually-prevent-bugs | optimized | present ("acceptance criteria" in para 1) | **done** |
| ba-vs-po-vs-pm-the-honest-difference | optimized | **flag**: para 1 uses BA/PO/PM abbreviations, not the full phrase "business analyst, product owner, and product manager" — left as-is, manual review | **done** |
| invest-spidr-both-miss-the-point | optimized ("INVEST vs SPIDR for user stories") | present ("user stories" / INVEST / SPIDR in para 1) | **done** |
| the-requirements-document-is-dead | optimized ("Is the requirements document dead?") | present ("requirements documents" in para 1) | **done** |
| what-changed-about-being-a-ba-2020-2025 | optimized ("being a business analyst from 2020 to 2025") | present ("BA" / "five years" in para 1) | **done** |
| the-ai-assisted-requirements-workflow-that-actually-works | optimized ("Using AI for requirements gathering") | present ("AI tools" / "acceptance-criteria" in para 1) | **done** |
| how-to-actually-run-a-stakeholder-discovery-conversation | optimized ("How to run a stakeholder discovery conversation") | present ("stakeholder discovery conversations" in para 1) | **done** |
| the-question-most-bas-forget-to-ask-before-opening-jira | optimized ("requirements gathering question ... before opening Jira") | **flag**: para 1 is a scenario (PM ping), no explicit keyword phrase — left as-is, manual review | **done** |

Batch 1: the first two **done** rows (acceptance-criteria, ba-vs-po-vs-pm). Batch 2: the remaining six rows above. **The full evergreen SEO pass (all 8) is now complete.**
