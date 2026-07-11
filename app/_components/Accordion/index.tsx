// app/_components/Accordion/index.tsx
"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";

type AccordionProps = {
  heading: string;
  children: ReactNode;
};

export default function Accordion({ heading, children }: AccordionProps) {
  const [textIsOpen, setTextIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className={textIsOpen ? styles.open : styles.close}>
      <h3 className={styles.heading}>
        <button
          type="button"
          onClick={() => setTextIsOpen((prev) => !prev)}
          aria-expanded={textIsOpen}
          aria-controls={contentId}
        >
          {heading}
          <FontAwesomeIcon icon={faCircleChevronDown} className={styles.icon} />
        </button>
      </h3>

      <div id={contentId} className={styles.text}>
        <div className={styles.textClip}>
          <div className={styles.textInner}>{children}</div>
        </div>
      </div>
    </div>
  );
}
