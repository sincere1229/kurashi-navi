import Link from "next/link";
import Minori from "@/components/Minori";

type Provider = {
  name: string;
  point: string;
  href: string;
};

// ▼ 提携先が決まり次第、name / point / href を差し替えてください
const INTERNET: Provider[] = [
  {
    name: "光回線A（提携予定）",
    point: "工事の要否・対応エリア・キャッシュバックの有無を比較の目安に。",
    href: "#AFFI:internet_A",
  },
  {
    name: "光回線B（提携予定）",
    point: "マンション・戸建てでプランが異なる場合があります。",
    href: "#AFFI:internet_B",
  },
];

const ELECTRICITY: Provider[] = [
  {
    name: "電力会社A（提携予定）",
    point: "基本料金・従量単価・解約金の有無を比較しましょう。",
    href: "#AFFI:electric_A",
  },
];

const GAS: Provider[] = [
  {
    name: "ガス会社A（提携予定）",
    point: "都市ガス・プロパンで選べる会社が異なります。",
    href: "#AFFI:gas_A",
  },
];

export default function LifelineGoodsPage() {
  return (
    <main className="mx-auto max-w-md px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <nav className="mt-2 text-xs text-cocoa/50">
        <Link href="/goods" className="underline">おすすめグッズ</Link> ＞ 電気・ガス・ネット
      </nav>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={130} />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          引っ越しのタイミングって、
          <br />
          実は見直しの一番のチャンスだよ🌱
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          電気・ガス・ネット回線
          <br />
          <span className="bg-piyo px-2 rounded-lg">比較・お申し込み</span>
        </h1>
      </section>

      {/* PR開示 */}
      <div className="mt-6 rounded-2xl bg-cocoa/5 p-4 text-xs leading-relaxed text-cocoa/70">
        このページはPR（広告）を含みます。掲載している事業者の一部には、お申し込みいただくと当サイトに紹介料が入るもの（アフィリエイトプログラム）があります。料金・特典は時期により変わるため、お申し込み前に必ず公式ページでご確認ください。
      </div>

      {/* 選定基準 */}
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-maru text-base font-bold">🌱 みのりの比較ポイント</h2>
        <ul className="mt-3 space-y-2 text-sm text-cocoa/80">
          <li>・<strong>対応エリア</strong>（引っ越し先の住所で使えるか）</li>
          <li>・<strong>工事の要否と開通までの日数</strong></li>
          <li>・<strong>契約期間の縛りと解約金の有無</strong></li>
          <li>・<strong>キャンペーン・キャッシュバックの適用条件</strong></li>
        </ul>
        <p className="mt-3 text-xs text-cocoa/50">
          ※ 料金プランは地域・建物タイプ（戸建て／集合住宅）によって異なる場合があります。
        </p>
      </section>

      {/* 引っ越しとのセット案内 */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-piyo/25 p-4">
        <span className="text-2xl">🚚</span>
        <p className="text-sm text-cocoa/80">
          引っ越しが決まっている方は、
          <Link href="/moving" className="mx-1 font-bold underline text-piyodeep">
            やることリスト診断
          </Link>
          も一緒にチェックしておくと安心です。
        </p>
      </div>

      {/* インターネット回線 */}
      <ProviderSection
        emoji="📶"
        title="インターネット回線"
        note="開通工事が必要な場合、申し込みから利用開始まで数週間かかることがあります。早めの手続きがおすすめです。"
        providers={INTERNET}
      />

      {/* 電気 */}
      <ProviderSection
        emoji="💡"
        title="電気"
        note="自由化により、地域の電力会社以外からも選べるようになっています。"
        providers={ELECTRICITY}
      />

      {/* ガス */}
      <ProviderSection
        emoji="🔥"
        title="ガス"
        note="都市ガスかプロパンガスかで、選べる会社・料金体系が変わります。"
        providers={GAS}
      />

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        料金・特典・対応エリアは変更されることがあります。お申し込み前に必ず公式ページの最新情報をご確認ください。
        <br />
        <span className="mt-3 flex justify-center gap-4">
          <a href="/goods" className="underline">おすすめグッズ一覧</a>
          <a href="/about" className="underline">運営者情報</a>
          <a href="/privacy" className="underline">プライバシーポリシー</a>
        </span>
        <span className="mt-2 block">© 暮らしナビ</span>
      </footer>
    </main>
  );
}

function ProviderSection({
  emoji,
  title,
  note,
  providers,
}: {
  emoji: string;
  title: string;
  note: string;
  providers: Provider[];
}) {
  return (
    <section className="mt-8">
      <h2 className="font-maru text-lg font-bold">
        {emoji} {title}
      </h2>
      <p className="mt-1 text-xs text-cocoa/60">{note}</p>
      <div className="mt-3 space-y-3">
        {providers.map((p) => (
          <div key={p.name} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="font-bold text-sm leading-snug">{p.name}</p>
            <p className="mt-1 text-xs text-cocoa/70">{p.point}</p>
            <a
              href={p.href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="font-maru mt-3 block rounded-full bg-cocoa py-2 text-center text-xs font-bold text-piyo"
            >
              詳細を見る・申し込む
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
