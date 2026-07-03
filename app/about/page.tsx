import Link from "next/link";
import Minori from "@/components/Minori";
import { SITE } from "@/lib/site";

export const metadata = { title: `運営者情報|${SITE.name}` };

export default function About() {
  return (
    <main className="mx-auto max-w-md px-5 pb-16">
      <header className="py-4">
        <Link href="/" className="font-maru text-lg font-black">{SITE.name}🏠</Link>
      </header>
      <h1 className="font-maru mt-4 text-xl font-bold">運営者情報</h1>

      <div className="mt-5 rounded-2xl bg-white p-5 text-sm leading-relaxed shadow-sm">
        <dl className="space-y-3">
          <div><dt className="font-maru font-bold">サイト名</dt><dd>{SITE.name}</dd></div>
          <div><dt className="font-maru font-bold">運営</dt><dd>{SITE.operator}</dd></div>
          <div><dt className="font-maru font-bold">開設</dt><dd>{SITE.establishedYear}年</dd></div>
          <div>
            <dt className="font-maru font-bold">サイトの目的</dt>
            <dd>引っ越しに必要な手続きを、ひとりひとりの状況に合わせて分かりやすく整理し、「手続きのやり忘れ」をなくすことを目指しています。</dd>
          </div>
        </dl>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <div className="shrink-0"><Minori size={64} /></div>
        <div className="relative bubble rounded-2xl bg-white p-3 text-sm shadow-sm">
          <p className="font-maru font-bold">ナビゲーターのみのりです🌱</p>
          <p className="mt-1">新しい暮らしが、すくすく実りますように。あなたの引っ越しをそばでお手伝いします!</p>
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-cocoa/60">
        当サイトの情報は一般的な参考情報です。手続きの詳細は各自治体の公式サイトをご確認ください。
      </p>
      <Link href="/" className="mt-8 block text-sm text-cocoa/60 underline">← トップにもどる</Link>
    </main>
  );
}
