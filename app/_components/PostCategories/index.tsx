// app\_components\PostCategories\index.tsx
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";

type Category = {
  id: string;
  name: string;
  slug?: string | null;
};

type PostCategoriesProps = {
  categories: Category[];
};

export default function PostCategories({ categories }: PostCategoriesProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="flex items-baseline gap-5 text-[var(--gray-50)] md:flex-col">
      <h3 className="text-(length:--small-heading2)">
        <FontAwesomeIcon icon={faFolderOpen} />
        <span className="sr-only">Categories</span>
      </h3>

      <ul className="flex items-baseline gap-3 text-(length:--small-heading3) md:flex-col">
        {categories.map(({ id, name, slug }) => {
          const categorySlug = slug ?? id;

          return (
            <li key={id}>
              <Link
                href={`/blog/category/${categorySlug}`}
                className="hover:text-[var(--accent)]"
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
