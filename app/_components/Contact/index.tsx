// app\_components\Contact\index.tsx
import Social from "../Social";

export default function Contact() {
  return (
    <div className="[&>*+*]:mt-[var(--stack-space,1em)]">
      <h3 className="text-(length:--body)">Contact</h3>
      <Social iconSize="30px" />
      <address>
        <a
          href="https://yokuwebservice.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[var(--accent)] underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          yoku@yokuweb.com
        </a>
      </address>
    </div>
  );
}
