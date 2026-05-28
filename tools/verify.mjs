import { chromium, devices } from "playwright";
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

// ===== CHECK 4: Newsletter embed present on article page =====
// We embed Beehiiv via a direct iframe (the loader.js script approach
// was flaky on iOS Safari). Verify exactly one beehiiv iframe + one
// section + one heading on the article page.
{
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await ctx.newPage();
  await page.goto(ARTICLE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  const iframeCount = await page.evaluate(
    () =>
      document.querySelectorAll(
        'iframe[src*="subscribe-forms.beehiiv.com"]'
      ).length
  );
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
  if (iframeCount !== 1) {
    pass = false;
    reason = `expected 1 beehiiv iframe, found ${iframeCount}`;
  } else if (sectionCount !== 1) {
    pass = false;
    reason = `expected 1 newsletter section[aria-labelledby], found ${sectionCount}`;
  } else if (headingCount !== 1) {
    pass = false;
    reason = `expected 1 #newsletter-signup-heading, found ${headingCount}`;
  }

  results.check4 = { pass, iframeCount, sectionCount, headingCount, reason };
}

// ===== CHECK 5: Mobile — no stray "#" next to h2 headings =====
{
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices["iPhone 14"] });
  const page = await ctx.newPage();
  await page.goto(ARTICLE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Visible "#" characters either inside h2 or in an anchor child of h2.
  const offenders = await page.evaluate(() => {
    const out = [];
    for (const h of document.querySelectorAll("h2")) {
      const txt = h.textContent || "";
      const cs = getComputedStyle(h);
      const visible = cs.display !== "none" && cs.visibility !== "hidden";
      if (!visible) continue;
      // Check for "#" rendered inside h2 with non-zero opacity
      const anchors = h.querySelectorAll("a");
      for (const a of anchors) {
        const aText = (a.textContent || "").trim();
        const opacity = parseFloat(getComputedStyle(a).opacity || "1");
        if (aText.includes("#") && opacity > 0) {
          out.push({ h2: txt.slice(0, 60), anchorText: aText, opacity });
        }
      }
      // Bare "#" as direct text node in h2 (no anchor wrap)
      for (const node of h.childNodes) {
        if (node.nodeType === 3 && node.nodeValue.includes("#")) {
          out.push({ h2: txt.slice(0, 60), bareText: node.nodeValue.trim() });
        }
      }
    }
    return out;
  });

  await page.screenshot({
    path: "./screenshots/05-mobile-article.png",
    fullPage: true,
  });
  await browser.close();

  const pass = offenders.length === 0;
  results.check5 = {
    pass,
    offenders,
    reason: pass ? "" : `${offenders.length} h2(s) show a visible '#' on mobile`,
  };
}

