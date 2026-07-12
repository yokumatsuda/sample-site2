// app\contact\page.tsx
import ContactForm from "../_components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <p className="mb-10 text-center leading-relaxed max-sm:text-left">
        Webサイト制作や運用改善についてのご相談は、下記フォームよりお問い合わせください。
        <br />
        内容を確認後、通常3営業日以内にご連絡いたします。
      </p>
      <ContactForm />
    </>
  );
}
