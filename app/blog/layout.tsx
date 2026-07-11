// app/blog/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "../_components/Container";
import Hero from "../_components/Hero";

export const metadata: Metadata = {
  title: "ブログ",
};

type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <Container>
      <Hero title="Blog" subtitle="Recent Posts" />
      {children}
    </Container>
  );
}
