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
  publishDate: string;
  eyecatch?: MicroCMSImage;
  categories?: Category[];
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
      fields: "title,slug,publishDate,eyecatch,categories",
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
      fields: "id,name,slug,updatedAt,revisedAt",
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

const MICROCMS_MAX_LIMIT = 100;

export const getAllSlugs = cache(async (): Promise<BlogSlugItem[]> => {
  const firstData = await client.getList<BlogSlugItem>({
    endpoint: "blogs",
    queries: {
      fields: "title,slug,updatedAt,revisedAt",
      orders: "-publishDate",
      limit: MICROCMS_MAX_LIMIT,
      offset: 0,
    },
  });

  if (firstData.totalCount <= MICROCMS_MAX_LIMIT) {
    return firstData.contents;
  }

  const restOffsets = Array.from(
    {
      length: Math.ceil(firstData.totalCount / MICROCMS_MAX_LIMIT) - 1,
    },
    (_, index) => (index + 1) * MICROCMS_MAX_LIMIT,
  );

  const restData = await Promise.all(
    restOffsets.map((offset) =>
      client.getList<BlogSlugItem>({
        endpoint: "blogs",
        queries: {
          fields: "title,slug,updatedAt,revisedAt",
          orders: "-publishDate",
          limit: MICROCMS_MAX_LIMIT,
          offset,
        },
      }),
    ),
  );

  return [...firstData.contents, ...restData.flatMap((data) => data.contents)];
});

export async function getPostsByCategoryPage(
  categoryId: string,
  limit = 10,
  offset = 0,
): Promise<MicroCMSListResponse<BlogListItem>> {
  return client.getList<BlogListItem>({
    endpoint: "blogs",
    queries: {
      fields: "title,slug,publishDate,eyecatch,categories",
      filters: `categories[contains]${categoryId}`,
      orders: "-publishDate",
      limit,
      offset,
    },
  });
}
