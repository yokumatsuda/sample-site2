// app\_components\CategoryFilter\index.tsx
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug?: string;
};

type CategoryFilterProps = {
  categories: Category[];
  current?: string;
};

export default function CategoryFilter({
  categories,
  current = "",
}: CategoryFilterProps) {
  const baseClassName =
    "inline-grid min-h-10 place-items-center border border-[var(--gray-10)] px-4 text-(length:--small-heading3) leading-none text-[var(--gray-75)] hover:text-[var(--accent)]";

  const currentClassName =
    "border-[var(--black)] font-bold text-[var(--black)]";

  return (
    <nav
      className="mt-[var(--space-xs)] mb-[var(--space-md)] flex flex-wrap gap-3"
      aria-label="ブログカテゴリー"
    >
      <Link
        href="/blog"
        className={`${baseClassName} ${!current ? currentClassName : ""}`}
        aria-current={!current ? "page" : undefined}
      >
        すべて
      </Link>

      {categories.map(({ id, name, slug }) => {
        const categorySlug = slug ?? id;
        const isCurrent = current === categorySlug;

        return (
          <Link
            key={id}
            href={`/blog/category/${categorySlug}`}
            className={`${baseClassName} ${isCurrent ? currentClassName : ""}`}
            aria-current={isCurrent ? "page" : undefined}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
