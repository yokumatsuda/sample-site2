// C:\Users\49mat\portfolio\sample-site2\app\layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { siteMeta } from "./libs/constants";
// Font Awesomeの設定
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const {
  siteTitle,
  siteDesc,
  siteUrl,
  siteLocale,
  siteType,
  siteIcon,
  siteImage,
} = siteMeta;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: "rW9tRWfPprDcUQ6MM5i5CZ9wyXlWthyziR1bqJp98w8",
  },
  title: {
    template: `%s | ${siteTitle}`,
    default: siteTitle,
  },
  description: siteDesc,
  icons: {
    icon: siteIcon,
    apple: siteIcon,
  },
  openGraph: {
    siteName: siteTitle,
    title: siteTitle,
    description: siteDesc,
    url: "/",
    locale: siteLocale,
    type: siteType,
    images: [siteImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDesc,
    images: [siteImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
