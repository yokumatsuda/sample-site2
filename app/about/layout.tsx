// app\about\layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "../_components/Container";
import Hero from "../_components/Hero";
import { siteMeta } from "../libs/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "YOKUの活動内容、制作への考え方、Web制作・開発に関する取り組みを紹介します。",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About | ${siteMeta.siteTitle}`,
    description:
      "YOKUの活動内容、制作への考え方、Web制作・開発に関する取り組みを紹介します。",
    url: "/about",
    type: "website",
    images: [siteMeta.siteImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${siteMeta.siteTitle}`,
    description:
      "YOKUの活動内容、制作への考え方、Web制作・開発に関する取り組みを紹介します。",
    images: [siteMeta.siteImage.url],
  },
};
type AboutLayoutProps = {
  children: ReactNode;
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <Container>
      <Hero
        title="About"
        subtitle="このサイトはYOKU Web デザインによる制作サンプルです。"
      />
      {children}
    </Container>
  );
}
