// app\_components\Nav\index.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./index.module.css";

export default function Nav() {
  const pathname = usePathname();

  return <NavInner key={pathname} />;
}

function NavInner() {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggleNav = () => {
    setNavIsOpen((prev) => !prev);
  };

  const closeNav = () => {
    setNavIsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = navIsOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [navIsOpen]);

  return (
    <nav className={navIsOpen ? styles.open : styles.close}>
      <button type="button" className={styles.btn} onClick={toggleNav}>
        <span className={styles.bar}></span>
        <span className="sr-only">MENU</span>
      </button>

      <ul className={styles.list}>
        <li>
          <Link href="/" onClick={closeNav}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={closeNav}>
            About
          </Link>
        </li>
        <li>
          <Link href="/blog" onClick={closeNav}>
            Blog
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={closeNav}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
