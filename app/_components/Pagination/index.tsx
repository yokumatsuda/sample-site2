// app\_components\Pagination\index.tsx
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type PaginationProps = {
  prevText?: string;
  prevUrl?: string;
  nextText?: string;
  nextUrl?: string;
};

export default function Pagination({
  prevText = "",
  prevUrl = "",
  nextText = "",
  nextUrl = "",
}: PaginationProps) {
  const iconTextClassName =
    "flex items-center gap-[0.5em] text-(length:--small-heading3) max-sm:text-xs";
  return (
    <nav aria-label="前後の記事">
      <ul className="my-[var(--space-lg)] flex items-center justify-between gap-[1.5em] md:gap-[6em]">
        {prevText && prevUrl && (
          <li>
            <Link href={prevUrl} className={iconTextClassName}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-[var(--gray-25)]"
              />
              <span>{prevText}</span>
            </Link>
          </li>
        )}

        {nextText && nextUrl && (
          <li className="ml-auto">
            <Link href={nextUrl} className={iconTextClassName}>
              <span>{nextText}</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-[var(--gray-25)]"
              />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
