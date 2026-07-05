import Link from "next/link";
import Minori from "@/components/Minori";

type Provider = {
  name: string;
  point: string;
  href: string;
};

const CARE_FACILITY: Provider[] = [
  {
    name: "いい介護｜老人ホーム・介護施設探し（無料相談）",
    point: "お客様満足度91%。希望条件に合う施設を、専門の相談員が無料で一緒に探してくれます。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B5LK2+5VYF82+5VOK+5YZ75",
  },
];

const HOME_CARE: Provider[] = [
  {
    name: "イチロウ｜自費の訪問介護・通院付き添いサービス",
    point: "介護保険の対象外となる時間帯や内容にも対応できる、自費の訪問介護サービスです。通院の付き添いにも利用できます。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B5LK2+5URK0I+54PG+5ZMCH",
  },
];

export default function CareGoodsPage() {
  return (
    <main className="mx-auto max-w-md px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <nav className="mt-2 text-xs text-cocoa/50">
        <Link href="/goods" className="underline">おすすめグッズ</Link> ＞ 介護
      </nav>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={130} />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          施設選びも、在宅介護も、
          <br />
          一人で抱え込まなくて大丈夫だよ🌱
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          介護施設探し・
          <span className="bg-piyo px-2 rounded-lg">在宅介護サービス</span>
        </h1>
      </section>

      {/* PR開示 */}
      <div className="mt-6 rounded-2xl bg-cocoa/5 p-4 text-xs leading-relaxed text-cocoa/70">
        このページはPR（広告）を含みます。ご相談・お申し込みいただくと当サイトに紹介料が入るもの（アフィリエイトプログラム）を含みます。
      </div>

      {/* 選定基準 */}
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-maru text-base font-bold">🌱 みのりの比較ポイント</h2>
        <ul className="mt-3 space-y-2 text-sm text-cocoa/80">
          <li>・<strong>要介護度に対応した施設か</strong>（特養・有料老人ホーム・サ高住などで対応範囲が異なります）</li>
          <li>・<strong>入居一時金の有無と金額</strong></li>
          <li>・<strong>希望エリアでの空き状況</strong></li>
          <li>・<strong>見学のしやすさ</strong>（相談員が同行してくれるかなど）</li>
        </ul>
      </section>

      <ProviderSection
        emoji="🏠"
        title="老人ホーム・施設を探す"
        note="希望条件に合う施設を、専門の相談員が無料で一緒に探してくれます。"
        providers={CARE_FACILITY}
      />

      <ProviderSection
        emoji="🚶"
        title="在宅で介護サービスを利用する"
        note="介護保険では対応しきれない時間帯・内容を、自費サービスで補うという選択肢もあります。"
        providers={HOME_CARE}
      />

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        施設の空き状況・料金は変動します。お申し込み前に必ず公式ページでご確認ください。
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
    <section className="mt-6">
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
              無料相談する
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
