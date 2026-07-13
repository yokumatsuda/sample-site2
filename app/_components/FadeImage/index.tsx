// app/_components/FadeImage/index.tsx
"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type FadeImageProps = ImageProps & {
  frameClassName?: string;
  previewSrc?: string | null;
};

export default function FadeImage({
  frameClassName = "",
  previewSrc,
  className = "",
  onLoad,
  alt,
  ...imageProps
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure
      className={`overflow-hidden bg-[var(--gray-10)] bg-cover bg-center ${frameClassName}`}
      style={previewSrc ? { backgroundImage: `url(${previewSrc})` } : undefined}
    >
      <Image
        {...imageProps}
        alt={alt}
        className={`transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </figure>
  );
}
