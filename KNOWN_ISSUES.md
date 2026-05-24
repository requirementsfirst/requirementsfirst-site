# Known Issues

Living document. One line per issue. Append as new things surface; remove when fixed.

## Open

### Source Serif 4 preload tag dropped by Astro Font API
- **Symptom:** Brief Flash of Unstyled Text (FOUT) possible on cold page loads — body text may render in fallback (Georgia/Times) for ~100ms before Source Serif 4 swaps in.
- **Root cause:** Astro's experimental Font API silently drops the `<link rel="preload">` tag for Source Serif 4. Inter preload works correctly.
- **Impact:** Cosmetic only. Font still loads via `@font-face`. Affects first-visit cold cache only; cached visits unaffected.
- **Decision:** Not chasing. Trigger to revisit: when Ezoic ad integration happens (~Month 8-10), the entire font/CSS load order gets revisited; fix it then alongside that work. Or fix earlier if visibly bothers a reader (no signal so far).
- **First noted:** 24 May 2026, design pass commit e97dfb6.

## Resolved

(none yet — when items move here, keep them for ~3 months as institutional memory, then prune)
