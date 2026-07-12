// app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Container from "./_components/Container";
import Hero from "./_components/Hero";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "お探しのページは見つかりませんでした。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <Container>
      <Hero title="404" subtitle="ページが見つかりません" />

      <div className="mt-10 text-center">
        <p className="mb-6 text-[var(--gray-75)]">
          お探しのページは削除されたか、URLが変更された可能性があります。
        </p>

        <Link
          href="/"
          className="inline-grid min-h-10 place-items-center border border-[var(--black)] px-6 text-sm font-bold text-[var(--black)] hover:text-[var(--accent)]"
        >
          トップページへ戻る
        </Link>
      </div>
    </Container>
  );
}
