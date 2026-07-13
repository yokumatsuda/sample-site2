// app/_components/Posts/index.tsx
import Link from "next/link";
import type { MicroCMSImage } from "microcms-js-sdk";
import FadeImage from "../FadeImage";
import ConvertDate from "../ConvertDate";
import { getImagePreviewUrl } from "@/app/libs/get-image-preview-url";
import type { Category } from "@/app/libs/microcms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

type Post = {
  title: string;
  slug: string;
  publishDate: string;
  eyecatch: MicroCMSImage;
  categories?: Category[];
};

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  return (
    <div className="mt-[var(--space-xs)] mb-[var(--space-lg)] grid grid-cols-2 gap-[var(--space-jump)]">
      {posts.map(
        ({ title, slug, eyecatch, publishDate, categories = [] }, index) => (
          <article key={slug}>
            <Link href={`/blog/${slug}`}>
              <FadeImage
                frameClassName="relative aspect-video"
                src={eyecatch.url}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                preload={index < 2}
                previewSrc={index < 4 ? getImagePreviewUrl(eyecatch.url) : null}
                className="object-cover"
              />

              <div className="mt-[0.75em] flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8rem] text-[var(--gray-50)]">
                <div className="inline-flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-[var(--gray-25)]"
                  />
                  <ConvertDate dateISO={publishDate} />
                </div>

                {categories.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {categories.map(({ id, name }) => (
                      <li
                        key={id}
                        className="border border-[var(--gray-10)] px-2 py-1 text-[0.75rem] leading-none text-[var(--gray-75)]"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <h2 className="mt-[0.4em] text-(length:--small-heading3) font-normal">
                {title}
              </h2>
            </Link>
          </article>
        ),
      )}
    </div>
  );
}
