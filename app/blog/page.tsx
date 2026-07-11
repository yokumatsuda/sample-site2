// app\blog\page.tsx
import type { Metadata } from "next";
import Posts from "../_components/Posts";
import PageNumbers from "../_components/PageNumbers";
import CategoryFilter from "../_components/CategoryFilter";
import { getAllCategories, getPostsPage } from "../libs/microcms";
import { eyecatchLocal } from "../libs/constants";

const POSTS_PER_PAGE = 10;

export const revalidate = 1;

export const metadata: Metadata = {
  title: "ブログ",
  description: "ブログの記事一覧",
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
