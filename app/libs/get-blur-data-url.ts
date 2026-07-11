// app\libs\get-blur-data-url.ts
import "server-only";

import fs from "fs/promises";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

const blurDataURLCache = new Map<string, Promise<string | null> | string>();

export async function getBlurDataURL(src: string | null | undefined) {
  if (!src) {
    return null;
  }

  if (blurDataURLCache.has(src)) {
    return blurDataURLCache.get(src) ?? null;
  }

  const blurDataURLPromise = generateBlurDataURL(src);
  blurDataURLCache.set(src, blurDataURLPromise);

  const blurDataURL = await blurDataURLPromise;

  if (blurDataURL) {
    blurDataURLCache.set(src, blurDataURL);
  } else {
    blurDataURLCache.delete(src);
  }

  return blurDataURL;
}

async function generateBlurDataURL(src: string) {
  try {
    if (src.startsWith("/")) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        src.replace(/^\/+/, ""),
      );

      const imageBuffer = await fs.readFile(imagePath);
      const { base64 } = await getPlaiceholder(imageBuffer);

      return base64;
    }

    const response = await fetch(src);

    if (!response.ok) {
      console.warn(`Failed to fetch image for blur: ${src}`);
      return null;
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const { base64 } = await getPlaiceholder(imageBuffer);

    return base64;
  } catch (error) {
    console.warn(`Failed to generate blurDataURL: ${src}`);
    console.warn(error);
    return null;
  }
}
