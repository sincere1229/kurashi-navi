import Link from "next/link";
import Minori from "@/components/Minori";

type Provider = {
  name: string;
  point: string;
  href: string;
  img?: string;
  recommend?: string;
};

const FIRE_INSURANCE: Provider[] = [
  {
    name: "火災保険 無料診断サービス｜安いプランがわかる",
    point: "顧客満足度94%。今の火災保険が適正価格かどうか、無料で診断してもらえます。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+DKSZIQ+3RU+6S6Q1T",
    img: "https://www26.a8.net/svt/bgt?aid=260705985821&wid=005&eno=01&mid=s00000000489041014000&mc=1",
    recommend: "📉 何年も見直しておらず、割高かもしれないと感じている人向け",
  },
];

export default function InsuranceGoodsPage() {
  return (
    <main className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <nav className="mt-2 text-xs text-cocoa/50">
        <Link href="/goods" className="underline">おすすめグッズ</Link> ＞ 保険の見直し
      </nav>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={130} />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          何年も見直していない保険、
          <br />
          一度チェックしてみない？🌱
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          保険の
          <span className="bg-piyo px-2 rounded-lg">無料診断・見直し</span>
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
          <li>・<strong>診断・相談が無料かどうか</strong></li>
          <li>・<strong>現在の契約内容と比較して説明してもらえるか</strong></li>
          <li>・<strong>乗り換えを無理に勧められないか</strong>（今の契約のままが最適な場合もあります）</li>
        </ul>
      </section>

      <ProviderSection
        emoji="🔥"
        title="火災保険の無料診断"
        note="築年数や補償内容によって、今より安いプランが見つかる場合があります。"
        providers={FIRE_INSURANCE}
      />

      {/* 実家・不動産への導線 */}
      <section className="mt-8 flex items-center gap-3 rounded-2xl bg-piyo/25 p-4">
        <span className="text-2xl">🏚</span>
        <p className="text-sm text-cocoa/80">
          台風・経年劣化などで自宅の修理が必要な場合は、
          <Link href="/goods/realestate" className="mx-1 font-bold underline text-piyodeep">
            火災保険の申請サポート
          </Link>
          もあわせてご覧ください。
        </p>
      </section>

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        保険料・診断内容は保険会社や契約状況により異なります。お申し込み前に必ず公式ページでご確認ください。
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
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((p) => (
          <div key={p.name} className="rounded-2xl bg-white p-4 shadow-sm">
            {p.img && (
              <img
                src={p.img}
                alt=""
                loading="lazy"
                className="mb-3 w-full rounded-xl border border-cocoa/10 object-cover"
              />
            )}
            {p.recommend && (
              <span className="font-maru inline-block rounded-full bg-piyo px-3 py-1 text-[11px] font-bold text-cocoa">
                {p.recommend}
              </span>
            )}
            <p className="mt-2 font-bold text-sm leading-snug">{p.name}</p>
            <p className="mt-1 text-xs text-cocoa/70">{p.point}</p>
            <a
              href={p.href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="font-maru mt-3 block rounded-full bg-cocoa py-2 text-center text-xs font-bold text-piyo"
            >
              無料診断を申し込む
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
