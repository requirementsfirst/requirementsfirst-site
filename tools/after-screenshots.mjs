import { chromium, devices } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir("../screenshots-after", { recursive: true });

const ARTICLE =
  "https://requirementsfirst.com/posts/ba-vs-po-vs-pm-the-honest-difference/";
const targets = [
  { name: "home-light", url: "https://requirementsfirst.com/", scheme: "light" },
  { name: "home-dark", url: "https://requirementsfirst.com/", scheme: "dark" },
  { name: "article-light", url: ARTICLE, scheme: "light" },
  { name: "article-dark", url: ARTICLE, scheme: "dark" },
];

const browser = await chromium.launch();
for (const t of targets) {
  const ctx = await browser.newContext({
    ...devices["iPhone 14"],
    colorScheme: t.scheme,
  });
  const page = await ctx.newPage();
  await page.goto(t.url, { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  const section = await page.$(
    'section[aria-labelledby="newsletter-signup-heading"]'
  );
  if (!section) {
    console.log(`${t.name}: section not found`);
    await ctx.close();
    continue;
  }
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await section.screenshot({
    path: `../screenshots-after/${t.name}.png`,
  });
  console.log(`${t.name}: saved`);
  await ctx.close();
}
await browser.close();
