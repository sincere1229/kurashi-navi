import Link from "next/link";
import Minori from "@/components/Minori";

type Category = {
  emoji: string;
  title: string;
  desc: string;
  href: string;
  status: "live" | "soon";
};

const CATEGORIES: Category[] = [
  { emoji: "🚚", title: "引っ越し", desc: "やることリストを60秒で診断", href: "/moving", status: "live" },
  { emoji: "🚛", title: "引っ越し業者比較", desc: "一括見積もりで料金を比較", href: "/goods/moving", status: "live" },
  { emoji: "🏢", title: "不動産", desc: "新居探し・売却・空き家査定", href: "/goods/realestate", status: "live" },
  { emoji: "🏛", title: "相続の相談窓口", desc: "弁護士・司法書士・税理士を比較", href: "/goods/inheritance", status: "live" },
  { emoji: "⚡", title: "電気・ガス・ネット", desc: "引っ越し先の回線・ライフライン比較", href: "/goods/lifeline", status: "live" },
  { emoji: "🛍", title: "おすすめグッズ", desc: "葬儀・仏具・供養など暮らしの比較", href: "/goods", status: "live" },
  { emoji: "👴", title: "介護", desc: "老人ホーム・施設探しの無料相談", href: "/goods/care", status: "live" },
  { emoji: "💔", title: "離婚・財産分与", desc: "お金と手続きの整理", href: "/column?cat=divorce", status: "soon" },
  { emoji: "🛡", title: "保険の見直し", desc: "火災保険の無料診断", href: "/goods/insurance", status: "live" },
  { emoji: "💰", title: "年金・給付金", desc: "もらい忘れを防ぐ", href: "/column?cat=pension", status: "soon" },
  { emoji: "📋", title: "退職・転職", desc: "失業保険・残業代の整理", href: "/column?cat=job", status: "soon" },
];

export default function TopPage() {
  return (
    <main className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <span className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </span>
      </header>

      {/* ヒーロー */}
      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={150} variant="main" />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          暮らしの「困った」を、ぜんぶひとつに。
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          引っ越し、相続、介護、お金…
          <br />
          <span className="bg-piyo px-2 rounded-lg">困りごとから探す</span>
          <br />
          暮らしの総合ナビ
        </h1>
      </section>

      {/* 困りごとから探す */}
      <section className="mt-10">
        <h2 className="font-maru text-lg font-bold">🔎 困りごとから探す</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.title} category={c} />
          ))}
        </div>
      </section>

      {/* 地域から探す */}
      <section className="mt-10">
        <h2 className="font-maru text-lg font-bold">📍 地域から探す</h2>
        <Link
          href="/area"
          className="mt-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm active:scale-95 transition"
        >
          <span className="text-2xl">🗾</span>
          <div>
            <p className="font-bold">都道府県・市区町村から探す</p>
            <p className="mt-1 text-sm text-cocoa/70">
              役所・警察署・手続き窓口をエリアごとに確認
            </p>
          </div>
          <span className="ml-auto text-cocoa/40">›</span>
        </Link>
      </section>

      {/* コラム */}
      <section className="mt-10">
        <h2 className="font-maru text-lg font-bold">📖 読みもの</h2>
        <Link
          href="/column"
          className="mt-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm active:scale-95 transition"
        >
          <span className="text-2xl">✍️</span>
          <div>
            <p className="font-bold">暮らしのコラムを読む</p>
            <p className="mt-1 text-sm text-cocoa/70">
              知らないと損する制度・手続きのはなし
            </p>
          </div>
          <span className="ml-auto text-cocoa/40">›</span>
        </Link>
      </section>

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        掲載している情報は一般的な内容です。手続きの詳細は必ず各自治体・専門家の公式情報でご確認ください。
        <br />
        <span className="mt-3 flex justify-center gap-4">
          <a href="/area" className="underline">地域から探す</a>
          <a href="/column" className="underline">コラム</a>
          <a href="/about" className="underline">運営者情報</a>
          <a href="/privacy" className="underline">プライバシーポリシー</a>
          <a href="/contact" className="underline">お問い合わせ</a>
        </span>
        <span className="mt-2 block">© 暮らしナビ</span>
      </footer>
    </main>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const isLive = category.status === "live";
  return (
    <Link
      href={category.href}
      aria-disabled={!isLive}
      className={`relative flex flex-col gap-1 overflow-hidden rounded-2xl p-4 shadow-sm transition active:scale-95 md:flex-row md:items-center md:gap-4 md:p-0 ${
        isLive ? "bg-piyo md:bg-white" : "bg-white"
      }`}
    >
      {!isLive && (
        <span className="font-maru absolute right-2 top-2 z-10 rounded-full bg-cocoa/10 px-2 py-0.5 text-[10px] font-bold text-cocoa/60">
          準備中
        </span>
      )}

      {/* アイコンブロック：PCでは横長カード左側の大きな色つきブロックに */}
      <div
        className={`flex shrink-0 items-center justify-center text-2xl md:h-full md:w-24 md:text-4xl md:py-6 ${
          isLive ? "md:bg-piyo" : "md:bg-cocoa/5"
        }`}
      >
        {category.emoji}
      </div>

      <div className="md:flex-1 md:py-4 md:pr-4">
        <p className="font-maru font-bold leading-snug">{category.title}</p>
        <p className="text-xs text-cocoa/70">{category.desc}</p>
      </div>

      <span className="hidden text-cocoa/30 md:block md:pr-4">›</span>
    </Link>
  );
}
