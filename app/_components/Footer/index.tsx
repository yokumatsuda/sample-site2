// app\_components\Footer\index.tsx
import Container from "../Container";
import Logo from "../Logo";
import Social from "../Social";

export default function Footer() {
  return (
    <footer className="bg-[var(--gray-10)] py-[var(--space-xl)]">
      <Container>
        <div className="flex flex-col items-center gap-[2em] text-center md:flex-row md:justify-between md:text-left">
          <Logo />
          <Social />
        </div>
      </Container>
    </footer>
  );
}