// ===== CHECK 6: Newsletter form rendered + no overflow, MOBILE viewport =====
// The original bugs are mobile-specific (iOS Safari): on an article
// page the form sometimes failed to render at all, and on the homepage
// the embed overflowed its dashed-border container in dark mode. We
// run this at iPhone 14 viewport and exercise BOTH home + article pages
// in BOTH color schemes. PASS only if every (page, scheme) combo has
// a beehiiv iframe inside the section AND the section's right edge
// does not exceed the viewport width.
{
  const browser = await chromium.launch();
  const targets = [
    { name: "home/light", url: "https://requirementsfirst.com/", scheme: "light" },
    { name: "home/dark", url: "https://requirementsfirst.com/", scheme: "dark" },
    { name: "article/light", url: ARTICLE_URL, scheme: "light" },
    { name: "article/dark", url: ARTICLE_URL, scheme: "dark" },
  ];
  const samples = [];

  for (const t of targets) {
    const ctx = await browser.newContext({
      ...devices["iPhone 14"],
      colorScheme: t.scheme,
    });
    const page = await ctx.newPage();
    await page.goto(t.url, { waitUntil: "networkidle" });
    await page.waitForTimeout(5000);

    const s = await page.evaluate(() => {
      const section = document.querySelector(
        'section[aria-labelledby="newsletter-signup-heading"]'
      );
      if (!section) return { sectionFound: false };
      const r = section.getBoundingClientRect();
      const iframe = section.querySelector("iframe");
      const iframeRect = iframe?.getBoundingClientRect() ?? null;
      // Widest descendant — catches Beehiiv-injected children that
      // exceed the section's own bounding box.
      let widest = 0;
      for (const el of section.querySelectorAll("*")) {
        const w = el.getBoundingClientRect().right;
        if (w > widest) widest = w;
      }
      return {
        sectionFound: true,
        viewportWidth: window.innerWidth,
        sectionRight: r.right,
        widestDescendantRight: widest,
        hasIframe: !!iframe,
        iframeRight: iframeRect?.right ?? null,
        iframeSrc: iframe?.src ?? null,
      };
    });
    await page.screenshot({
      path: `./screenshots/06-${t.name.replace("/", "-")}.png`,
      fullPage: true,
    });
    await ctx.close();
    samples.push({ ...t, ...s });
  }
  await browser.close();

  let pass = true;
  let reason = "";
  const failures = [];
  for (const s of samples) {
    if (!s.sectionFound) {
      failures.push(`${s.name}: newsletter section not found`);
      continue;
    }
    if (
      !s.hasIframe ||
      !(s.iframeSrc || "").includes("subscribe-forms.beehiiv.com")
    ) {
      failures.push(`${s.name}: no beehiiv iframe inside section`);
      continue;
    }
    // Overflow check: nothing inside the section should extend past the viewport.
    // Allow a 2px rounding tolerance.
    if (s.widestDescendantRight > s.viewportWidth + 2) {
      failures.push(
        `${s.name}: overflow — widest descendant right=${Math.round(
          s.widestDescendantRight
        )}px > viewport ${s.viewportWidth}px`
      );
    }
  }
  if (failures.length) {
    pass = false;
    reason = failures.join(" | ");
  }

  results.check6 = { pass, samples, reason };
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
lines.push(`  Beehiiv iframes found:     ${results.check4.iframeCount}`);
lines.push(`  Newsletter sections found: ${results.check4.sectionCount}`);
lines.push(`  Newsletter headings found: ${results.check4.headingCount}`);
if (!results.check4.pass)
  lines.push(`  Reason if fail: ${results.check4.reason}`);
lines.push("");

lines.push(`CHECK 5 (Mobile heading anchors): ${results.check5.pass ? "PASS" : "FAIL"}`);
lines.push(`  Offending h2s: ${results.check5.offenders.length}`);
for (const o of results.check5.offenders) lines.push(`    - ${JSON.stringify(o)}`);
if (!results.check5.pass) lines.push(`  Reason if fail: ${results.check5.reason}`);
lines.push("");
lines.push(`CHECK 6 (Newsletter form rendered + no mobile overflow): ${results.check6.pass ? "PASS" : "FAIL"}`);
for (const s of results.check6.samples ?? []) {
  lines.push(
    `  ${s.name.padEnd(14)} iframe=${s.hasIframe} widestRight=${
      s.widestDescendantRight != null ? Math.round(s.widestDescendantRight) : "?"
    }px viewport=${s.viewportWidth}px`
  );
}
if (!results.check6.pass) lines.push(`  Reason if fail: ${results.check6.reason}`);
lines.push("");

const failed = [1, 2, 3, 4, 5, 6].filter(i => !results[`check${i}`].pass);
lines.push(
  failed.length === 0
    ? "OVERALL: ALL PASS"
    : `OVERALL: FAILED CHECKS: ${failed.join(",")}`
);

const report = lines.join("\n");
console.log(report);
await writeFile("./verdict.txt", report);
process.exit(failed.length === 0 ? 0 : 1);
