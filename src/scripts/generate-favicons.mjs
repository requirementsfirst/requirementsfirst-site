/**
 * Generate raster favicons from public/favicon.svg.
 *
 * Outputs:
 *   public/favicon-16x16.png
 *   public/favicon-32x32.png
 *   public/apple-touch-icon.png  (180x180, with ~12% safe padding so iOS
 *                                 rounded corners don't clip the mark)
 *
 * Run with:  node src/scripts/generate-favicons.mjs
 *
 * Notes:
 * - The favicon mark "R/" is rendered as <text> in SVG. sharp's librsvg
 *   backend resolves the font via fontconfig; on machines without Inter
 *   installed the renderer falls back to a similar sans-serif, which is
 *   acceptable for a 16/32px raster mark and an apple-touch-icon. The
 *   primary favicon is the SVG itself (Astro Paper supports SVG icons).
 */
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "..", "..", "public");

const svgPath = resolve(publicDir, "favicon.svg");
const svgBuf = await readFile(svgPath);

async function emit(name, size, density = 384) {
  const out = resolve(publicDir, name);
  // Render the SVG at a high density first so the text glyph is sharp,
  // then downscale to the target favicon size.
  const buf = await sharp(svgBuf, { density })
    .resize(size, size, { fit: "fill" })
    .png()
    .toBuffer();
  await writeFile(out, buf);
  console.log(`wrote ${name} (${size}x${size})`);
}

// Padded apple-touch-icon: render the SVG into the inner 76% of the canvas
// so iOS's rounded corners don't clip the mark. Padding is ~12% per side.
async function emitAppleTouch(size = 180) {
  const inner = Math.round(size * 0.76);
  const padded = Math.round((size - inner) / 2);
  const mark = await sharp(svgBuf, { density: 512 })
    .resize(inner, inner, { fit: "fill" })
    .png()
    .toBuffer();

  const out = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  })
    .composite([{ input: mark, left: padded, top: padded }])
    .png()
    .toBuffer();

  await writeFile(resolve(publicDir, "apple-touch-icon.png"), out);
  console.log(`wrote apple-touch-icon.png (${size}x${size}, inner ${inner})`);
}

await mkdir(publicDir, { recursive: true });
await emit("favicon-16x16.png", 16);
await emit("favicon-32x32.png", 32);
await emitAppleTouch(180);
