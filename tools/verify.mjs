import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";

await mkdir("./screenshots", { recursive: true });

const results = {};
const POST_URL =
  "https://requirementsfirst.com/posts/how-i-use-claude-to-interrogate-my-own-requirements/";
const ARTICLE_URL =
  "https://requirementsfirst.com/posts/the-question-most-bas-forget-to-ask-before-opening-jira/";

// ===== CHECK 1: Fonts =====
{
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });

  // Post page — verify Inter on H1, Source Serif on prose paragraphs
  const post = await ctx.newPage();
  await post.goto(POST_URL, { waitUntil: "networkidle" });
  const postH1Font = await post.evaluate(() => {
    const el = document.querySelector("h1");
    return el ? getComputedStyle(el).fontFamily : null;
  });
  // Paragraph inside the prose container. Astro Paper wraps with
  // .app-prose; the inner <article> carries it.
  const postPFont = await post.evaluate(() => {
    const sel = [
      "article.app-prose p",
      ".app-prose p",
      "article p",
      "main p",
    ];
    for (const s of sel) {
      const el = document.querySelector(s);
      if (el) return { selector: s, ff: getComputedStyle(el).fontFamily };
    }
    return null;
  });
  await post.screenshot({
    path: "./screenshots/01b-post-page.png",
    fullPage: true,
  });

  // Home page — verify H1 still Inter
  const home = await ctx.newPage();
  await home.goto("https://requirementsfirst.com/", { waitUntil: "networkidle" });
  const homeH1Font = await home.evaluate(() => {
    const el = document.querySelector("h1");
    return el ? getComputedStyle(el).fontFamily : null;
  });
  await home.screenshot({ path: "./screenshots/01-homepage.png", fullPage: true });

  await browser.close();

  const hasInter = ff => (ff ?? "").toLowerCase().includes("inter");
  const hasSerif = ff => {
    const stripped = (ff ?? "").toLowerCase().replace(/sans-serif/g, "");
    return stripped.includes("source serif") || /\bserif\b/.test(stripped);
  };

  const pFf = postPFont?.ff ?? null;

  let pass = true;
  let reason = "";
  if (!hasInter(postH1Font)) {
    pass = false;
    reason = "post H1 not Inter";
  } else if (!hasSerif(pFf)) {
    pass = false;
    reason = `post prose paragraph not Source Serif (selector ${postPFont?.selector})`;
  } else if (!hasInter(homeH1Font)) {
    pass = false;
    reason = "home H1 not Inter";
  }

  results.check1 = {
    pass,
    postH1Font,
    postPFont: pFf,
    postPSelector: postPFont?.selector,
    homeH1Font,
    reason,
  };
}

// ===== CHECK 2: Default OG =====
{
  const res = await fetch("https://requirementsfirst.com/og.png");
  const status = res.status;
  const ct = res.headers.get("content-type") ?? "";
  const buf = Buffer.from(await res.arrayBuffer());
  const size = buf.byteLength;
  await writeFile("./screenshots/02-default-og.png", buf);

  let pass = true;
  let reason = "";
  if (status !== 200) {
    pass = false;
    reason = `status ${status} (expected 200)`;
  } else if (!ct.startsWith("image/")) {
    pass = false;
    reason = `content-type "${ct}" does not start with image/`;
  } else if (size < 5 * 1024 || size > 500 * 1024) {
    pass = false;
    reason = `size ${size} outside 5KB-500KB range`;
  }

  results.check2 = { pass, status, ct, size, buf, reason };
}

// ===== CHECK 3: Per-post OG =====
{
  const url = `${POST_URL}index.png`;
  const res = await fetch(url);
  const status = res.status;
  const ct = res.headers.get("content-type") ?? "";
  const buf = Buffer.from(await res.arrayBuffer());
  const size = buf.byteLength;
  await writeFile("./screenshots/03-post-og.png", buf);

  const hash = createHash("sha256").update(buf).digest("hex");
  const defaultHash = createHash("sha256")
    .update(results.check2.buf)
    .digest("hex");
  const hashMatchesDefault = hash === defaultHash;

  let pass = true;
  let reason = "";
  if (status !== 200) {
    pass = false;
    reason = `status ${status} (expected 200)`;
  } else if (!ct.startsWith("image/")) {
    pass = false;
    reason = `content-type "${ct}" does not start with image/`;
  } else if (size < 5 * 1024) {
    pass = false;
    reason = `size ${size} below 5KB`;
  } else if (hashMatchesDefault) {
    pass = false;
    reason = `hash identical to default OG (not a per-post variant)`;
  }

  results.check3 = { pass, status, size, hashMatchesDefault, reason };
}

