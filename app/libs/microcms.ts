// app\libs\microcms.ts
import "server-only";
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

export type BlogListItem = {
  title: string;
  slug: string;
  eyecatch?: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
  name: string;
  slug?: string;
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
