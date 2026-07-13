// app\_components\Posts\index.tsx
import Link from "next/link";
import type { MicroCMSImage } from "microcms-js-sdk";
import FadeImage from "../FadeImage";
import { getImagePreviewUrl } from "@/app/libs/get-image-preview-url";

type Post = {
  title: string;
  slug: string;
  eyecatch: MicroCMSImage;
};

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  return (
    <div className="mt-[var(--space-xs)] mb-[var(--space-lg)] grid grid-cols-2 gap-[var(--space-jump)]">
      {posts.map(({ title, slug, eyecatch }, index) => (
        <article key={slug}>
          <Link href={`/blog/${slug}`}>
            <FadeImage
              frameClassName="relative aspect-video"
              src={eyecatch.url}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={index < 2}
              previewSrc={index < 4 ? getImagePreviewUrl(eyecatch.url) : null}
              className="object-cover"
            />
            <h2 className="mt-[0.5em] text-(length:--small-heading3) font-normal">
              {title}
            </h2>
          </Link>
        </article>
      ))}
    </div>
  );
}
