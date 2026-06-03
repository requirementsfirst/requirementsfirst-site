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

// Reddit blocks anonymous JSON requests at the edge (HTTP 403 "Blocked")
// regardless of User-Agent as of mid-2026, so the script must authenticate
// with a personal script-app. Create one at https://www.reddit.com/prefs/apps
// (type: "script"), then export the credentials before running:
//
//   export REDDIT_CLIENT_ID=...        # the 14-char string under the app name
//   export REDDIT_CLIENT_SECRET=...    # the "secret" field
//   export REDDIT_USERNAME=...         # your reddit account username
//   export REDDIT_PASSWORD=...         # your reddit account password
//   # optional: export REDDIT_USER_AGENT="requirementsfirst-discovery by u/<you>"
//
// Without these the script exits with a clear blocker message.
const USER_AGENT =
  process.env.REDDIT_USER_AGENT ||
  "requirementsfirst-discovery/1.0 (by /u/requirementsfirst)";
const REQUEST_DELAY_MS = 2000; // be polite — Reddit OAuth allows 60 req/min
const TOP_N = 8;
const MAX_AGE_HOURS = 72; // 3 days — niche subs are thin; need pool to filter from

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

// OAuth token, fetched once at startup via the password grant. Reddit's
// script-app tokens last ~24h; one run takes ~2 min so we don't refresh.
let ACCESS_TOKEN = null;

async function getAccessToken() {
  const { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USERNAME, REDDIT_PASSWORD } =
    process.env;
  if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET || !REDDIT_USERNAME || !REDDIT_PASSWORD) {
    console.error(
      "fatal: Reddit now blocks anonymous JSON requests (HTTP 403). This script\n" +
        "needs OAuth credentials from a personal script-app. Steps:\n" +
        "  1. Visit https://www.reddit.com/prefs/apps and click 'create another app'.\n" +
        "  2. Choose type: 'script'. Redirect URI: http://localhost (unused).\n" +
        "  3. Export the four env vars before running this script:\n" +
        "       REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USERNAME, REDDIT_PASSWORD\n" +
        "     (CLIENT_ID is the 14-char string under the app name; CLIENT_SECRET is the\n" +
        "      'secret' field; username/password are your Reddit login.)\n" +
        "  4. Re-run: node tools/find-threads.mjs"
    );
    process.exit(2);
  }

  const basic = Buffer.from(
    `${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`
  ).toString("base64");
  const body = new URLSearchParams({
    grant_type: "password",
    username: REDDIT_USERNAME,
    password: REDDIT_PASSWORD,
  });
  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error(
      `fatal: Reddit OAuth token request failed (HTTP ${res.status}). Body: ${txt.slice(0, 300)}`
    );
    process.exit(2);
  }
  const json = await res.json();
  if (!json.access_token) {
    console.error("fatal: Reddit OAuth response had no access_token:", json);
    process.exit(2);
  }
  return json.access_token;
}

function authHeaders() {
  return {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "User-Agent": USER_AGENT,
  };
}

