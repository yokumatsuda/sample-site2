// app/libs/constants.ts
import type { MicroCMSImage } from "microcms-js-sdk";

export const siteMeta = {
  siteTitle: "YOKU",
  siteDesc: "アウトプットしていくサイト",
  siteUrl: "https://sample-site2-liart.vercel.app",
  siteLang: "ja",
  siteLocale: "ja_JP",
  siteType: "website",
  siteIcon: "/favicon.ico",
} as const;

export const eyecatchLocal: MicroCMSImage = {
  url: "/ogp-big.jpg",
  width: 1920,
  height: 1280,
};
