// app\blog\[slug]\page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import Image from "next/image";

import PostHeader from "../../_components/PostHeader";
import PostBody from "../../_components/PostBody";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "../../_components/TwoColumn";

import ConvertBody from "../../_components/ConvertBody";
import PostCategories from "../../_components/PostCategories";
import Pagination from "../../_components/Pagination";

import { getAllSlugs, getPostBySlug } from "../../libs/microcms";
import { eyecatchLocal, siteMeta } from "../../libs/constants";
import { extractText } from "../../libs/extract-text";
import { prevNextPost } from "../../libs/prev-next-post";

export const dynamicParams = true;
export const revalidate = 60;

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const description = extractText(post.content);
  const eyecatch = post.eyecatch ?? eyecatchLocal;

  const title = `${post.title} | ${siteMeta.siteTitle}`;
  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.revisedAt ?? post.updatedAt,
      images: [
        {
          url: eyecatch.url,
          width: eyecatch.width,
          height: eyecatch.height,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [eyecatch.url],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const cleanContent = sanitizeHtml(post.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "figure",
      "figcaption",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height"],
      a: ["href", "name", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
  });

  const eyecatch = post.eyecatch ?? eyecatchLocal;

  const allSlugs = await getAllSlugs();
  const [prevPost, nextPost] = prevNextPost(allSlugs, slug);

  return (
    <article>
      <PostHeader
        title={post.title}
        subtitle="Blog Article"
        publish={post.publishDate}
      />
      <figure className="overflow-hidden">
        <Image
          src={eyecatch.url}
          alt=""
          width={eyecatch.width}
          height={eyecatch.height}
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
          className="h-auto w-full"
        />
      </figure>

      <TwoColumn>
        <TwoColumnMain>
          <PostBody>
            <ConvertBody contentHTML={cleanContent} />
          </PostBody>
        </TwoColumnMain>

        <TwoColumnSidebar>
          <PostCategories categories={post.categories ?? []} />
        </TwoColumnSidebar>
      </TwoColumn>

      <Pagination
        prevText={prevPost?.title}
        prevUrl={prevPost ? `/blog/${prevPost.slug}` : undefined}
        nextText={nextPost?.title}
        nextUrl={nextPost ? `/blog/${nextPost.slug}` : undefined}
      />
    </article>
  );
}
