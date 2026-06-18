// Cross-post a RequirementsFirst article to Dev.to as a DRAFT.
//
// The Dev.to original stays canonical-linked back to requirementsfirst.com
// so RF remains the SEO original and Dev.to does not outrank it.
//
// SECURITY: the API key is read ONLY from the DEVTO_API_KEY environment
// variable. It is never hardcoded, never written to disk, never printed,
// and never included in any committed file. This script contains no secret.
//
// Usage:
//   DEVTO_API_KEY=xxxx node tools/crosspost-devto.mjs <article-slug>
//
// Behaviour:
//   - published:false -> lands as a DRAFT for operator review. Never
//     auto-publishes.
//   - On success prints the draft id/url and a body-length comparison so
//     the operator can confirm the markdown was accepted without truncation.
//   - On failure prints the full Dev.to error body (which does not contain
//     the key) and exits non-zero.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const apiKey = process.env.DEVTO_API_KEY;
if (!apiKey) {
  console.error(
    "ERROR: DEVTO_API_KEY is not set. Export it for this session (do not commit it):"
  );
  console.error("  export DEVTO_API_KEY=your_key_here");
  console.error("then re-run. Aborting without making any request.");
  process.exit(1);
}

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node tools/crosspost-devto.mjs <article-slug>");
  process.exit(1);
}

// Resolve the post file relative to this script (tools/ -> repo root).
const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");
const filePath = path.join(repoRoot, "src", "content", "posts", `${slug}.md`);

let raw;
try {
  raw = await readFile(filePath, "utf8");
} catch (e) {
  console.error(`ERROR: cannot read ${filePath}: ${e.message}`);
  process.exit(1);
}

// Split the leading --- ... --- frontmatter block from the body.
const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
if (!fmMatch) {
  console.error("ERROR: could not find frontmatter delimited by --- ... ---");
  process.exit(1);
}
const frontmatter = fmMatch[1];
// Preserve the body verbatim; only drop leading blank lines after the
// closing delimiter.
const rawBody = fmMatch[2].replace(/^[ \t]*\r?\n+/, "");

// Strip the site-specific closing teaser. RF articles end with an italic
// "Subscribe below ..." paragraph that points at the on-site newsletter
// form; that makes no sense on Dev.to. Conservative: only act when the
// FINAL paragraph contains the phrase "subscribe below" (case-insensitive).
// When that teaser sat behind a trailing `---` thematic break (its visual
// separator), the now-dangling rule is removed too so the post does not
// end on a stray horizontal line. Anything else is left untouched.
function stripTeaser(md) {
  const trimmed = md.replace(/\s+$/, "");
  const lastBlankIdx = trimmed.lastIndexOf("\n\n");
  const lastBlock =
    lastBlankIdx === -1 ? trimmed : trimmed.slice(lastBlankIdx + 2);
  if (!/subscribe below/i.test(lastBlock)) {
    return { body: md, stripped: false };
  }
  let head = lastBlankIdx === -1 ? "" : trimmed.slice(0, lastBlankIdx);
  head = head.replace(/\s+$/, "");
  // Drop a trailing thematic break (---/***/___) that only existed to set
  // off the teaser.
  head = head.replace(/(?:\n|^)(?:-{3,}|\*{3,}|_{3,})\s*$/, "");
  return { body: head.replace(/\s+$/, "") + "\n", stripped: true };
}

const { body, stripped: teaserStripped } = stripTeaser(rawBody);

// Minimal frontmatter field reader: single-line `key: value`, tolerating
// double- or single-quoted values and \" escapes inside double quotes.
function readField(name) {
  const m = frontmatter.match(new RegExp(`^${name}:[ \\t]*(.*)$`, "m"));
  if (!m) return null;
  let v = m[1].trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  return v.replace(/\\"/g, '"');
}

const title = readField("title");
const description = readField("description");
if (!title) {
  console.error("ERROR: no `title` found in frontmatter; aborting.");
  process.exit(1);
}

// Dev.to tags: lowercase alphanumeric only, deduped, max 4.
function sanitizeTags(tags) {
  const seen = new Set();
  const out = [];
  for (const t of tags) {
    const clean = String(t)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    if (clean && !seen.has(clean)) {
      seen.add(clean);
      out.push(clean);
    }
    if (out.length >= 4) break;
  }
  return out;
}

// Tags default to a generic set but can be overridden per article via the
// DEVTO_TAGS env var (comma-separated), e.g. for a career/craft piece vs an
// AI piece. Keeps tag choice out of the script body, no per-article edits.
const defaultTags = ["ai", "productivity", "career", "business"];
const tagSource = process.env.DEVTO_TAGS
  ? process.env.DEVTO_TAGS.split(",")
  : defaultTags;
const tags = sanitizeTags(tagSource);
const canonicalUrl = `https://requirementsfirst.com/posts/${slug}/`;

const payload = {
  article: {
    title,
    body_markdown: body,
    published: false,
    canonical_url: canonicalUrl,
    tags,
    description: description ?? "",
  },
};

let res;
try {
  res = await fetch("https://dev.to/api/articles", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
} catch (e) {
  console.error(`ERROR: request to Dev.to failed: ${e.message}`);
  process.exit(1);
}

const text = await res.text();
let json = null;
try {
  json = JSON.parse(text);
} catch {
  /* non-JSON body handled below */
}

if (!res.ok) {
  console.error(`Dev.to API error: HTTP ${res.status} ${res.statusText}`);
  console.error("Response body (no secrets):");
  console.error(text);
  process.exit(1);
}

console.log("Dev.to DRAFT created (published=false).");
console.log(`  id:            ${json?.id}`);
console.log(`  title:         ${json?.title}`);
console.log(`  published:     ${json?.published}`);
console.log(`  canonical_url: ${json?.canonical_url}`);
console.log(`  url:           ${json?.url}`);
console.log(
  `  tags:          ${JSON.stringify(json?.tags ?? json?.tag_list ?? tags)}`
);
console.log(`  body pre-strip:  ${rawBody.length} chars`);
console.log(
  `  body submitted:  ${body.length} chars ${
    teaserStripped
      ? `(teaser stripped, -${rawBody.length - body.length} chars)`
      : "(no teaser found; posted as-is)"
  }`
);
if (typeof json?.body_markdown === "string") {
  const ok = json.body_markdown.length === body.length;
  console.log(
    `  body returned:   ${json.body_markdown.length} chars ${
      ok
        ? "(matches submitted — no truncation)"
        : "(DIFFERS from submitted — inspect for truncation)"
    }`
  );
} else {
  console.log(
    "  body returned:   (not echoed by create response; verify in the draft editor)"
  );
}
console.log("");
console.log("This is a DRAFT. Review it in the Dev.to dashboard, then publish manually.");
