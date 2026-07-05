import Link from "next/link";
import Minori from "@/components/Minori";

type Provider = {
  name: string;
  point: string;
  href: string;
};

const TAX: Provider[] = [
  {
    name: "税理士紹介サービス｜税理士選びのプロが何度でも優良税理士をご紹介",
    point: "Googleレビュー4.7（2023年9月現在）。相続税・確定申告・法人の税務など、相談内容に合う税理士を何度でも無料で紹介してもらえます。",
    href: "https://af.moshimo.com/af/c/click?a_id=5673567&p_id=5475&pc_id=14990&pl_id=71541",
  },
];

export default function TaxGoodsPage() {
  return (
    <main className="mx-auto max-w-md px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <nav className="mt-2 text-xs text-cocoa/50">
        <Link href="/goods" className="underline">おすすめグッズ</Link> ＞ 税理士紹介
      </nav>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={130} />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          相続税、確定申告、会社の税務。
          <br />
          合う税理士探しから始めよう🌱
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          税理士を
          <span className="bg-piyo px-2 rounded-lg">無料で紹介してもらう</span>
        </h1>
      </section>

      {/* PR開示 */}
      <div className="mt-6 rounded-2xl bg-cocoa/5 p-4 text-xs leading-relaxed text-cocoa/70">
        このページはPR（広告）を含みます。ご相談・ご成約いただくと当サイトに紹介料が入るもの（アフィリエイトプログラム）を含みます。
      </div>

      {/* 選定基準 */}
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-maru text-base font-bold">🌱 みのりの比較ポイント</h2>
        <ul className="mt-3 space-y-2 text-sm text-cocoa/80">
          <li>・<strong>相談したい内容が得意分野か</strong>（相続税・確定申告・法人税務など、税理士にも得意分野があります）</li>
          <li>・<strong>紹介料・相談料が無料かどうか</strong></li>
          <li>・<strong>合わなければ、他の税理士に再紹介してもらえるか</strong></li>
        </ul>
      </section>

      <ProviderSection providers={TAX} />

      {/* 相続への導線 */}
      <section className="mt-8 flex items-center gap-3 rounded-2xl bg-piyo/25 p-4">
        <span className="text-2xl">🏛</span>
        <p className="text-sm text-cocoa/80">
          相続の手続き全般は、
          <Link href="/goods/inheritance" className="mx-1 font-bold underline text-piyodeep">
            相続の相談窓口ページ
          </Link>
          もあわせてご覧ください。
        </p>
      </section>

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        本ページは一般的な情報提供です。個別の税務判断は税理士にご確認ください。
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
    <section className="mt-6 space-y-3">
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
            無料で税理士を紹介してもらう
          </a>
        </div>
      ))}
    </section>
  );
}
