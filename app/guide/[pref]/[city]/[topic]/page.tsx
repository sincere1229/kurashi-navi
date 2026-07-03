import Link from "next/link";
import { notFound } from "next/navigation";
import Minori from "@/components/Minori";
import OfferBox from "@/components/OfferBox";
import { TOPICS, topicBySlug } from "@/lib/topics";
import { PRIORITY_CITIES } from "@/lib/priorityCities";
import { taskById } from "@/lib/logic";
import { DEADLINE_LABEL } from "@/lib/taskMaster";
import { COLUMN_OFFERS } from "@/lib/affiliates";
import { fullAddress } from "@/lib/districtMap";
import { SITE } from "@/lib/site";
import DATA from "@/lib/municipalities.json";

type City = { p: string; c: string; k: string; u: string };
const CITIES: City[] = (DATA as any).cities;

// ビルド時は優先都市(政令市・県庁所在地・23区、約85市区)×全トピックだけ事前生成。
// 残りの約1,830自治体は初回アクセス時に生成してキャッシュする(ISR)。
// これにより、最終的には1,916自治体×12トピック=約23,000ページ全てが検索対象になる。
export function generateStaticParams() {
  const priority = CITIES.filter((c) => PRIORITY_CITIES.includes(c.c));
  const params: { pref: string; city: string; topic: string }[] = [];
  for (const city of priority) {
    for (const topic of TOPICS) {
      params.push({ pref: city.p, city: city.c, topic: topic.slug });
    }
  }
  return params;
}

// 事前生成リストにない組み合わせも、アクセスがあれば動的に生成してキャッシュする
export const dynamicParams = true;
export const revalidate = 5184000; // 60日(手続き制度は頻繁には変わらないため長めに設定)

function findCity(pref: string, city: string): City | undefined {
  const p = safeDecode(pref);
  const c = safeDecode(city);
  return CITIES.find((ct) => ct.p === p && ct.c === c);
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export function generateMetadata({ params }: { params: { pref: string; city: string; topic: string } }) {
  const city = findCity(params.pref, params.city);
  const topic = topicBySlug(params.topic);
  if (!city || !topic) return { title: SITE.name };
  const addr = fullAddress(city.p, city.c);
  const title = `${addr}の${topic.label}まとめ(転居・引っ越し手続き)|${SITE.name}`;
  const description = `${addr}に転居・引っ越しする方向けの${topic.label}ガイド。必要書類・窓口・期限をまとめました。`;
  return {
    title,
    description,
    alternates: { canonical: `https://kurashi-navi.com/guide/${encodeURIComponent(city.p)}/${encodeURIComponent(city.c)}/${topic.slug}` },
  };
}

export default function GuidePage({ params }: { params: { pref: string; city: string; topic: string } }) {
  const city = findCity(params.pref, params.city);
  const topic = topicBySlug(params.topic);
  if (!city || !topic) notFound();

  const tasks = topic.taskIds.map((id) => taskById(id)).filter(Boolean) as NonNullable<ReturnType<typeof taskById>>[];
  const offers = COLUMN_OFFERS[topic.offerSlug] ?? [];
  const otherTopics = TOPICS.filter((t) => t.slug !== topic.slug).slice(0, 4);
  const addr = fullAddress(city.p, city.c);

  return (
    <main className="mx-auto max-w-md px-5 pb-20">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-lg font-black">{SITE.name}🏠</Link>
        <Link href="/area" className="text-xs text-cocoa/60 underline">地域から探す</Link>
      </header>

      {/* パンくず(SEO用) */}
      <nav className="text-[11px] text-cocoa/50" aria-label="breadcrumb">
        <Link href="/">トップ</Link> ›{" "}
        <Link href="/area">{city.p}</Link> ›{" "}
        <span>{city.c}の{topic.label}</span>
      </nav>

      <span className="font-maru mt-3 inline-block rounded-full bg-piyo/40 px-2.5 py-0.5 text-xs font-bold text-piyodeep">
        {city.p}{city.c}
      </span>
      <h1 className="font-maru mt-2 text-xl font-bold leading-snug">
        {topic.emoji} {addr}の{topic.label}まとめ
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-cocoa/80">
        {addr}へ転居・引っ越しをする方向けの手続きガイドです。{topic.intro}
      </p>

      {/* 都市の基本情報(この都市固有の実データ) */}
      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <p className="font-maru text-sm font-bold">📍 {addr}について</p>
        <p className="mt-1 text-sm text-cocoa/70">読み:{city.k || "—"}</p>
        {city.u && (
          <a href={city.u} target="_blank" rel="noopener" className="mt-2 inline-block text-sm text-piyodeep underline">
            {city.c}の公式サイトを見る →
          </a>
        )}
      </div>

      {/* 手続きの詳細(タスクマスタの実データを再利用) */}
      <section className="mt-5 space-y-3">
        <h2 className="font-maru font-bold">手続きの詳細</h2>
        {tasks.map((task) => (
          <div key={task.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="font-bold">{task.name}</p>
            <p className="mt-1 text-xs text-cocoa/60">{DEADLINE_LABEL[task.deadline]}</p>
            <p className="mt-2 text-sm text-cocoa/80">📍 {task.place}</p>
            {task.docs.length > 0 && (
              <ul className="mt-2 space-y-0.5 text-sm text-cocoa/80">
                {task.docs.map((d) => <li key={d}>・{d}</li>)}
              </ul>
            )}
            <div className="mt-3 rounded-xl bg-piyo/25 p-3 text-sm leading-relaxed">
              🌱 {task.advice}
            </div>
          </div>
        ))}
      </section>

      {/* 管轄窓口の検索リンク(免許・車庫証明のみ。データ化困難な管轄範囲は検索で補完) */}
      {(topic.slug === "menkyo-jusho" || topic.slug === "shako-shomei") && (
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(`${city.p}${city.c} 管轄 警察署 ${topic.slug === "menkyo-jusho" ? "運転免許" : "車庫証明"}`)}`}
          target="_blank"
          rel="noopener"
          className="mt-3 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition active:scale-95"
        >
          <span className="text-2xl">🚓</span>
          <span className="min-w-0">
            <span className="font-maru block font-bold">{city.c}の管轄警察署を調べる</span>
            <span className="block text-xs text-cocoa/60">住所によって窓口が変わるため、検索結果でご確認ください</span>
          </span>
          <span className="ml-auto shrink-0 text-cocoa/40">›</span>
        </a>
      )}

      <OfferBox title="🌱 関連するサービス" offers={offers} />

      <Link
        href="/"
        className="font-maru mt-6 flex items-center justify-center gap-2 rounded-full bg-cocoa py-3.5 font-bold text-piyo shadow active:scale-95 transition"
      >
        {city.c}への引っ越し用リストを作る
      </Link>

      {/* 内部リンク:同じ都市の他トピック */}
      <section className="mt-8">
        <h2 className="font-maru text-sm font-bold text-cocoa/80">{city.c}の他の手続きも見る</h2>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {otherTopics.map((t) => (
            <Link
              key={t.slug}
              href={`/guide/${encodeURIComponent(city.p)}/${encodeURIComponent(city.c)}/${t.slug}`}
              className="rounded-xl bg-white p-3 text-sm shadow-sm"
            >
              {t.emoji} {t.label}
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-8 text-[11px] leading-relaxed text-cocoa/50">
        手続きの詳細は自治体・時期により変更される場合があります。最新情報は必ず{city.c}の公式サイトでご確認ください。
      </p>
    </main>
  );
}
