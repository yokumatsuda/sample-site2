// app/_components/Nav/index.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./index.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggleNav = () => {
    setNavIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setNavIsOpen(false);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = navIsOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [navIsOpen]);

  return (
    <nav className={navIsOpen ? styles.open : styles.close}>
      <button
        type="button"
        className={styles.btn}
        onClick={toggleNav}
        aria-expanded={navIsOpen}
        aria-label="メニューを開閉する"
      >
        <span className={styles.bar}></span>
        <span className="sr-only">MENU</span>
      </button>

      <ul className={styles.list}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => {
                if (item.href === pathname) {
                  setNavIsOpen(false);
                }
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
