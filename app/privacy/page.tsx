import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = { title: `プライバシーポリシー|${SITE.name}` };

export default function Privacy() {
  return (
    <main className="mx-auto max-w-md px-5 pb-16">
      <header className="py-4">
        <Link href="/" className="font-maru text-lg font-black">{SITE.name}🏠</Link>
      </header>
      <h1 className="font-maru mt-4 text-xl font-bold">プライバシーポリシー</h1>
      <div className="mt-4 space-y-5 text-sm leading-relaxed text-cocoa/90">
        <section>
          <h2 className="font-maru font-bold">1. 個人情報の取得について</h2>
          <p className="mt-1">当サイトの診断機能で入力された内容(世帯構成・引っ越し先の種別など)は、お使いの端末内(ブラウザのlocalStorage)にのみ保存され、当サイトのサーバーには送信されません。氏名・住所などの個人を特定する情報の入力は求めません。</p>
        </section>
        <section>
          <h2 className="font-maru font-bold">2. アクセス解析ツールについて</h2>
          <p className="mt-1">当サイトでは、サービス向上のためアクセス解析ツール(Google Analytics等)を利用する場合があります。これらはCookieを使用して匿名のトラフィックデータを収集しますが、個人を特定するものではありません。Cookieはブラウザの設定で無効にできます。</p>
        </section>
        <section>
          <h2 className="font-maru font-bold">3. 広告配信について</h2>
          <p className="mt-1">当サイトでは、第三者配信の広告サービス(Google AdSense等)およびアフィリエイトプログラム(A8.net、Amazonアソシエイト等)を利用する場合があります。広告配信事業者は、ユーザーの興味に応じた広告を表示するためCookieを使用することがあります。パーソナライズ広告のCookieは<a href="https://adssettings.google.com/" target="_blank" rel="noopener" className="underline">広告設定</a>で無効にできます。</p>
        </section>
        <section>
          <h2 className="font-maru font-bold">4. 掲載情報の正確性について</h2>
          <p className="mt-1">当サイトは引っ越しに関する手続き情報を一般的な参考情報として提供するものです。手続きの内容・必要書類・期限は自治体や個別の状況により異なります。最新かつ正確な情報は、必ず各自治体・関係機関の公式サイトでご確認ください。当サイトの情報を利用したことで生じた損害について、運営者は責任を負いかねます。</p>
        </section>
        <section>
          <h2 className="font-maru font-bold">5. 著作権について</h2>
          <p className="mt-1">当サイトに掲載されている文章・イラスト・キャラクター等の著作権は運営者に帰属します。無断転載はご遠慮ください。</p>
        </section>
        <section>
          <h2 className="font-maru font-bold">6. 本ポリシーの変更</h2>
          <p className="mt-1">本ポリシーの内容は、法令の変更やサービス内容の変更に応じて、予告なく改定されることがあります。</p>
        </section>
        <p className="text-xs text-cocoa/50">制定日:{SITE.establishedYear}年</p>
      </div>
      <Link href="/" className="mt-8 block text-sm text-cocoa/60 underline">← トップにもどる</Link>
    </main>
  );
}
