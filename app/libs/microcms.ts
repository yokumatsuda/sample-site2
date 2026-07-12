// app\libs\microcms.ts
import "server-only";
import { cache } from "react";
import {
  createClient,
  type MicroCMSImage,
  type MicroCMSListContent,
  type MicroCMSListResponse,
} from "microcms-js-sdk";

if (!process.env.SERVICE_DOMAIN) {
  throw new Error("SERVICE_DOMAIN is required");
}

if (!process.env.API_KEY) {
  throw new Error("API_KEY is required");
}

export type Category = {
  name: string;
  slug?: string;
} & MicroCMSListContent;

export type BlogListItem = {
  title: string;
  slug: string;
  eyecatch?: MicroCMSImage;
} & MicroCMSListContent;

export type BlogPost = {
  title: string;
  slug: string;
  publishDate: string;
  content: string;
  eyecatch?: MicroCMSImage;
  categories?: Category[];
} & MicroCMSListContent;

export type BlogSlugItem = {
  title: string;
  slug: string;
} & MicroCMSListContent;

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
});

export async function getPostsPage(
  limit = 10,
  offset = 0,
): Promise<MicroCMSListResponse<BlogListItem>> {
  return client.getList<BlogListItem>({
    endpoint: "blogs",
    queries: {
      fields: "title,slug,eyecatch",
      orders: "-publishDate",
      limit,
      offset,
    },
  });
}

export async function getAllCategories(limit = 100): Promise<Category[]> {
  const data = await client.getList<Category>({
    endpoint: "categories",
    queries: {
      fields: "id,name,slug",
      limit,
    },
  });
  return data.contents;
}

export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const data = await client.getList<BlogPost>({
      endpoint: "blogs",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });

    return data.contents[0] ?? null;
  },
);

export async function getAllSlugs(limit = 100): Promise<BlogSlugItem[]> {
  const data = await client.getList<BlogSlugItem>({
    endpoint: "blogs",
    queries: {
      fields: "title,slug",
      orders: "-publishDate",
      limit,
    },
  });

  return data.contents;
}

export async function getPostsByCategoryPage(
  categoryId: string,
  limit = 10,
  offset = 0,
): Promise<MicroCMSListResponse<BlogListItem>> {
  return client.getList<BlogListItem>({
    endpoint: "blogs",
    queries: {
      fields: "title,slug,eyecatch",
      filters: `categories[contains]${categoryId}`,
      orders: "-publishDate",
      limit,
      offset,
    },
  });
}
