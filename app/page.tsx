// C:\Users\49mat\portfolio\sample-site2\app\page.tsx
import Container from "./_components/Container";
import Hero from "./_components/Hero";
import Posts from "./_components/Posts";
import { getPostsPage } from "./libs/microcms";
import { eyecatchLocal } from "./libs/constants";

export const revalidate = 1;

export default async function Home() {
  const data = await getPostsPage(4, 0);

  const posts = data.contents.map((post) => ({
    ...post,
    eyecatch: post.eyecatch ?? eyecatchLocal,
  }));

  return (
    <Container>
      <Hero title="YOKU" subtitle="アウトプットしていくサイト" imageOn />
      <Posts posts={posts} />
    </Container>
  );
}
