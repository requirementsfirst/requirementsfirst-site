import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { fontData, experimental_getFontFileURL } from "astro:assets";
import satori from "satori";
import sharp from "sharp";
import { getFontPathByWeight } from "@/utils/getFontPathByWeight";
import { getPostSlug } from "@/utils/getPostPaths";
import { renderOgTemplate } from "@/utils/ogTemplate";
import config from "@/config";

export async function getStaticPaths() {
  if (!config.features.dynamicOgImage) {
    return [];
  }

  const posts = await getCollection("posts").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: getPostSlug(post.id, post.filePath) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props, url }) => {
  if (!config.features.dynamicOgImage) {
    return new Response(null, { status: 404, statusText: "Not found" });
  }

  const inter = fontData["--font-inter"];
  const regularPath = getFontPathByWeight(inter, 400);
  const semiPath = getFontPathByWeight(inter, 600);
  const boldPath = getFontPathByWeight(inter, 700);

  if (!regularPath || !semiPath || !boldPath) {
    throw new Error("Cannot find the Inter font path.");
  }

  const [regularData, semiData, boldData] = await Promise.all([
    fetch(experimental_getFontFileURL(regularPath, url)).then(r =>
      r.arrayBuffer()
    ),
    fetch(experimental_getFontFileURL(semiPath, url)).then(r => r.arrayBuffer()),
    fetch(experimental_getFontFileURL(boldPath, url)).then(r => r.arrayBuffer()),
  ]);

  const svg = await satori(renderOgTemplate({ title: props.data.title }), {
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
