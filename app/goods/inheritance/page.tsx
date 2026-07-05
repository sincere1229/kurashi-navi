import Link from "next/link";
import Minori from "@/components/Minori";

type Provider = {
  name: string;
  point: string;
  href: string;
  img?: string;
  recommend?: string;
};

// ▼ 提携先・実際のリンクが決まり次第、name / point / href を差し替えてください
const CONSULT: Provider[] = [
  {
    name: "相続の面倒ごと、全部お任せください｜相続のプロによる無料相談",
    point: "相続調査・遺産分割協議書の作成・各種手続き・不動産分析まで対応。相談料0円です。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+C8KVIQ+56AO+BY641",
    img: "https://www24.a8.net/svt/bgt?aid=260521603740&wid=005&eno=01&mid=s00000024144002007000&mc=1",
    recommend: "🧾 何から手をつければいいか分からない・丸ごと任せたい人向け",
  },
  {
    name: "相続アシスト｜ゼロタッチ相続税申告",
    point: "相続の手間も不安も、まるごと相談できるサービスです。相続税申告に不安がある方に。",
    href: "https://af.moshimo.com/af/c/click?a_id=5647169&p_id=7301&pc_id=20977&pl_id=93281",
    img: "https://image.moshimo.com/af-img/3982/000000093281.png",
    recommend: "💴 相続税の申告が必要かどうか、まず不安を解消したい人向け",
  },
];

export default function InheritanceGoodsPage() {
  return (
    <main className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <nav className="mt-2 text-xs text-cocoa/50">
        <Link href="/goods" className="underline">おすすめグッズ</Link> ＞ 相続の相談窓口
      </nav>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={130} />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          相続は、誰に相談すればいいか
          <br />
          迷いやすいテーマです。
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          相続の
          <span className="bg-piyo px-2 rounded-lg">相談窓口を比較</span>
        </h1>
      </section>

      {/* PR開示 */}
      <div className="mt-6 rounded-2xl bg-cocoa/5 p-4 text-xs leading-relaxed text-cocoa/70">
        このページはPR（広告）を含みます。掲載している相談窓口の一部には、お申し込みいただくと当サイトに紹介料が入るもの（アフィリエイトプログラム）があります。
      </div>

      {/* 重要な免責 */}
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-maru text-base font-bold">🌱 相談窓口を選ぶ前に</h2>
        <p className="mt-2 text-sm text-cocoa/80">
          相続の手続きは、遺言の有無や相続人の状況によって、相談すべき専門家が異なります。
        </p>
        <ul className="mt-3 space-y-2 text-sm text-cocoa/80">
          <li>・<strong>弁護士</strong>：相続人どうしで意見が分かれている場合の交渉・調停・審判</li>
          <li>・<strong>司法書士</strong>：不動産の相続登記など、争いのない手続き</li>
          <li>・<strong>税理士</strong>：相続税の申告・相談</li>
        </ul>
        <p className="mt-3 text-xs text-cocoa/50">
          ※ このページは一般的な情報の整理を目的としており、個別の法律相談ではありません。具体的な手続きや解決方法については、各相談窓口・専門家に直接ご確認ください。
        </p>
      </section>

      <ProviderSection
        emoji="🏛"
        title="相続の相談窓口"
        note="初回相談の可否・対応エリア・相談したい専門分野を確認して選びましょう。"
        providers={CONSULT}
      />

      <section className="mt-10 rounded-2xl bg-piyo/25 p-4">
        <p className="font-maru text-sm font-bold">実家の売却も検討している方へ</p>
        <p className="mt-2 text-sm text-cocoa/80">
          相続した不動産の売却・査定は、こちらもあわせてご覧ください。
        </p>
        <Link href="/goods/realestate" className="mt-3 inline-block text-sm font-bold underline text-piyodeep">
          不動産の売却・査定を見る ›
        </Link>
      </section>

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        本ページは一般的な情報提供であり、法律相談ではありません。個別の判断は弁護士・司法書士・税理士等の専門家にご相談ください。
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
              詳細を見る・相談する
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