async function fetchSearch(sub, query, attempt = 0) {
  // OAuth endpoints live under oauth.reddit.com (not www.reddit.com).
  const url = `https://oauth.reddit.com/r/${encodeURIComponent(
    sub
  )}/search.json?q=${encodeURIComponent(
    query
  )}&restrict_sr=1&sort=new&t=week&limit=25`;

  let res;
  try {
    res = await fetch(url, { headers: authHeaders() });
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

function scoreCandidate(post, opLastCommentAgeHours = Infinity) {
  const title = (post.title ?? "").toLowerCase();
  const body = (post.selftext ?? "").toLowerCase();
  const combined = `${title} ${body}`;
  const ageHours = (Date.now() / 1000 - post.created_utc) / 3600;
  const nComments = post.num_comments ?? 0;

  let score = 0;
  if (post.title?.trim().endsWith("?")) score += 30;
  if (nComments >= 3 && nComments <= 30) score += 20;
  if (ageHours <= 24) score += 10;
  if (ageHours <= 12) score += 15;
  if (ageHours <= 6) score += 5;
  if (QUESTION_VERBS.some(v => new RegExp(`\\b${v}\\b`, "i").test(title)))
    score += 15;
  if ((post.selftext ?? "").length > 100) score += 10;

  if (OFFTOPIC_PHRASES.some(p => combined.includes(p))) score -= 20;
  if (nComments > 50) score -= 10;

  // OP engagement signal
  if (opLastCommentAgeHours <= 12) score += 20;
  else if (opLastCommentAgeHours <= 48) score += 10;
  else if (opLastCommentAgeHours > 72 && opLastCommentAgeHours !== Infinity)
    score -= 15;
  else if (opLastCommentAgeHours === Infinity && ageHours > 6) score -= 15;
  // else: OP never engaged and thread < 6h → neutral (too new to penalize)

  return score;
}

// Fetch thread comments and return hours since OP's most recent comment.
// Returns Infinity if OP has not commented.
async function fetchOpLastCommentAgeHours(post, attempt = 0) {
  // permalink is like "/r/<sub>/comments/<id>/<slug>/" — hit the OAuth host.
  const url = `https://oauth.reddit.com${post.permalink}.json?limit=50`;
  let res;
  try {
    res = await fetch(url, { headers: authHeaders() });
  } catch (err) {
    console.error(`  ! network error fetching ${post.permalink}: ${err.message}`);
    return Infinity;
  }
  if (res.status === 429 && attempt === 0) {
    await sleep(5000);
    return fetchOpLastCommentAgeHours(post, 1);
  }
  if (!res.ok) return Infinity;
  const body = await res.json().catch(() => null);
  // Reddit returns [postListing, commentsListing]
  const comments = body?.[1]?.data?.children ?? [];
  let latest = -Infinity;
  for (const c of comments) {
    const d = c?.data;
    if (!d) continue;
    if (d.author === post.author && typeof d.created_utc === "number") {
      if (d.created_utc > latest) latest = d.created_utc;
    }
  }
  if (latest === -Infinity) return Infinity;
  return (Date.now() / 1000 - latest) / 3600;
}

function opEngagementString(h) {
  if (h === Infinity) return "OP never engaged";
  if (h < 1) return `OP last engaged: ${Math.round(h * 60)} min ago`;
  if (h < 24) return `OP last engaged: ${Math.round(h)} hr ago`;
  return `OP last engaged: ${Math.round(h / 24)} days ago`;
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
  ACCESS_TOKEN = await getAccessToken();
  console.error("authenticated with Reddit OAuth\n");

  const seen = new Map(); // id -> { post, score }

  for (const sub of SUBS) {
    const queries = QUERIES_PER_SUB[sub] ?? [];
    for (const q of queries) {
      console.error(`fetching r/${sub} "${q}"`);
      const posts = await fetchSearch(sub, q);
      for (const post of posts) {
        if (!isUsable(post)) continue;
        if (seen.has(post.id)) continue;
        // Provisional entry; OP engagement is fetched in a second pass so
        // we don't issue an extra API call for posts that will be filtered.
        seen.set(post.id, { post, score: 0, opLastCommentAgeHours: Infinity });
      }
      await sleep(REQUEST_DELAY_MS);
    }
  }

  // Second pass: fetch OP engagement for each surviving candidate.
  console.error(`\nfetching OP engagement for ${seen.size} candidates...`);
  for (const entry of seen.values()) {
    const h = await fetchOpLastCommentAgeHours(entry.post);
    entry.opLastCommentAgeHours = h;
    entry.score = scoreCandidate(entry.post, h);
    await sleep(REQUEST_DELAY_MS);
  }

  const ranked = [...seen.values()].sort((a, b) => b.score - a.score);
  const top = ranked.slice(0, TOP_N);

  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# Reddit Thread Candidates — ${today}`);
  lines.push("");
  if (top.length === 0) {
    lines.push(`_No candidates found in the last ${MAX_AGE_HOURS} hours._`);
  } else {
    top.forEach(({ post, score, opLastCommentAgeHours }, i) => {
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
      lines.push(`**${opEngagementString(opLastCommentAgeHours)}**`);
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
