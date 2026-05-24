/**
 * Homepage-polish post-deploy verifier.
 *
 * Sits alongside ./verify.mjs (which covers fonts / OG / newsletter).
 * Runs seven assertions against the live homepage and one regression
 * check against an article page. Outputs verdict.txt + a screenshot of
 * the hero region.
 *
 * Run with:  cd tools && node verify-homepage.mjs
 */
import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";

await mkdir("./screenshots", { recursive: true });

const HOME = "https://requirementsfirst.com/";
const ARTICLE =
  "https://requirementsfirst.com/posts/writing-better-user-stories-wrong-goal/";

// The old Astro Paper accent for light-mode links was #006cac. The RSS
// icon used to render with stroke-accent => stroke="#006cac" (resolved
// via Tailwind tokens). After the recolour it should resolve to the
// muted foreground (#6b7280 light / #afb9ca dark) via currentColor.
const OLD_ACCENT = "#006cac";

const results = {};

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
});
const page = await ctx.newPage();
await page.goto(HOME, { waitUntil: "networkidle" });

// Capture the raw HTML once for string-level assertions
const homeHtml = await page.content();

// =========================================================================
// a) RSS icon colour
// =========================================================================
{
  const rss = await page.evaluate(() => {
    // The RSS feed link is the <a> with aria-label="RSS Feed"
    const a = document.querySelector('a[aria-label="RSS Feed"]');
    if (!a) return null;
    const svg = a.querySelector("svg");
    if (!svg) return { hasLink: true, hasSvg: false };
    const cs = getComputedStyle(svg);
    return {
      hasLink: true,
      hasSvg: true,
      strokeAttr: svg.getAttribute("stroke"),
      fillAttr: svg.getAttribute("fill"),
      computedColor: cs.color,
      computedStroke: cs.stroke,
      // Walk inline style + class to surface any hard-coded blue
      svgOuterHtml: svg.outerHTML.slice(0, 600),
    };
  });

  let pass = true;
  let reason = "";
  if (!rss || !rss.hasLink) {
    pass = false;
    reason = "no RSS link on the homepage";
  } else if (!rss.hasSvg) {
    pass = false;
    reason = "RSS link has no inline SVG to inspect";
  } else {
    // Currentcolor / inherit affordance: the SVG must use currentColor for
    // its stroke (or fill) so its colour is owned by the wrapping element.
    const usesCurrentColor =
      rss.strokeAttr === "currentColor" || rss.fillAttr === "currentColor";
    if (!usesCurrentColor) {
      pass = false;
      reason = `SVG does not use currentColor (stroke=${rss.strokeAttr} fill=${rss.fillAttr})`;
    } else if (rss.svgOuterHtml.toLowerCase().includes(OLD_ACCENT)) {
      pass = false;
      reason = `SVG markup contains old accent ${OLD_ACCENT}`;
    } else if (
      rss.computedColor.toLowerCase().replace(/\s+/g, "") ===
      "rgb(0,108,172)"
    ) {
      // #006cac == rgb(0,108,172)
      pass = false;
      reason = `computed colour resolved to the old accent rgb(0,108,172)`;
    }
  }

  results.a = { pass, rss, reason };
}

// =========================================================================
// b) Hero no longer renders article-masthead artefacts
// =========================================================================
{
  const masthead = await page.evaluate(() => {
    const hero = document.querySelector("#hero");
    if (!hero) return null;
    const heroHtml = hero.innerHTML;
    const eyebrowEls = hero.querySelectorAll(".eyebrow");
    const hrEls = hero.querySelectorAll("hr");
    const bylineMatch = /By\s+Arun Mehta\s+·\s+\d+/.test(hero.textContent);
    return {
      eyebrowCount: eyebrowEls.length,
      hrCount: hrEls.length,
      bylineMatch,
      heroHtmlLen: heroHtml.length,
    };
  });

  let pass = true;
  let reason = "";
  if (!masthead) {
    pass = false;
    reason = "no #hero section on homepage";
  } else if (masthead.eyebrowCount > 0) {
    pass = false;
    reason = `found ${masthead.eyebrowCount} .eyebrow inside #hero`;
  } else if (masthead.hrCount > 0) {
    pass = false;
    reason = `found ${masthead.hrCount} <hr> inside #hero (masthead separator pattern)`;
  } else if (masthead.bylineMatch) {
    pass = false;
    reason = "byline string 'By Arun Mehta · N' present in #hero";
  }

  results.b = { pass, masthead, reason };
}

