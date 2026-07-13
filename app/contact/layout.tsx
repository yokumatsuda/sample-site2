// app\contact\layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "../_components/Container";
import Hero from "../_components/Hero";
import { siteMeta } from "../libs/constants";
import contactImage from "@/images/HeroSection_img5.jpg";

const title = `お問い合わせ | ${siteMeta.siteTitle}`;
const description =
  "Webサイト制作、Next.js、microCMSを活用したサイト構築に関するお問い合わせはこちらから。";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title,
    description,
    url: "/contact",
    type: "website",
    images: [siteMeta.siteImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteMeta.siteImage.url],
  },
};

type ContactLayoutProps = {
  children: ReactNode;
};

export default function ContactLayout({ children }: ContactLayoutProps) {
  return (
    <Container>
      <Hero
        title="Contact"
        subtitle="お問い合わせ"
        titleSize="compact"
        imageOn
        imageSrc={contactImage}
      />
      <div className="mx-auto max-w-3xl">{children}</div>
    </Container>
  );
}
