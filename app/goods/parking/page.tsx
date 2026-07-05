import Link from "next/link";
import Minori from "@/components/Minori";

type Provider = {
  name: string;
  point: string;
  href: string;
  img?: string;
  recommend?: string;
};

const PARKING: Provider[] = [
  {
    name: "PMC（月極駐車場検索サイト）",
    point: "掲載されている駐車場はすべてPMCが運営。エリアから月極駐車場を検索できます。",
    href: "https://af.moshimo.com/af/c/click?a_id=5664872&p_id=1826&pc_id=3512&pl_id=25664",
    img: "https://image.moshimo.com/af-img/1161/000000025664.png",
    recommend: "🚗 新居のそばで、車を停める場所を探している人向け",
  },
];

export default function ParkingGoodsPage() {
  return (
    <main className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <nav className="mt-2 text-xs text-cocoa/50">
        <Link href="/goods" className="underline">おすすめグッズ</Link> ＞ 月極駐車場
      </nav>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={130} />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          新居のお部屋探しと合わせて、
          <br />
          駐車場も忘れずにね🌱
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          月極駐車場を
          <span className="bg-piyo px-2 rounded-lg">探す</span>
        </h1>
      </section>

      {/* PR開示 */}
      <div className="mt-6 rounded-2xl bg-cocoa/5 p-4 text-xs leading-relaxed text-cocoa/70">
        このページはPR（広告）を含みます。ご契約いただくと当サイトに紹介料が入るもの（アフィリエイトプログラム）を含みます。
      </div>

      {/* 引っ越し・不動産への導線 */}
      <section className="mt-6 flex items-center gap-3 rounded-2xl bg-piyo/25 p-4">
        <span className="text-2xl">🚚</span>
        <p className="text-sm text-cocoa/80">
          新居探しは
          <Link href="/goods/realestate" className="mx-1 font-bold underline text-piyodeep">
            不動産のページ
          </Link>
          、手続きは
          <Link href="/moving" className="mx-1 font-bold underline text-piyodeep">
            やることリスト診断
          </Link>
          もあわせてご覧ください。
        </p>
      </section>

      <ProviderSection
        emoji="🅿️"
        title="月極駐車場を検索する"
        note="エリアや料金から、条件に合う駐車場を探せます。"
        providers={PARKING}
      />

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        駐車場の空き状況・料金は変動します。お申し込み前に必ず公式ページでご確認ください。
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
              駐車場を探す
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
