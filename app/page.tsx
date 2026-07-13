// C:\Users\49mat\portfolio\sample-site2\app\page.tsx
import { Metadata } from "next";
import { siteMeta } from "./libs/constants";
import Container from "./_components/Container";
import Hero from "./_components/Hero";
import Posts from "./_components/Posts";
import { getPostsPage } from "./libs/microcms";
import { eyecatchLocal } from "./libs/constants";
import Pagination from "./_components/Pagination";
import Image from "next/image";
import instagram from "@/images/instagram__1_-removebg-preview.png";

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
        title="YWD"
        subtitle="このサイトはYOKU Web デザインによる制作サンプルです。"
        sideContent={
          <a
            href="https://www.instagram.com/yoku4.9/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagramを開く"
            className="inline-block transition-opacity hover:opacity-70"
          >
            <Image
              src={instagram}
              alt=""
              className="h-auto w-28 shrink-0 md:w-48"
            />
          </a>
        }
      />
      <Posts posts={posts} />
      <Pagination nextUrl="/blog" nextText="More Posts" />
    </Container>
  );
}
