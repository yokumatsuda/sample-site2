// app\_components\Hero\index.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import HeroImage from "@/images/YWD-LOGO.png";

type HeroProps = {
  title: string;
  subtitle: string;
  imageOn?: boolean;
};

export default function Hero({ title, subtitle, imageOn = false }: HeroProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
      <div className="py-[calc(var(--display)*0.5)]">
        <h1 className="text-(length:--display) font-black leading-none tracking-[0.15em]">
          {title}
        </h1>
        {/* <h1 className="text-[var(--display)] font-black leading-none tracking-[0.15em]">
          {title}
        </h1> */}
        <p className="text-(length:--small-heading2)">{subtitle}</p>
      </div>

      {imageOn && (
        <figure
          className="fadeImageFrame md:w-1/2"
          style={
            HeroImage.blurDataURL
              ? { backgroundImage: `url(${HeroImage.blurDataURL})` }
              : undefined
          }
        >
          <Image
            className={`fadeImage ${loaded ? "fadeImageLoaded" : ""}`}
            src={HeroImage}
            alt=""
            sizes="(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw"
            loading="eager"
            onLoad={() => setLoaded(true)}
          />
        </figure>
      )}
    </div>
  );
}
