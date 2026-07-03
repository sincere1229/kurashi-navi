import Link from "next/link";
import { notFound } from "next/navigation";
import Minori from "@/components/Minori";
import OfferBox from "@/components/OfferBox";
import A8ScriptBanner from "@/components/A8ScriptBanner";
import SisterSiteCard from "@/components/SisterSiteCard";
import { COLUMNS, columnBySlug } from "@/lib/columns";
import { COLUMN_OFFERS, SCRIPT_ADS } from "@/lib/affiliates";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return COLUMNS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = columnBySlug(params.slug);
  return { title: c ? `${c.title}|${SITE.name}` : SITE.name };
}

export default function ColumnDetail({ params }: { params: { slug: string } }) {
  const column = columnBySlug(params.slug);
  if (!column) notFound();

  const offers = COLUMN_OFFERS[column.offerSlug] ?? [];
  const others = COLUMNS.filter((c) => c.slug !== column.slug).slice(0, 2);
  // 電気コラムには地域限定のスクリプト型広告(東急でんき&ガス)も追加表示
  const scriptAd = column.slug === "denki-kirikae" ? SCRIPT_ADS.tokyu_denki_gas : null;

  return (
    <main className="mx-auto max-w-md px-5 pb-20">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-lg font-black">{SITE.name}🏠</Link>
        <Link href="/column" className="text-xs text-cocoa/60 underline">コラム一覧</Link>
      </header>

      <span className="font-maru inline-block rounded-full bg-piyo/40 px-2.5 py-0.5 text-xs font-bold text-piyodeep">
        {column.category}
      </span>
      <h1 className="font-maru mt-2 text-xl font-bold leading-snug">{column.title}</h1>

      <article className="mt-5 space-y-5">
        {column.body.map((sec, i) => (
          <section key={i}>
            <h2 className="font-maru font-bold">{sec.heading}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-cocoa/90">{sec.text}</p>
          </section>
        ))}
      </article>

      <OfferBox title="🌱 この記事に関連するサービス" offers={offers} />

      {scriptAd && (
        <div className="mt-3">
          <A8ScriptBanner ad={scriptAd} />
        </div>
      )}

      <Link
        href="/"
        className="font-maru mt-6 flex items-center justify-center gap-2 rounded-full bg-cocoa py-3.5 font-bold text-piyo shadow active:scale-95 transition"
      >
        あなた専用のやることリストを作る
      </Link>

      <SisterSiteCard />

      {others.length > 0 && (
        <section className="mt-8">
          <h2 className="font-maru text-sm font-bold text-cocoa/80">他のコラムも読む</h2>
          <div className="mt-2 space-y-2">
            {others.map((c) => (
              <Link key={c.slug} href={`/column/${c.slug}`} className="block rounded-2xl bg-white p-3 text-sm shadow-sm">
                <span className="font-bold">{c.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="mt-8 text-[11px] leading-relaxed text-cocoa/50">
        本記事の情報は一般的な内容です。制度・料金・サービス内容は変更される場合があるため、契約前に必ず公式サイトでご確認ください。
      </p>
    </main>
  );
}
