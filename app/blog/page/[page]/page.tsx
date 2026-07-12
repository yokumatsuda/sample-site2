// app\blog\page\[page]\page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Hero from "../../../_components/Hero";
import Posts from "../../../_components/Posts";
import PageNumbers from "../../../_components/PageNumbers";
import CategoryFilter from "../../../_components/CategoryFilter";
import { getAllCategories, getPostsPage } from "../../../libs/microcms";
import { eyecatchLocal, siteMeta } from "../../../libs/constants";

const POSTS_PER_PAGE = 10;

export const revalidate = 60;

export const dynamicParams = true;

type BlogPageProps = {
  params: Promise<{
    page: string;
  }>;
};

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { page } = await params;
  const currentPage = Number(page);

  if (!Number.isInteger(currentPage) || currentPage < 2) {
    return {};
  }

  const title = `ブログ ${currentPage}ページ目 | ${siteMeta.siteTitle}`;
  const description = `YOKU Web デザインのブログ記事一覧、${currentPage}ページ目です。`;
  const url = `/blog/page/${currentPage}`;

  return {
    title: `ブログ ${currentPage}ページ目`,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [siteMeta.siteImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteMeta.siteImage.url],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { page } = await params;
  const currentPage = Number(page);

  if (!Number.isInteger(currentPage) || currentPage < 2) {
    notFound();
  }

  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const data = await getPostsPage(POSTS_PER_PAGE, offset);
  const totalPages = Math.ceil(data.totalCount / POSTS_PER_PAGE);

  if (currentPage > totalPages) {
    notFound();
  }

  const posts = data.contents.map((post) => ({
    ...post,
    eyecatch: post.eyecatch ?? eyecatchLocal,
  }));

  const categories = await getAllCategories();

  return (
    <>
      <Hero title="Blog" subtitle="Recent Posts" />

      <CategoryFilter categories={categories} />

      <Posts posts={posts} />
      <PageNumbers
        currentPage={currentPage}
        totalPages={totalPages}
        getPageUrl={(page) => (page === 1 ? "/blog" : `/blog/page/${page}`)}
      />
    </>
  );
}
