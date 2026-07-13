// app\about\page.tsx
import FadeImage from "../_components/FadeImage";
import PostBody from "../_components/PostBody";
import Contact from "../_components/Contact";
import Accordion from "../_components/Accordion";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "../_components/TwoColumn";
import eyecatch from "@/images/top_pageimg14.jpg";

export default function AboutPage() {
  return (
    <>
      <FadeImage
        src={eyecatch}
        alt=""
        sizes="(min-width: 1152px) 1152px, 100vw"
        preload
        previewSrc={eyecatch.blurDataURL}
        className="h-auto w-full"
      />

      <TwoColumn>
        <TwoColumnMain>
          <PostBody>
            <p>
              Yoku
              Webデザインでは、Webサイト制作、Webアプリ開発、業務自動化を中心に、事業やサービスの課題に合わせたWeb制作を行っています。
              デザインだけ、実装だけで終わらせず、情報設計から公開後の運用までを見据えて、使いやすく更新しやすい仕組みを提案します。
            </p>

            <h2>Web制作で大切にしていること</h2>

            <p>
              見た目を整えるだけではなく、誰に何を伝え、どのような行動につなげるのかを整理したうえで設計することを大切にしています。
              企業サイト、採用サイト、サービスサイト、ランディングページなど、それぞれの目的に合わせて必要な情報と導線を組み立てます。
            </p>

            <p>
              制作では、スマートフォンでの見やすさ、表示速度、更新のしやすさ、アクセシビリティにも配慮します。
              公開時だけきれいなサイトではなく、その後も情報を追加しながら長く使える構成を目指しています。
            </p>

            <h3>技術とデザインの両面から考える</h3>

            <p>
              Next.js、React、TypeScriptを使ったWebサイトやWebアプリの開発に加え、microCMSなどを利用した更新機能の構築にも対応しています。
              また、Pythonや外部サービスとの連携を活用し、繰り返し作業の自動化や社内業務の効率化につながる仕組みも検討します。
            </p>

            <h2>よくあるご相談</h2>

            <Accordion heading="Webサイト制作はどこから相談できますか？">
              <p>
                サイトの構成が決まっていない段階でもご相談いただけます。
                事業内容、現在の課題、サイトを通して実現したいことを確認し、必要なページや機能を整理するところから進めます。
              </p>
            </Accordion>

            <Accordion heading="既存サイトのリニューアルにも対応していますか？">
              <p>
                対応しています。
                現在のサイトで使いにくい部分、更新しづらい部分、情報が伝わりにくい部分を確認し、残す内容と見直す内容を整理したうえでリニューアル案を作成します。
              </p>
            </Accordion>

            <Accordion heading="Webアプリや業務自動化も相談できますか？">
              <p>
                相談可能です。
                管理画面、予約管理、問い合わせ管理、CSV処理、Excel作業の自動化など、現在の業務内容を確認し、Webアプリ化やPythonによる自動化が適しているかを検討します。
              </p>
            </Accordion>
          </PostBody>
        </TwoColumnMain>

        <TwoColumnSidebar>
          <Contact />
        </TwoColumnSidebar>
      </TwoColumn>
    </>
  );
}
