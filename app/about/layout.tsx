import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "../_components/Container";
import Hero from "../_components/Hero";

export const metadata: Metadata = {
  title: "アバウト",
  description: "About development activities",
};

type AboutLayoutProps = {
  children: ReactNode;
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <Container>
      <Hero title="About" subtitle="About development activities" />
      {children}
    </Container>
  );
}
