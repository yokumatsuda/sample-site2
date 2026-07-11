// app\_components\Contact\index.tsx
import Social from "../Social";

export default function Contact() {
  return (
    <div className="[&>*+*]:mt-[var(--stack-space,1em)]">
      <h3 className="text-(length:--body)">Contact</h3>
      <Social iconSize="30px" />
      <address>yoku@yokuweb.com</address>
    </div>
  );
}
