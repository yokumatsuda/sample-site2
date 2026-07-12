// app\blog\page\[page]\index.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Hero from "../../../_components/Hero";
import Posts from "../../../_components/Posts";
import PageNumbers from "../../../_components/PageNumbers";
import CategoryFilter from "../../../_components/CategoryFilter";
import { getAllCategories, getPostsPage } from "../../../libs/microcms";
import { eyecatchLocal } from "../../../libs/constants";

const POSTS_PER_PAGE = 10;

export const revalidate = 1;

export const dynamicParams = true;

type BlogPageProps = {
  params: Promise<{
    page: string;
  }>;
};

export async function generateStaticParams() {
  const data = await getPostsPage(1, 0);
  const totalPages = Math.ceil(data.totalCount / POSTS_PER_PAGE);

  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { page } = await params;
  const currentPage = Number(page);

  return {
    title: `ブログ ${currentPage}ページ目`,
    description: "ブログの記事一覧",
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
