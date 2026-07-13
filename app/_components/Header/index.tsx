// app\_components\Header\index.tsx
import Container from "../Container";
import Logo from "../Logo";
import Nav from "../Nav";

export default function Header() {
  return (
    <header className="bg-[var(--white)] max-md:sticky max-md:top-0 max-md:z-[300] ">
      <Container large>
        <div className="flex items-center justify-between">
          <Logo boxOn />
          <Nav />
        </div>
      </Container>
    </header>
  );
}
