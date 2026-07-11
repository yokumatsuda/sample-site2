// app\_components\PageNumbers\index.tsx
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type PageItem = number | "...";

type PageNumbersProps = {
  currentPage: number;
  totalPages: number;
  getPageUrl: (page: number) => string;
};

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export default function PageNumbers({
  currentPage,
  totalPages,
  getPageUrl,
}: PageNumbersProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPageItems(currentPage, totalPages);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const itemClassName =
    "inline-grid h-10 min-w-10 place-items-center px-[0.7rem] leading-none max-[480px]:h-7 max-[480px]:min-w-7 max-[480px]:px-1 max-[480px]:text-xs";

  const moveLinkClassName =
    "inline-flex h-10 min-w-10 items-center justify-center gap-[0.4rem] px-[0.7rem] leading-none text-[var(--black)] hover:text-[var(--accent)] max-[480px]:h-7 max-[480px]:min-w-7 max-[480px]:px-1 max-[480px]:text-xs max-[480px]:[&_span]:hidden";

  return (
    <nav
      className="mx-auto mt-[var(--space-md)] mb-[var(--space-lg)] w-fit max-w-full max-[480px]:w-full"
      aria-label="ページネーション"
    >
      <ul className="flex w-fit flex-nowrap items-center justify-center gap-3 rounded-lg border border-[var(--gray-10)] px-5 py-3 shadow-[0_2px_8px_rgb(0_0_0_/_0.02)] max-[480px]:w-full max-[480px]:justify-between max-[480px]:gap-1 max-[480px]:p-2">
        <li className="flex-none">
          {hasPrevPage ? (
            <Link
              className={moveLinkClassName}
              href={getPageUrl(currentPage - 1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <span>前へ</span>
            </Link>
          ) : (
            <span
              className={`${moveLinkClassName} pointer-events-none text-[var(--gray-25)] hover:text-[var(--gray-25)]`}
              aria-disabled="true"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <span>前へ</span>
            </span>
          )}
        </li>

        {pageItems.map((item, index) => (
          <li className="flex-none" key={`${item}-${index}`}>
            {item === "..." ? (
              <span
                className={`${itemClassName} text-[var(--gray-50)]`}
                aria-hidden="true"
              >
                ...
              </span>
            ) : item === currentPage ? (
              <span
                className={`${itemClassName} border border-[var(--black)] font-bold text-[var(--black)]`}
                aria-current="page"
              >
                {item}
              </span>
            ) : (
              <Link
                className={`${itemClassName} text-[var(--gray-75)] hover:text-[var(--accent)]`}
                href={getPageUrl(item)}
              >
                {item}
              </Link>
            )}
          </li>
        ))}

        <li className="flex-none">
          {hasNextPage ? (
            <Link
              className={moveLinkClassName}
              href={getPageUrl(currentPage + 1)}
            >
              <span>次へ</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          ) : (
            <span
              className={`${moveLinkClassName} pointer-events-none text-[var(--gray-25)] hover:text-[var(--gray-25)]`}
              aria-disabled="true"
            >
              <span>次へ</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
