// app\_components\PostHeader\index.tsx
import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import ConvertDate from "../ConvertDate";
import styles from "./index.module.css";

type PostHeaderProps = {
  title: string;
  subtitle: ReactNode;
  publish?: string | null;
};

export default function PostHeader({
  title,
  subtitle,
  publish = "",
}: PostHeaderProps) {
  return (
    <div className={styles.stack}>
      <p className={styles.subtitle}>{subtitle}</p>
      <h1 className={styles.title}>{title}</h1>

      {publish && (
        <div className={styles.publish}>
          <FontAwesomeIcon icon={faClock} className={styles.icon} />
          <ConvertDate dateISO={publish} />
        </div>
      )}
    </div>
  );
}
