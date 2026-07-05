import Link from "next/link";
import Minori from "@/components/Minori";

type Provider = {
  name: string;
  point: string;
  href: string;
};

const WATER: Provider[] = [
  {
    name: "水道修理屋｜水道のトラブル即解決（満足度93%）",
    point: "水漏れなどの水道トラブルに対応。お客様満足度93%の実績があります。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+GFSZ6A+36X8+2HCB1D",
  },
  {
    name: "水道救急センター（株式会社ライフサポート）｜最短30分で駆けつけ",
    point: "トイレのつまり・水漏れに対応。無料お見積りが可能です。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+GGEES2+3A3O+5ZMCH",
  },
];

const LOCK: Provider[] = [
  {
    name: "カギ110番｜鍵トラブルをスピード解決",
    point: "24時間365日受付対応。加盟店数が多く、鍵の紛失・故障・交換など幅広いトラブルに対応しています。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+G6A1HU+39GM+355UY9",
  },
  {
    name: "鍵のプロが解決します｜防犯設備士在籍",
    point: "料金表に基づいたお見積りを提示。警察署からの依頼実績もある業者です。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+G6VH3M+39BC+HXKQP",
  },
  {
    name: "鍵修理屋｜紛失・破損・開錠・作成に対応",
    point: "ご相談・出張料・お見積りはすべて0円です。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+G82CB6+36X8+2Z8T75",
  },
];

const KEY_COPY: Provider[] = [
  {
    name: "俺の合鍵｜合鍵作成・郵送サービス（送料無料）",
    point: "急いでいなければ、店舗に行かずに合鍵を郵送で作成できます。全国対応・送料無料。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+G8NRWY+39BC+64RJ5",
  },
];

const PEST: Provider[] = [
  {
    name: "ねずみ110番｜ねずみ駆除・予防のご相談",
    point: "24時間365日受付対応。ねずみの駆除だけでなく、予防のご相談にも対応しています。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+FRZMZ6+39GM+1HMIGH",
  },
  {
    name: "鳩110番｜鳩被害の駆除・対策",
    point: "ベランダ・屋根の鳩被害に対応。キャンセル料0円です。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+FSL2KY+39GM+2BE6PD",
  },
];

export default function WaterGoodsPage() {
  return (
    <main className="mx-auto max-w-md px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <nav className="mt-2 text-xs text-cocoa/50">
        <Link href="/goods" className="underline">おすすめグッズ</Link> ＞ 暮らしの緊急トラブル
      </nav>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={130} />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          焦って1社に即決する前に、
          <br />
          ここだけは確認してね🌱
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          水道・鍵・害虫害獣の
          <span className="bg-piyo px-2 rounded-lg">緊急トラブル相談</span>
        </h1>
      </section>

      {/* PR開示 */}
      <div className="mt-6 rounded-2xl bg-cocoa/5 p-4 text-xs leading-relaxed text-cocoa/70">
        このページはPR（広告）を含みます。ご依頼いただくと当サイトに紹介料が入るもの（アフィリエイトプログラム）を含みます。
      </div>

      {/* 選定基準（ここが特に重要なジャンル） */}
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-maru text-base font-bold">🌱 依頼前に必ず確認したいこと</h2>
        <ul className="mt-3 space-y-2 text-sm text-cocoa/80">
          <li>・<strong>作業前に見積りを提示してもらえるか</strong>（金額を確認する前に作業を始める業者は避けましょう）</li>
          <li>・<strong>出張費・キャンセル料が無料かどうか</strong></li>
          <li>・<strong>お住まいの自治体の「指定給水装置工事事業者」かどうか</strong>（水道局のサイトで確認できます）</li>
          <li>・<strong>追加料金が発生する条件</strong>（夜間・休日・部品代など）</li>
        </ul>
        <p className="mt-3 text-xs text-cocoa/50">
          ※ 水道トラブルの修理業者は高額請求のトラブルが報告されているジャンルです。焦って1社にすぐ依頼せず、可能であれば複数社の見積りを比較しましょう。
        </p>
      </section>

      <ProviderSection
        emoji="🚰"
        title="水道トラブルの修理を依頼する"
        note="水漏れ・詰まり・故障など、症状に対応できるかを確認してから依頼しましょう。"
        providers={WATER}
      />

      <ProviderSection
        emoji="🔑"
        title="鍵のトラブルを相談する"
        note="鍵の紛失・故障・交換など、24時間対応の窓口もあります。"
        providers={LOCK}
      />

      <ProviderSection
        emoji="🗝"
        title="急ぎでなければ、合鍵を郵送で作成"
        note="紛失の予防や予備の合鍵作りなら、店舗に行かずに郵送で作成できるサービスもあります。"
        providers={KEY_COPY}
      />

      <ProviderSection
        emoji="🐀"
        title="ねずみ・害虫のトラブルを相談する"
        note="24時間対応の窓口もあります。予防だけの相談も可能な場合があります。"
        providers={PEST}
      />

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        料金・対応内容は事業者や症状によって異なります。作業前に必ず見積りをご確認ください。
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
              相談・見積りを依頼する
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
