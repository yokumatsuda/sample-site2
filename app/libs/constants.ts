// app/libs/constants.ts
import type { MicroCMSImage } from "microcms-js-sdk";

export const siteMeta = {
  siteTitle: "YOKU Web デザイン | 石川県金沢市サイト/ホームページ制作",
  siteDesc:
    "YOKUは、Next.js、TypeScript、microCMSを活用したWeb制作・Webアプリ開発のポートフォリオサイトです。",
  siteUrl: "https://sample-site2-liart.vercel.app",
  siteLang: "ja",
  siteLocale: "ja_JP",
  siteType: "website",
  siteIcon: "/favicon.ico",
  siteImage: {
    // サイズは実ファイルに合わせる
    url: "/ogp-big.jpg",
    width: 696,
    height: 327,
    alt: "YOKU",
  },
} as const;

export const eyecatchLocal: MicroCMSImage = {
  url: "/ogp-big.jpg",
  // サイズは実ファイルに合わせる
  width: 1920,
  height: 1280,
};
