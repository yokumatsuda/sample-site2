// app\blog\category\[slug]\page\[page]\page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PostHeader from "@/app/_components/PostHeader";
import Posts from "@/app/_components/Posts";
import PageNumbers from "@/app/_components/PageNumbers";
import CategoryFilter from "@/app/_components/CategoryFilter";
import { getAllCategories, getPostsByCategoryPage } from "@/app/libs/microcms";
import { eyecatchLocal, siteMeta } from "@/app/libs/constants";

const POSTS_PER_PAGE = 10;

export const revalidate = 60;

export const dynamicParams = true;

type CategoryPageProps = {
  params: Promise<{
    slug: string;
    page: string;
  }>;
};

function getCategoryPageUrl(slug: string, page: number) {
  return page === 1
    ? `/blog/category/${slug}`
    : `/blog/category/${slug}/page/${page}`;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug, page } = await params;
  const currentPage = Number(page);

  if (!Number.isInteger(currentPage) || currentPage < 2) {
    return {};
  }

  const categories = await getAllCategories();
  const category = categories.find(
    (category) => (category.slug ?? category.id) === slug,
  );

  if (!category) {
    return {};
  }

  const categorySlug = category.slug ?? category.id;
  const title = `${category.name}の記事一覧 ${currentPage}ページ目 | ${siteMeta.siteTitle}`;
  const description = `${category.name}に関する記事一覧の${currentPage}ページ目です。`;
  const url = `/blog/category/${categorySlug}/page/${currentPage}`;

  return {
    title: `${category.name}の記事一覧 ${currentPage}ページ目`,
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

export default async function CategoryPagedPage({ params }: CategoryPageProps) {
  const { slug, page } = await params;
  const currentPage = Number(page);

  if (!Number.isInteger(currentPage) || currentPage < 2) {
    notFound();
  }

  const categories = await getAllCategories();

  const category = categories.find((category) => {
    const categorySlug = category.slug ?? category.id;
    return categorySlug === slug;
  });

  if (!category) {
    notFound();
  }

  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const data = await getPostsByCategoryPage(
    category.id,
    POSTS_PER_PAGE,
    offset,
  );

  const totalPages = Math.ceil(data.totalCount / POSTS_PER_PAGE);

  if (currentPage > totalPages) {
    notFound();
  }

  const posts = data.contents.map((post) => ({
    ...post,
    eyecatch: post.eyecatch ?? eyecatchLocal,
  }));

  return (
    <>
      <PostHeader title={category.name} subtitle="Blog Category" />
      <CategoryFilter categories={categories} current={slug} />
      <Posts posts={posts} />

      <PageNumbers
        currentPage={currentPage}
        totalPages={totalPages}
        getPageUrl={(page) => getCategoryPageUrl(slug, page)}
      />
    </>
  );
}
