// app/_components/Hero/index.tsx
import FadeImage from "../FadeImage";
import HeroImage from "@/images/YWD-LOGO.png";

type HeroProps = {
  title: string;
  subtitle: string;
  imageOn?: boolean;
};

export default function Hero({ title, subtitle, imageOn = false }: HeroProps) {
  return (
    <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
      <div className="py-[calc(var(--display)*0.5)]">
        <h1 className="text-(length:--display) font-black leading-none tracking-[0.15em]">
          {title}
        </h1>
        <p className="text-(length:--small-heading2)">{subtitle}</p>
      </div>

      {imageOn && (
        <FadeImage
          src={HeroImage}
          alt=""
          sizes="(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw"
          loading="eager"
          previewSrc={HeroImage.blurDataURL}
          className="block h-auto w-full"
        />
      )}
    </div>
  );
}
