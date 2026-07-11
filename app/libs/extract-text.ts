// app\libs\extract-text.ts
import { convert } from "html-to-text";

export function extractText(html = "", length = 80, more = "..."): string {
  const text = convert(html, {
    selectors: [
      { selector: "img", format: "skip" },
      { selector: "a", options: { ignoreHref: true } },
    ],
  })
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length) + more;
}
