// app\_components\Posts\index.tsx
import Image from "next/image";
import Link from "next/link";
import type { MicroCMSImage } from "microcms-js-sdk";

type Post = {
  title: string;
  slug: string;
  eyecatch: MicroCMSImage;
};

type PostsProps = {
  posts: Post[];
};

type PostImageProps = {
  eyecatch: MicroCMSImage;
  eager?: boolean;
};

function PostImage({ eyecatch, eager = false }: PostImageProps) {
  return (
    <figure className="relative aspect-video overflow-hidden">
      <Image
        className="object-cover"
        src={eyecatch.url}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        loading={eager ? "eager" : "lazy"}
      />
    </figure>
  );
}

export default function Posts({ posts }: PostsProps) {
  return (
    <div className="mt-[var(--space-xs)] mb-[var(--space-lg)] grid grid-cols-2 gap-[var(--space-jump)]">
      {posts.map(({ title, slug, eyecatch }, index) => (
        <article key={slug}>
          <Link href={`/blog/${slug}`}>
            <PostImage eyecatch={eyecatch} eager={index < 4} />
            <h2 className="mt-[0.5em] text-(length:--small-heading3) font-normal">
              {title}
            </h2>
          </Link>
        </article>
      ))}
    </div>
  );
}
