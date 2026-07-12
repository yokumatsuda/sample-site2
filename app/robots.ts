// app/robots.ts
import type { MetadataRoute } from "next";
import { siteMeta } from "./libs/constants";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteMeta.siteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
