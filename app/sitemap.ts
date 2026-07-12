// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllCategories, getAllSlugs } from "./libs/microcms";
import { siteMeta } from "./libs/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllSlugs();
  const categories = await getAllCategories();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteMeta.siteUrl,
    },
    {
      url: `${siteMeta.siteUrl}/about`,
    },
    {
      url: `${siteMeta.siteUrl}/blog`,
    },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteMeta.siteUrl}/blog/${post.slug}`,
    lastModified: post.revisedAt ?? post.updatedAt,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => {
    const categorySlug = category.slug ?? category.id;

    return {
      url: `${siteMeta.siteUrl}/blog/category/${categorySlug}`,
      lastModified: category.revisedAt ?? category.updatedAt,
    };
  });

  return [...staticPages, ...postPages, ...categoryPages];
}
