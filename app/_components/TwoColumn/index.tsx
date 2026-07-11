// app\_components\TwoColumn\index.tsx
import type { ReactNode } from "react";
import styles from "./index.module.css";

type TwoColumnProps = {
  children: ReactNode;
};

export function TwoColumn({ children }: TwoColumnProps) {
  return <div className={styles.flexContainer}>{children}</div>;
}

export function TwoColumnMain({ children }: TwoColumnProps) {
  return <div className={styles.main}>{children}</div>;
}

export function TwoColumnSidebar({ children }: TwoColumnProps) {
  return <div className={styles.sidebar}>{children}</div>;
}