// =========================================================================
// c) Hero description in serif
// =========================================================================
{
  const desc = await page.evaluate(() => {
    // Prefer the explicit id, fall back to first <p> after the H1 in #hero
    const explicit = document.querySelector("#hero-description");
    let el = explicit ? explicit.querySelector("p") || explicit : null;
    if (!el) {
      const heroP = document.querySelectorAll("#hero p");
      el = heroP[0];
    }
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { fontFamily: cs.fontFamily, text: (el.textContent || "").slice(0, 80) };
  });

  let pass = true;
  let reason = "";
  if (!desc) {
    pass = false;
    reason = "no hero description element found";
  } else {
    const ff = (desc.fontFamily || "").toLowerCase();
    const ffStripped = ff.replace(/sans-serif/g, "");
    const hasSerif =
      ffStripped.includes("source serif") || /\bserif\b/.test(ffStripped);
    if (!hasSerif) {
      pass = false;
      reason = `description font-family is not Source Serif: ${desc.fontFamily}`;
    }
  }

  results.c = { pass, desc, reason };
}

// =========================================================================
// d) Editorial sign-off present, in Inter + uppercase
// =========================================================================
{
  const sign = await page.evaluate(() => {
    const el = document.querySelector("#hero-signoff");
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      text: el.textContent.trim(),
      fontFamily: cs.fontFamily,
      textTransform: cs.textTransform,
      letterSpacing: cs.letterSpacing,
    };
  });

  let pass = true;
  let reason = "";
  if (!sign) {
    pass = false;
    reason = "no #hero-signoff element on homepage";
  } else {
    const ff = (sign.fontFamily || "").toLowerCase();
    const hasInter = ff.includes("inter");
    // Match em-dash (U+2014) + optional whitespace + RequirementsFirst
    const hasSignoff = /—\s*RequirementsFirst/.test(sign.text);
    const upper = sign.textTransform === "uppercase";
    if (!hasSignoff) {
      pass = false;
      reason = `text does not match em-dash + RequirementsFirst (got "${sign.text}")`;
    } else if (!hasInter) {
      pass = false;
      reason = `sign-off font-family is not Inter: ${sign.fontFamily}`;
    } else if (!upper) {
      pass = false;
      reason = `sign-off text-transform is not uppercase (${sign.textTransform})`;
    }
  }

  results.d = { pass, sign, reason };
}

// =========================================================================
// e) Social Links row removed (hero region only — Footer mail link is
//    global chrome and intentionally untouched by this design pass)
// =========================================================================
{
  const social = await page.evaluate(() => {
    const hero = document.querySelector("#hero");
    if (!hero) return { heroFound: false };
    const labelMatch = /Social Links\s*:/i.test(hero.textContent);
    const mailLinkCount = hero.querySelectorAll('a[href^="mailto:"]').length;
    return {
      heroFound: true,
      labelMatch,
      mailLinkCount,
    };
  });

  let pass = true;
  let reason = "";
  if (!social.heroFound) {
    pass = false;
    reason = "no #hero section";
  } else if (social.labelMatch) {
    pass = false;
    reason = '"Social Links:" label still present in #hero';
  } else if (social.mailLinkCount > 0) {
    pass = false;
    reason = `${social.mailLinkCount} mailto: link(s) inside #hero (expected 0)`;
  }

  results.e = { pass, social, reason };
}

