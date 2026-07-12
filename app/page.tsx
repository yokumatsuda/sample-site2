// C:\Users\49mat\portfolio\sample-site2\app\page.tsx
import { Metadata } from "next";
import { siteMeta } from "./libs/constants";
import Container from "./_components/Container";
import Hero from "./_components/Hero";
import Posts from "./_components/Posts";
import { getPostsPage } from "./libs/microcms";
import { eyecatchLocal } from "./libs/constants";

export const revalidate = 1;

export const metadata: Metadata = {
  title: {
    absolute: siteMeta.siteTitle,
  },
  description:
    "YOKUは、Next.js、TypeScript、microCMSを活用し、更新しやすく高速なWebサイトを制作するポートフォリオサイトです。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteMeta.siteTitle,
    description:
      "YOKUは、Next.js、TypeScript、microCMSを活用し、更新しやすく高速なWebサイトを制作するポートフォリオサイトです。",
    url: "/",
    type: "website",
    images: [siteMeta.siteImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.siteTitle,
    description:
      "YOKUは、Next.js、TypeScript、microCMSを活用し、更新しやすく高速なWebサイトを制作するポートフォリオサイトです。",
    images: [siteMeta.siteImage.url],
  },
};

export default async function Home() {
  const data = await getPostsPage(4, 0);

  const posts = data.contents.map((post) => ({
    ...post,
    eyecatch: post.eyecatch ?? eyecatchLocal,
  }));

  return (
    <Container>
      <Hero
        title="YOKU"
        subtitle="Yoku Web デザインのサンプルサイトです"
        imageOn
      />
      <Posts posts={posts} />
    </Container>
  );
}
