import type { FontData } from "astro:assets";

export function getFontPathByWeight(
  fonts: FontData[],
  weight: number,
  options?: {
    style?: "normal" | "italic";
    format?: string;
  }
): string | undefined {
  const style = options?.style ?? "normal";
  const format = options?.format ?? "truetype";

  // Find the FontData entry whose weight+style matches AND whose src
  // contains the requested format. When a font is configured with multiple
  // formats (e.g. woff2 + ttf), Astro emits separate FontData entries per
  // format, so we must check the src list before settling on a candidate.
  for (const font of fonts) {
    if (font.weight !== String(weight) || font.style !== style) continue;
    const hit = font.src.find(file => file.format === format);
    if (hit) return hit.url;
  }
  return undefined;
}
