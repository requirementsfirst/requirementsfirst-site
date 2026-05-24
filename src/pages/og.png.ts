import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import { fontData, experimental_getFontFileURL } from "astro:assets";
import { getFontPathByWeight } from "@/utils/getFontPathByWeight";
import config from "@/config";
import { renderOgTemplate } from "@/utils/ogTemplate";

export const GET: APIRoute = async context => {
  const inter = fontData["--font-inter"];
  const regularPath = getFontPathByWeight(inter, 400);
  const semiPath = getFontPathByWeight(inter, 600);
  const boldPath = getFontPathByWeight(inter, 700);

  if (!regularPath || !semiPath || !boldPath) {
    throw new Error("Cannot find the Inter font path.");
  }

  const [regularData, semiData, boldData] = await Promise.all([
    fetch(experimental_getFontFileURL(regularPath, context.url)).then(r =>
      r.arrayBuffer()
    ),
    fetch(experimental_getFontFileURL(semiPath, context.url)).then(r =>
      r.arrayBuffer()
    ),
    fetch(experimental_getFontFileURL(boldPath, context.url)).then(r =>
      r.arrayBuffer()
    ),
  ]);

  const svg = await satori(renderOgTemplate({ title: config.site.title }), {
    width: 1200,
    height: 630,
    embedFont: true,
    fonts: [
      { name: "Inter", data: regularData, weight: 400, style: "normal" },
      { name: "Inter", data: semiData, weight: 600, style: "normal" },
      { name: "Inter", data: boldData, weight: 700, style: "normal" },
    ],
  });

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};
