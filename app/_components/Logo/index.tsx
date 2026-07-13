// app\_components\Logo\index.tsx
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  boxOn?: boolean;
};

export default function Logo({ boxOn = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={boxOn ? "inline-block  px-[2em] py-[1em]" : "inline-block"}
    >
      <Image
        src="/YWD-LOGO-removebg.png"
        alt="YWD"
        className="h-7 w-auto"
        width={348}
        height={133}
      />
    </Link>
  );
}
