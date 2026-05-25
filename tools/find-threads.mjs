/**
 * find-threads.mjs — Reddit thread candidate finder for daily distribution.
 *
 * Hits Reddit's public JSON search API across a small set of BA/PM/agile
 * subreddits and ranks recent threads by how good a fit they are for a
 * RequirementsFirst comment. Prints the top 5 to stdout and saves the
 * same output to tools/thread-candidates-YYYY-MM-DD.md for history.
 *
 * Usage:  node tools/find-threads.mjs
 *
 * No external dependencies — Node 18+ built-in fetch.
 */
import { writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// =====================================================================
// CONFIG — edit these when distribution targets change.
// =====================================================================

const SUBS = [
  "businessanalysis",
  "agile",
  "ProductManagement",
  "scrum",
  "projectmanagement",
];

const QUERIES_PER_SUB = {
  businessanalysis: ["acceptance criteria", "user story", "requirements"],
  agile: ["user story", "acceptance criteria", "definition of done"],
  ProductManagement: ["requirements", "user story", "stakeholders"],
  scrum: ["acceptance criteria", "user story", "definition of done"],
  projectmanagement: ["requirements", "stakeholder"],
};

const USER_AGENT = "RequirementsFirst-Discovery/1.0";
const REQUEST_DELAY_MS = 1000; // be polite to Reddit
const TOP_N = 5;
const MAX_AGE_HOURS = 24 * 7; // 7 days

// Off-topic phrases that disqualify a thread (we don't write career
// advice / certification / salary content, so these reads are wasted).
const OFFTOPIC_PHRASES = [
  "becoming a ba",
  "career advice",
  "salary",
  "interview",
  "certification",
];

// Question-shape signals — verbs that imply someone wants an answer.
const QUESTION_VERBS = ["how", "should", "why", "help", "advice"];

// =====================================================================
// Fetching
// =====================================================================

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchSearch(sub, query, attempt = 0) {
  const url = `https://www.reddit.com/r/${encodeURIComponent(
    sub
  )}/search.json?q=${encodeURIComponent(
    query
  )}&restrict_sr=1&sort=new&t=week&limit=25`;

  let res;
  try {
    res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  } catch (err) {
    console.error(`  ! network error r/${sub} "${query}": ${err.message}`);
    return [];
  }

  if (res.status === 429 && attempt === 0) {
    console.error(`  ! 429 for r/${sub} "${query}" — backing off 5s and retrying`);
    await sleep(5000);
    return fetchSearch(sub, query, 1);
  }
  if (res.status === 403 || res.status === 404) {
    console.error(`  ! ${res.status} for r/${sub} — skipping`);
    return [];
  }
  if (!res.ok) {
    console.error(`  ! ${res.status} for r/${sub} "${query}" — skipping`);
    return [];
  }

  const body = await res.json().catch(() => null);
  const children = body?.data?.children ?? [];
  return children.map(c => c.data).filter(Boolean);
}

// =====================================================================
// Filtering + scoring
// =====================================================================

function isUsable(post) {
  if (!post) return false;
  if (post.stickied || post.pinned) return false;
  if (post.author === "[deleted]" || !post.author) return false;
  if (post.crosspost_parent_list && post.crosspost_parent_list.length > 0)
    return false;
  if ((post.num_comments ?? 0) === 0) return false;
  if ((post.score ?? 0) < 1) return false;

  const ageHours = (Date.now() / 1000 - post.created_utc) / 3600;
  if (ageHours > MAX_AGE_HOURS) return false;

  return true;
}

function scoreCandidate(post) {
  const title = (post.title ?? "").toLowerCase();
  const body = (post.selftext ?? "").toLowerCase();
  const combined = `${title} ${body}`;
  const ageHours = (Date.now() / 1000 - post.created_utc) / 3600;
  const nComments = post.num_comments ?? 0;

  let score = 0;
  if (post.title?.trim().endsWith("?")) score += 30;
  if (nComments >= 3 && nComments <= 30) score += 20;
  if (ageHours <= 48) score += 15;
  if (ageHours <= 24) score += 10;
  if (QUESTION_VERBS.some(v => new RegExp(`\\b${v}\\b`, "i").test(title)))
    score += 15;
  if ((post.selftext ?? "").length > 100) score += 10;

  if (OFFTOPIC_PHRASES.some(p => combined.includes(p))) score -= 20;
  if (nComments > 50) score -= 10;

  return score;
}

// =====================================================================
// Main
// =====================================================================

function ageString(createdUtc) {
  const hours = (Date.now() / 1000 - createdUtc) / 3600;
  if (hours < 1) return `${Math.round(hours * 60)} min ago`;
  if (hours < 24) return `${Math.round(hours)} hr ago`;
  return `${Math.round(hours / 24)} days ago`;
}

async function main() {
  const seen = new Map(); // id -> { post, score }

  for (const sub of SUBS) {
    const queries = QUERIES_PER_SUB[sub] ?? [];
    for (const q of queries) {
      console.error(`fetching r/${sub} "${q}"`);
      const posts = await fetchSearch(sub, q);
      for (const post of posts) {
        if (!isUsable(post)) continue;
        if (seen.has(post.id)) continue;
        const score = scoreCandidate(post);
        seen.set(post.id, { post, score });
      }
      await sleep(REQUEST_DELAY_MS);
    }
  }

  const ranked = [...seen.values()].sort((a, b) => b.score - a.score);
  const top = ranked.slice(0, TOP_N);

  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# Reddit Thread Candidates — ${today}`);
  lines.push("");
  if (top.length === 0) {
    lines.push("_No candidates found in the last 7 days._");
  } else {
    top.forEach(({ post, score }, i) => {
      const url = `https://reddit.com${post.permalink}`;
      const snippet = (post.selftext ?? "")
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 200);
      lines.push(`## ${i + 1}. [score: ${score}] r/${post.subreddit}`);
      lines.push(`**Title:** ${post.title}`);
      lines.push(`**URL:** ${url}`);
      lines.push(
        `**Posted:** ${ageString(post.created_utc)} · Score: ${post.score} · Comments: ${post.num_comments}`
      );
      lines.push(`**Snippet:** ${snippet || "_(link post — no body text)_"}`);
      lines.push("");
    });
  }

  const subsHit = new Set([...seen.values()].map(c => c.post.subreddit)).size;
  const bestScore = ranked[0]?.score ?? 0;
  lines.push("---");
  lines.push(
    `_Found ${ranked.length} candidates across ${subsHit} subs. Best score: ${bestScore}._`
  );

  const output = lines.join("\n");
  console.log(output);

  // Save historical log next to the script.
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const logPath = resolve(__dirname, `thread-candidates-${today}.md`);
  await writeFile(logPath, output);
  console.error(`\nwrote ${logPath}`);

  console.error(
    `\nFound ${ranked.length} candidates across ${subsHit} subs. Best score: ${bestScore}.`
  );
}

main().catch(err => {
  console.error("fatal:", err);
  process.exit(1);
});
