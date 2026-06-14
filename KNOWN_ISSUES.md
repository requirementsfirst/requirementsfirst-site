# Known Issues

Living document. One line per issue. Append as new things surface; remove when fixed.

## Open

### Source Serif 4 preload tag dropped by Astro Font API
- **Symptom:** Brief Flash of Unstyled Text (FOUT) possible on cold page loads — body text may render in fallback (Georgia/Times) for ~100ms before Source Serif 4 swaps in.
- **Root cause:** Astro's experimental Font API silently drops the `<link rel="preload">` tag for Source Serif 4. Inter preload works correctly.
- **Impact:** Cosmetic only. Font still loads via `@font-face`. Affects first-visit cold cache only; cached visits unaffected.
- **Decision:** Not chasing. Trigger to revisit: when Ezoic ad integration happens (~Month 8-10), the entire font/CSS load order gets revisited; fix it then alongside that work. Or fix earlier if visibly bothers a reader (no signal so far).
- **First noted:** 24 May 2026, design pass commit e97dfb6.

## Newsletter form visual polish (29 May 2026)

The Beehiiv iframe form is functionally working on mobile (input + Subscribe button visible and clickable, all 4 combos verified). But the layout is cosmetically poor:
- The placeholder text "Enter your email" is truncated to "Ent" because the input field is too narrow inside the iframe
- The white iframe area has significant unused vertical space above the form, with only the wordmark sitting in the empty zone
- The overall block looks larger than it needs to be

Root cause: the iframe is set to height=360 to ensure the form is never clipped (lesson from three prior breakage rounds). The Beehiiv slim form internally uses ~150-200px; the extra 160-210px shows as whitespace.

Decision: deferred to Month 2 polish pass. Form functions; subscribers can sign up. Two+ hours already spent on this component across multiple sessions. Infrastructure-rabbit-hole rule from LESSONS.md applies — accept cosmetic debt, ship articles instead.

When revisited: options are (a) custom inline form posting to Beehiiv's subscribe endpoint (full visual control, no iframe), (b) tighter iframe height with overflow detection, (c) override Beehiiv internal CSS via deeper iframe styling. Each carries its own risk; pick after first ~100 subscribers when the polish actually matters.

### "Ent" truncation — CONFIRMED Beehiiv-side, operator action (14 Jun 2026)

Measured inside the cross-origin frame by `tools/verify.mjs` CHECK 7 (e): on mobile (iPhone 14, 390px) the email input's inner content width is only ~21px while the placeholder "Enter your email" needs ~118px, so it renders as "Ent". Desktop is fine (full "Enter your email", input is wide). Both the inline and bottom instances are affected on mobile, identically — it is the Beehiiv form's own responsive layout, not our wrapper. Our container gives the iframe full width (iframe element measures 316px wide on mobile); the input simply does not expand to fill it.

Not fixable in this repo (cross-origin). **Operator fix in the Beehiiv dashboard:**
1. Beehiiv → Forms → select this form (id `99df1d7d-e98a-4de3-a4c6-1272408e66c8`).
2. Open the Email field settings. Set the input to full width / 100% (remove any fixed pixel width on the field) so on narrow viewports the input fills the row instead of sitting at a fixed narrow width; if the layout allows, let the input and Subscribe button stack on mobile.
3. If the platform offers no width control, shorten the placeholder to "Email" as a fallback so the visible text is not clipped.
4. Re-run `cd tools && node verify.mjs` and confirm CHECK 7 (e) flips from N to Y on both mobile rows.

Tracking: CHECK 7 measures and prints this every run (loud "OPERATOR ACTION REQUIRED" block) but treats (e) as NON-GATING, because it is outside our codebase. The code-controlled assertions (iframe present, input/button visible, not clipped, no overflow) gate and currently pass at both viewports for both instances.

## tools/find-threads.mjs is permanently dark (4 Jun 2026)

The script still exists in the repo and has OAuth code, but Reddit changed their API access policy on May 18 2026 to require approval for all data access. The old script-app flow now silently rejects with no error. Tested all alternative anonymous endpoints ([www.reddit.com](https://www.reddit.com), old.reddit.com, search.json, listing feeds, pushshift) — all return 403.

Workaround: manual Reddit browsing via Worldofbarca account on the website.

Future option (if needed): apply for Devvit app approval at https://developers.reddit.com/app-registration. Approval is not guaranteed and may take days. Don't pursue unless Reddit distribution becomes critical to traffic.

## Resolved

(none yet — when items move here, keep them for ~3 months as institutional memory, then prune)
