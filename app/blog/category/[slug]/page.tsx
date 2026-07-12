// app\blog\category\[slug]\page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PostHeader from "../../../_components/PostHeader";
import Posts from "../../../_components/Posts";
import PageNumbers from "../../../_components/PageNumbers";
import CategoryFilter from "../../../_components/CategoryFilter";
import {
  getAllCategories,
  getPostsByCategoryPage,
} from "../../../libs/microcms";
import { eyecatchLocal } from "../../../libs/constants";

const POSTS_PER_PAGE = 10;

export const revalidate = 1;

export const dynamicParams = false;

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getCategoryPageUrl(slug: string, page: number) {
  return page === 1
    ? `/blog/category/${slug}`
    : `/blog/category/${slug}/page/${page}`;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map(({ id, slug }) => ({
    slug: slug ?? id,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((category) => {
    const categorySlug = category.slug ?? category.id;
    return categorySlug === slug;
  });

  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: `${category.name}に関する記事`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const categories = await getAllCategories();

  const category = categories.find((category) => {
    const categorySlug = category.slug ?? category.id;
    return categorySlug === slug;
  });

  if (!category) {
    notFound();
  }

  const data = await getPostsByCategoryPage(category.id, POSTS_PER_PAGE, 0);

  const posts = data.contents.map((post) => ({
    ...post,
    eyecatch: post.eyecatch ?? eyecatchLocal,
  }));

  const totalPages = Math.ceil(data.totalCount / POSTS_PER_PAGE);

  return (
    <>
      <PostHeader title={category.name} subtitle="Blog Category" />
      <CategoryFilter categories={categories} current={slug} />

      <Posts posts={posts} />

      <PageNumbers
        currentPage={1}
        totalPages={totalPages}
        getPageUrl={(page) => getCategoryPageUrl(slug, page)}
      />
    </>
  );
}
