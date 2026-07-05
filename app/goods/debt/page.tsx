import Link from "next/link";
import Minori from "@/components/Minori";

type Provider = {
  name: string;
  point: string;
  href: string;
  img?: string;
  recommend?: string;
};

const DEBT_CONSULT: Provider[] = [
  {
    name: "イストワール法律事務所（弁護士法人）｜債務整理専門",
    point: "債務整理を専門に取り扱う法律事務所です。長時間の無料相談に対応しています。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+DLZUQA+4FR4+644DT",
    img: "https://www20.a8.net/svt/bgt?aid=260705985823&wid=005&eno=01&mid=s00000020704001027000&mc=1",
    recommend: "🗣 じっくり時間をかけて、無料で相談したい人向け",
  },
];

export default function DebtGoodsPage() {
  return (
    <main className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <nav className="mt-2 text-xs text-cocoa/50">
        <Link href="/goods" className="underline">おすすめグッズ</Link> ＞ 借金・債務整理
      </nav>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={130} />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          一人で抱え込まず、
          <br />
          まずは無料相談から話してみて🌱
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          借金・
          <span className="bg-piyo px-2 rounded-lg">債務整理の相談窓口</span>
        </h1>
      </section>

      {/* PR開示 */}
      <div className="mt-6 rounded-2xl bg-cocoa/5 p-4 text-xs leading-relaxed text-cocoa/70">
        このページはPR（広告）を含みます。ご相談・ご依頼いただくと当サイトに紹介料が入るもの（アフィリエイトプログラム）を含みます。
      </div>

      {/* 重要な免責 */}
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-maru text-base font-bold">🌱 相談窓口を選ぶ前に</h2>
        <p className="mt-2 text-sm text-cocoa/80">
          債務整理には、任意整理・個人再生・自己破産など複数の方法があり、状況によって適した方法や結果が異なります。
        </p>
        <ul className="mt-3 space-y-2 text-sm text-cocoa/80">
          <li>・<strong>無料相談の範囲</strong>（時間・回数の制限があるかどうか）</li>
          <li>・<strong>費用体系が明瞭か</strong>（着手金・報酬金の内訳）</li>
          <li>・<strong>債務整理の実績・専門性</strong></li>
        </ul>
        <p className="mt-3 text-xs text-cocoa/50">
          ※ このページは一般的な情報の整理を目的としており、個別の法律相談ではありません。結果を保証するものではなく、具体的な解決方法は法律事務所に直接ご確認ください。
        </p>
      </section>

      <ProviderSection providers={DEBT_CONSULT} />

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        本ページは一般的な情報提供であり、法律相談ではありません。個別の判断は弁護士・司法書士にご相談ください。
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
            無料相談する
          </a>
        </div>
      ))}
    </section>
  );
}
