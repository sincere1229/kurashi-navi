import Link from "next/link";
import Minori from "@/components/Minori";

type GoodsCategory = {
  emoji: string;
  title: string;
  desc: string;
  href: string;
  status: "live" | "soon";
};

const GOODS_CATEGORIES: GoodsCategory[] = [
  { emoji: "🕯", title: "葬儀・仏具・供養", desc: "葬儀社の比較から仏壇・位牌・骨壷まで", href: "/goods/butsugu", status: "live" },
  { emoji: "⚡", title: "電気・ガス・ネット", desc: "引っ越し先の回線・ライフライン比較", href: "/goods/lifeline", status: "live" },
  { emoji: "🏢", title: "不動産", desc: "新居探し・売却・空き家査定", href: "/goods/realestate", status: "live" },
  { emoji: "🏛", title: "相続の相談窓口", desc: "弁護士・司法書士・税理士を比較", href: "/goods/inheritance", status: "live" },
  { emoji: "🧮", title: "税理士紹介", desc: "相続税・確定申告・法人税務の相談", href: "/goods/tax", status: "live" },
  { emoji: "⚖️", title: "借金・債務整理", desc: "任意整理・自己破産などの無料相談", href: "/goods/debt", status: "live" },
  { emoji: "🚛", title: "引っ越し業者の一括見積もり", desc: "料金を比較して最大50%安くなることも", href: "/goods/moving", status: "live" },
  { emoji: "🅿️", title: "月極駐車場", desc: "新居まわりの駐車場を検索", href: "/goods/parking", status: "live" },
  { emoji: "🚰", title: "緊急トラブル", desc: "水道・鍵・害虫害獣などの相談窓口", href: "/goods/water", status: "live" },
  { emoji: "👴", title: "介護のお助けグッズ", desc: "老人ホーム探し・在宅介護サービスの相談", href: "/goods/care", status: "live" },
  { emoji: "🛡", title: "保険の見直し", desc: "火災保険の無料診断", href: "/goods/insurance", status: "live" },
  { emoji: "🎒", title: "防災・備え", desc: "備蓄・非常用グッズの選び方", href: "/goods/bousai", status: "soon" },
];

export default function GoodsHubPage() {
  return (
    <main className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={140} variant="main" />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          「どれを選べばいいか分からない」を、
          <br />
          みのりが一緒に整理するね🌱
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          暮らしの
          <span className="bg-piyo px-2 rounded-lg">おすすめグッズ</span>
          <br />
          比較・選び方ガイド
        </h1>
      </section>

      {/* PR開示バナー(一覧ページにも必ず表示) */}
      <div className="mt-6 rounded-2xl bg-cocoa/5 p-4 text-xs leading-relaxed text-cocoa/70">
        このページはPR（広告）を含みます。紹介する商品・サービスの一部には、成果報酬型の提携（アフィリエイトプログラム）を利用しているものがあります。掲載順は広告の有無ではなく、後述する選定基準にもとづいています。
      </div>

      <section className="mt-8">
        <h2 className="font-maru text-lg font-bold">🛍 カテゴリから選ぶ</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {GOODS_CATEGORIES.map((c) => (
            <GoodsCard key={c.title} category={c} />
          ))}
        </div>
      </section>

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        商品の価格・仕様は変更されることがあります。購入前に必ず販売ページの最新情報をご確認ください。
        <br />
        <span className="mt-3 flex justify-center gap-4">
          <a href="/" className="underline">トップへ戻る</a>
          <a href="/about" className="underline">運営者情報</a>
          <a href="/privacy" className="underline">プライバシーポリシー</a>
        </span>
        <span className="mt-2 block">© 暮らしナビ</span>
      </footer>
    </main>
  );
}

function GoodsCard({ category }: { category: GoodsCategory }) {
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
