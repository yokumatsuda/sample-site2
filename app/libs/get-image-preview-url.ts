// app\libs\get-image-preview-url.ts
export function getImagePreviewUrl(src: string, width = 32) {
  if (!src.startsWith("https://images.microcms-assets.io/")) {
    return null;
  }

  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", "20");

  return url.toString();
}
