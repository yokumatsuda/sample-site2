import Link from "next/link";
import Container from "../Container";
import Logo from "../Logo";
import Social from "../Social";

export default function Footer() {
  return (
    <footer className="bg-[var(--gray-10)]">
      <Container>
        <div className="flex flex-col gap-[2em] py-[2.5em]">
          <div className="flex flex-col items-center gap-[2em] text-center md:grid md:grid-cols-3 md:items-center md:text-left">
            <div className="md:justify-self-start">
              <Logo />
            </div>

            <nav aria-label="フッターナビ" className="md:justify-self-center">
              <ul className="flex flex-wrap justify-center gap-x-[1.5em] gap-y-[0.75em] text-sm font-bold md:text-base">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>

            <div className="md:justify-self-end">
              <Social />
            </div>
          </div>

          <div className="border-t border-[var(--gray-25)] pt-[1em] text-center text-sm">
            <p>© YWD. ALL Rights Reserved 2026</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