// ===== CHECK 4: Newsletter (strict, no keyword fallback) =====
{
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await ctx.newPage();
  await page.goto(ARTICLE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000); // let async Beehiiv loader settle

  const scriptCount = await page.evaluate(
    () =>
      document.querySelectorAll('script[src*="subscribe-forms.beehiiv.com"]')
        .length
  );

  // Stable selector from the NewsletterSignup component:
  //   <section aria-labelledby="newsletter-signup-heading"> ... </section>
  // The heading element carries id="newsletter-signup-heading".
  const sectionCount = await page.evaluate(
    () =>
      document.querySelectorAll(
        'section[aria-labelledby="newsletter-signup-heading"]'
      ).length
  );
  const headingCount = await page.evaluate(
    () => document.querySelectorAll("#newsletter-signup-heading").length
  );

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: "./screenshots/04-article-bottom.png",
    fullPage: true,
  });
  await browser.close();

  let pass = true;
  let reason = "";
  if (scriptCount !== 1) {
    pass = false;
    reason = `expected 1 beehiiv script tag, found ${scriptCount}`;
  } else if (sectionCount !== 1) {
    pass = false;
    reason = `expected 1 newsletter section[aria-labelledby], found ${sectionCount}`;
  } else if (headingCount !== 1) {
    pass = false;
    reason = `expected 1 #newsletter-signup-heading, found ${headingCount}`;
  }

  results.check4 = { pass, scriptCount, sectionCount, headingCount, reason };
}

// ===== Output =====
const lines = [];
lines.push(`CHECK 1 (Fonts): ${results.check1.pass ? "PASS" : "FAIL"}`);
lines.push(`  post h1 font-family:  ${results.check1.postH1Font}`);
lines.push(
  `  post prose p (${results.check1.postPSelector}) font-family: ${results.check1.postPFont}`
);
lines.push(`  home h1 font-family:  ${results.check1.homeH1Font}`);
if (!results.check1.pass)
  lines.push(`  Reason if fail: ${results.check1.reason}`);
lines.push("");
lines.push(`CHECK 2 (Default OG): ${results.check2.pass ? "PASS" : "FAIL"}`);
lines.push(`  HTTP status: ${results.check2.status}`);
lines.push(`  Content-Type: ${results.check2.ct}`);
lines.push(`  Size: ${results.check2.size}`);
if (!results.check2.pass)
  lines.push(`  Reason if fail: ${results.check2.reason}`);
lines.push("");
lines.push(`CHECK 3 (Per-post OG): ${results.check3.pass ? "PASS" : "FAIL"}`);
lines.push(`  HTTP status: ${results.check3.status}`);
lines.push(`  Size: ${results.check3.size}`);
lines.push(
  `  Hash matches default: ${results.check3.hashMatchesDefault ? "YES" : "NO"}`
);
if (!results.check3.pass)
  lines.push(`  Reason if fail: ${results.check3.reason}`);
lines.push("");
lines.push(`CHECK 4 (Newsletter): ${results.check4.pass ? "PASS" : "FAIL"}`);
lines.push(`  Beehiiv script tags found: ${results.check4.scriptCount}`);
lines.push(`  Newsletter sections found: ${results.check4.sectionCount}`);
lines.push(`  Newsletter headings found: ${results.check4.headingCount}`);
if (!results.check4.pass)
  lines.push(`  Reason if fail: ${results.check4.reason}`);
lines.push("");

const failed = [1, 2, 3, 4].filter(i => !results[`check${i}`].pass);
lines.push(
  failed.length === 0
    ? "OVERALL: ALL PASS"
    : `OVERALL: FAILED CHECKS: ${failed.join(",")}`
);

const report = lines.join("\n");
console.log(report);
await writeFile("./verdict.txt", report);
process.exit(failed.length === 0 ? 0 : 1);
