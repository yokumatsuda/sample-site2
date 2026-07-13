// app\_components\PageFrame\index.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import Container from "../Container";

const frameColors = ["#4c86c1", "#e98aae", "#f2c94c"];

function getNextColor(currentColor: string) {
  const candidates = frameColors.filter((color) => color !== currentColor);
  const index = Math.floor(Math.random() * candidates.length);

  return candidates[index];
}

type PageFrameProps = {
  children: ReactNode;
};

export default function PageFrame({ children }: PageFrameProps) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [frameColor, setFrameColor] = useState(frameColors[0]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setFrameColor((currentColor) => getNextColor(currentColor));
  }, [pathname]);

  return (
    <div className={styles.frame} style={{ backgroundColor: frameColor }}>
      <Container>{children}</Container>
      <Link href="/contact" className={styles.sideBtn}>
        お問い合わせ
      </Link>
    </div>
  );
}