// =========================================================================
// f) Article masthead regression (eyebrow + byline + hr still there)
// =========================================================================
{
  const articlePage = await ctx.newPage();
  await articlePage.goto(ARTICLE, { waitUntil: "networkidle" });
  const probe = await articlePage.evaluate(() => {
    const m = document.querySelector(".post-masthead");
    if (!m) return null;
    return {
      hasMasthead: true,
      eyebrowHref: m
        .querySelector(
          'a[class*="uppercase"], a[class*="tracking-\\[0\\.08em\\]"]'
        )
        ?.getAttribute("href"),
      bylineMatch: /By Arun Mehta\s+·/.test(m.textContent),
      hrCount: m.querySelectorAll("hr").length,
    };
  });
  await articlePage.close();

  let pass = true;
  let reason = "";
  if (!probe) {
    pass = false;
    reason = "post-masthead not found on article page";
  } else if (!probe.eyebrowHref) {
    pass = false;
    reason = "eyebrow tag link missing in masthead";
  } else if (!probe.bylineMatch) {
    pass = false;
    reason = "byline 'By Arun Mehta · …' missing";
  } else if (probe.hrCount < 1) {
    pass = false;
    reason = "masthead hr separator missing";
  }

  results.f = { pass, probe, reason };
}

// =========================================================================
// g) Dark-mode CSS sanity — the bundled CSS must contain [data-theme="dark"]
//    rules that target the new hero elements (sign-off / description).
// =========================================================================
{
  // Find the homepage CSS bundle URL by inspecting the rendered <head>
  const cssHrefs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(
      l => l.href
    )
  );

  let bundles = [];
  for (const href of cssHrefs) {
    try {
      const res = await fetch(href);
      if (res.ok) bundles.push({ href, text: await res.text() });
    } catch (_) {
      /* ignore */
    }
  }

  // We want to see:
  //  - SOMETHING under [data-theme=dark] or .dark
  //  - that targets dark variants of utilities applied to the new hero
  //    elements (e.g. text-muted-foreground via dark:text-muted-foreground)
  const allCss = bundles.map(b => b.text).join("\n");
  const darkScopeCount =
    (allCss.match(/\[data-theme="dark"\]|\[data-theme=dark\]|\.dark\b/g) || [])
      .length;

  // Look for a rule that names a class used by the new hero sign-off /
  // description AND lives inside a dark scope.
  const heroDarkRule =
    /\[data-theme=["']?dark["']?\][^{}]*(text-muted-foreground|text-foreground\\\/90|text-foreground\/90|font-serif|tracking-\[0\.08em\])/i.test(
      allCss
    );

  let pass = true;
  let reason = "";
  if (bundles.length === 0) {
    pass = false;
    reason = "could not fetch any homepage CSS bundle";
  } else if (darkScopeCount === 0) {
    pass = false;
    reason = "no [data-theme=dark] / .dark selectors in any bundle";
  } else if (!heroDarkRule) {
    pass = false;
    reason = "no dark-scoped rule targets the new hero classes";
  }

  results.g = {
    pass,
    bundleCount: bundles.length,
    darkScopeCount,
    heroDarkRule,
    reason,
  };
}

// Hero screenshot for the eyeball test
await page.screenshot({
  path: "./screenshots/homepage-hero.png",
  fullPage: false,
});
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.screenshot({
  path: "./screenshots/homepage-full.png",
  fullPage: true,
});

await browser.close();

// ---- Report ----
const labels = {
  a: "RSS icon recolour",
  b: "No masthead artefacts in hero",
  c: "Hero description in serif",
  d: "Editorial sign-off present",
  e: "Social Links row removed from hero",
  f: "Article masthead regression check",
  g: "Dark-mode CSS sanity",
};

const lines = [];
const ids = ["a", "b", "c", "d", "e", "f", "g"];
for (const id of ids) {
  const r = results[id];
  lines.push(`CHECK ${id}) ${labels[id]}: ${r.pass ? "PASS" : "FAIL"}`);
  if (!r.pass) lines.push(`  reason: ${r.reason}`);
}
const failed = ids.filter(id => !results[id].pass);
lines.push("");
lines.push(
  failed.length === 0
    ? "OVERALL: ALL PASS"
    : `OVERALL: FAILED: ${failed.join(",")}`
);

// Also write a JSON dump for debugging when something fails
await writeFile(
  "./verdict-homepage.json",
  JSON.stringify(results, null, 2)
);
const report = lines.join("\n");
console.log(report);
await writeFile("./verdict-homepage.txt", report);
process.exit(failed.length === 0 ? 0 : 1);
