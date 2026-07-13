// app\blog\page.tsx
import type { Metadata } from "next";
import Posts from "../_components/Posts";
import PageNumbers from "../_components/PageNumbers";
import CategoryFilter from "../_components/CategoryFilter";
import { getAllCategories, getPostsPage } from "../libs/microcms";
import { eyecatchLocal, siteMeta } from "../libs/constants";
import Hero from "../_components/Hero";

const POSTS_PER_PAGE = 10;

export const revalidate = 60;

export const metadata: Metadata = {
  title: "ブログ",
  description:
    "YOKU Web デザインのブログ記事一覧です。Next.js、TypeScript、microCMS、Web制作に関する記事を掲載しています。",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `ブログ | ${siteMeta.siteTitle}`,
    description:
      "YOKU Web デザインのブログ記事一覧です。Next.js、TypeScript、microCMS、Web制作に関する記事を掲載しています。",
    url: "/blog",
    type: "website",
    images: [siteMeta.siteImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `ブログ | ${siteMeta.siteTitle}`,
    description:
      "YOKU Web デザインのブログ記事一覧です。Next.js、TypeScript、microCMS、Web制作に関する記事を掲載しています。",
    images: [siteMeta.siteImage.url],
  },
};

export default async function BlogPage() {
  const data = await getPostsPage(POSTS_PER_PAGE, 0);
  const categories = await getAllCategories();

  const posts = data.contents.map((post) => ({
    ...post,
    eyecatch: post.eyecatch ?? eyecatchLocal,
  }));

  const totalPages = Math.ceil(data.totalCount / POSTS_PER_PAGE);

  return (
    <>
      <Hero
        title="Blog"
        subtitle="このサイトはYOKU Web デザインによる制作サンプルです。"
      />
      <CategoryFilter categories={categories} />

      <Posts posts={posts} />
      <PageNumbers
        currentPage={1}
        totalPages={totalPages}
        getPageUrl={(page) => (page === 1 ? "/blog" : `/blog/page/${page}`)}
      />
    </>
  );
}
