// app\_components\PostBody\index.tsx
import type { ReactNode } from "react";
import styles from "./index.module.css";

type PostBodyProps = {
  children: ReactNode;
};

export default function PostBody({ children }: PostBodyProps) {
  return <div className={styles.stack}>{children}</div>;
}
