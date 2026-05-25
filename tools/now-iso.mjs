/**
 * now-iso.mjs — print a safely-past pubDatetime for new Astro Paper posts.
 *
 * Outputs the current moment in IST minus 6 hours, formatted as:
 *
 *   YYYY-MM-DDTHH:mm:ss.000+05:30
 *
 * Why minus 6 hours: Astro Paper filters posts whose pubDatetime is in
 * the future at build time. We've shipped articles with future-dated
 * stamps three times because the brain wrote the IST date without
 * checking UTC. Subtracting 6 hours guarantees the resulting moment is
 * past in UTC regardless of where Cloudflare's build clock sits, with
 * comfortable buffer for the time between paste and deploy.
 *
 * Usage:  node tools/now-iso.mjs
 */

const OFFSET_HOURS_PAST = 6;
const IST_OFFSET_MINUTES = 5 * 60 + 30; // +05:30

const now = Date.now();
const target = new Date(
  now - OFFSET_HOURS_PAST * 60 * 60 * 1000 + IST_OFFSET_MINUTES * 60 * 1000
);

// `target` is now a Date whose UTC fields represent the IST wall-clock
// time we want to render. Read UTC fields and format with the +05:30 suffix.
const pad = (n, w = 2) => String(n).padStart(w, "0");

const y = target.getUTCFullYear();
const m = pad(target.getUTCMonth() + 1);
const d = pad(target.getUTCDate());
const hh = pad(target.getUTCHours());
const mm = pad(target.getUTCMinutes());
const ss = pad(target.getUTCSeconds());

console.log(`${y}-${m}-${d}T${hh}:${mm}:${ss}.000+05:30`);
