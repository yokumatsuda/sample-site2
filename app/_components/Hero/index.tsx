// app/_components/Hero/index.tsx
import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import FadeImage from "../FadeImage";
import HeroImage from "@/images/YWD-LOGO.png";

type HeroProps = {
  title: string;
  subtitle: string;
  imageOn?: boolean;
  imageSrc?: StaticImageData | string;
  sideContent?: ReactNode;
  titleSize?: "default" | "compact";
};

export default function Hero({
  title,
  subtitle,
  imageOn = false,
  imageSrc,
  sideContent,
  titleSize = "default",
}: HeroProps) {
  const heroImage = imageSrc ?? HeroImage;
  const previewSrc =
    typeof heroImage === "string" ? null : heroImage.blurDataURL;

  const titleClassName =
    titleSize === "compact"
      ? "text-[clamp(4rem,1.6rem+10.5vw,9.2rem)]"
      : "text-(length:--display)";

  return (
    <div className="flex flex-col items-center text-center gap-0 md:flex-row md:justify-between md:gap-6 md:text-left">
      <div className="flex flex-col items-center gap-3 py-[calc(var(--display)*0.5)] md:items-start">
        <h1
          className={`${titleClassName} font-black leading-[1.08] tracking-[0.15em]`}
        >
          {title}
        </h1>
        <p className="text-(length:--small-heading2)">{subtitle}</p>
        <a
          href="https://yokuwebservice.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[var(--accent)] underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          YOKU Web デザインについてはこちら
        </a>
      </div>
      {sideContent}

      {imageOn && (
        <FadeImage
          src={heroImage}
          alt=""
          sizes="(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw"
          loading="eager"
          previewSrc={previewSrc}
          className="block h-auto w-full"
        />
      )}
    </div>
  );
}
