import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = { title: `お問い合わせ|${SITE.name}` };

export default function Contact() {
  return (
    <main className="mx-auto max-w-md px-5 pb-16">
      <header className="py-4">
        <Link href="/" className="font-maru text-lg font-black">{SITE.name}🏠</Link>
      </header>
      <h1 className="font-maru mt-4 text-xl font-bold">お問い合わせ</h1>
      <div className="mt-4 space-y-4 text-sm leading-relaxed">
        <p>当サイトへのご意見・ご要望・掲載内容の修正依頼などは、以下よりお寄せください。</p>
        {SITE.contactFormUrl && (
          <a href={SITE.contactFormUrl} target="_blank" rel="noopener"
            className="font-maru block rounded-full bg-cocoa py-3.5 text-center font-bold text-piyo">
            お問い合わせフォームをひらく
          </a>
        )}
        {SITE.contactEmail && (
          <p>メール:<a href={`mailto:${SITE.contactEmail}`} className="underline">{SITE.contactEmail}</a></p>
        )}
        {SITE.operatorX && (
          <p>X(旧Twitter):<a href={SITE.operatorX} target="_blank" rel="noopener" className="underline">@twinklelab_jp</a> のDMでも受け付けています。</p>
        )}
        <p className="text-xs text-cocoa/60">※個別の手続きに関するご相談への回答、および回答の正確性の保証はいたしかねます。手続きの詳細は各自治体へお問い合わせください。</p>
      </div>
      <Link href="/" className="mt-8 block text-sm text-cocoa/60 underline">← トップにもどる</Link>
    </main>
  );
}
