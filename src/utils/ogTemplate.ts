import config from "@/config";

/**
 * Shared Satori template for OG images.
 *
 * 1200x630 black canvas with three text elements:
 *   - top-left wordmark "RequirementsFirst" (Inter SemiBold, white, 32px)
 *   - centre title (Inter Bold, white, ~64-72px, left-aligned, max 3 lines)
 *   - bottom-left hostname (Inter Regular, muted grey, 24px)
 *
 * No illustrations, gradients, avatars, or dates by design.
 */
export function renderOgTemplate({ title }: { title: string }) {
  const hostname = new URL(config.site.url).hostname;
  const wordmark = "RequirementsFirst";

  // Scale title down for very long strings so it still fits in three lines.
  const titleFontSize = title.length > 80 ? 56 : title.length > 50 ? 64 : 72;

  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        background: "#000000",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        fontFamily: "Inter",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            },
            children: wordmark,
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontSize: titleFontSize,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: "1040px",
              // Max ~3 lines visually; Satori doesn't fully implement
              // -webkit-line-clamp, but combined with the fontSize scaling
              // above this stays within the safe area for realistic titles.
              overflow: "hidden",
            },
            children: title,
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontSize: 24,
              fontWeight: 400,
              color: "#888888",
            },
            children: hostname,
          },
        },
      ],
    },
  };
}
