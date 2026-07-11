// app\_components\FadeImage\index.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import eyecatch from "@/images/ogp-big.jpg";

export default function FadeImage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure
      className="fadeImageFrame"
      style={
        eyecatch.blurDataURL
          ? { backgroundImage: `url(${eyecatch.blurDataURL})` }
          : undefined
      }
    >
      <Image
        className={`fadeImage ${loaded ? "fadeImageLoaded" : ""}`}
        src={eyecatch}
        alt=""
        sizes="(min-width: 1152px) 1152px, 100vw"
        loading="eager"
        onLoad={() => setLoaded(true)}
      />
    </figure>
  );
}
