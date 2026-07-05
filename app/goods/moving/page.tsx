import Link from "next/link";
import Minori from "@/components/Minori";

type Provider = {
  name: string;
  point: string;
  href: string;
  img?: string;
  recommend?: string;
};

const MOVERS: Provider[] = [
  {
    name: "引越し侍｜引っ越し料金一括見積もり",
    point: "複数の引っ越し業者にまとめて見積もり依頼ができ、料金が最大50%安くなることもあります。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+1PBR6A+ZXM+I7NE9",
    img: "https://www21.a8.net/svt/bgt?aid=260703971103&wid=005&eno=01&mid=s00000004657003059000&mc=1",
    recommend: "📊 複数社をまとめて比較して、一番安いところを見つけたい人向け",
  },
  {
    name: "トレファク引越｜引越し+買取でお得に",
    point: "引っ越しと同時に、不要な家具・家電の買取査定を依頼できます。処分と収入を同時に済ませたい方に。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+CLOETU+1PO0+ZUXRL",
    img: "https://www25.a8.net/svt/bgt?aid=260521603762&wid=005&eno=01&mid=s00000007992006023000&mc=1",
    recommend: "🛋 引っ越しついでに不要な家具・家電を処分・現金化したい人向け",
  },
];

export default function MovingGoodsPage() {
  return (
    <main className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <nav className="mt-2 text-xs text-cocoa/50">
        <Link href="/goods" className="underline">おすすめグッズ</Link> ＞ 引っ越し業者
      </nav>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={130} />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          引っ越し業者選びは、
          <br />
          1社だけで決めないのがコツだよ🌱
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          引っ越し業者の
          <span className="bg-piyo px-2 rounded-lg">一括見積もり</span>
        </h1>
      </section>

      {/* PR開示 */}
      <div className="mt-6 rounded-2xl bg-cocoa/5 p-4 text-xs leading-relaxed text-cocoa/70">
        このページはPR（広告）を含みます。ご利用いただくと当サイトに紹介料が入るもの（アフィリエイトプログラム）を含みます。料金・特典は時期や条件により変わるため、お申し込み前に公式ページでご確認ください。
      </div>

      {/* 選定基準 */}
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-maru text-base font-bold">🌱 みのりの比較ポイント</h2>
        <ul className="mt-3 space-y-2 text-sm text-cocoa/80">
          <li>・<strong>複数社の見積もりを比較</strong>する（1社だけだと相場が分かりません）</li>
          <li>・<strong>繁忙期（3〜4月）は早めに依頼</strong>する（料金が上がりやすい時期です）</li>
          <li>・<strong>荷物量と作業内容</strong>を正確に伝える（当日の追加料金トラブルを防げます）</li>
        </ul>
      </section>

      <ProviderSection providers={MOVERS} />

      {/* 引っ越し診断への導線 */}
      <section className="mt-8 flex items-center gap-3 rounded-2xl bg-piyo/25 p-4">
        <span className="text-2xl">📋</span>
        <p className="text-sm text-cocoa/80">
          手続きの
          <Link href="/moving" className="mx-1 font-bold underline text-piyodeep">
            やることリスト診断
          </Link>
          もあわせてチェックしておくと安心です。
        </p>
      </section>

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        料金・キャンペーン内容は変更されることがあります。お申し込み前に必ず公式ページでご確認ください。
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

function ProviderSection({ providers }: { providers: Provider[] }) {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
            料金を比較する
          </a>
        </div>
      ))}
    </section>
  );
}
