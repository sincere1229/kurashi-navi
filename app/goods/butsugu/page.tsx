import Link from "next/link";
import Minori from "@/components/Minori";

type Product = {
  name: string;
  point: string;
  rakuten: string;
  amazon: string;
};

type Provider = {
  name: string;
  point: string;
  href: string;
};

const BUTSUDAN: Product[] = [
  {
    name: "小型仏壇 15号（桐無垢・上置き・モダン）／15,900円（税込・送料無料）",
    point: "濃茶色×半艶×扉付きは、リビングに置いても浮きにくい定番の組み合わせです。",
    rakuten: "https://hb.afl.rakuten.co.jp/ichiba/55804871.ba49ec04.55804872.549a6e1f/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkoyori%2Flf200313-21%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
    amazon: "#AFFI:amazon_ミニ仏壇",
  },
];

const IHAI: Product[] = [
  {
    name: "位牌 春日楼門（別上塗・モダン位牌）／4,980円〜（税込・送料無料）",
    point: "文字は「彫り」の方が長く使っても劣化が目立ちにくいのが特徴です。",
    rakuten: "https://hb.afl.rakuten.co.jp/ichiba/558049a9.dbf40a6b.558049aa.70e1541d/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbutsudan-kan%2Fin-400%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
    amazon: "#AFFI:amazon_位牌",
  },
];

const KOTSUBO: Product[] = [
  {
    name: "骨壷 白胡蝶蘭 7寸（高さ約24.5cm×胴径約21.2cm）／7,150円（税込・送料別）",
    point: "産地表記のある陶磁器は、単色でも落ち着いた印象になりやすいです。",
    rakuten: "https://hb.afl.rakuten.co.jp/ichiba/55804cb8.d5aab1d6.55804cb9.3a2273c8/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fe-butsudanya%2Fkotsubo067-01%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
    amazon: "#AFFI:amazon_骨壷",
  },
];

const OCEAN_MEMORIAL: Provider[] = [
  {
    name: "みんなの海洋散骨",
    point: "手元で供養するか、自然に還すか。海洋散骨という選択肢もあります。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B5LK3+1GE93M+4P1A+5ZU29",
  },
];

const GRAVESTONE: Provider[] = [
  {
    name: "墓石ナビ｜お墓の一括見積もり比較",
    point: "利用者満足度98%。全国の優良石材店から無料で一括見積もりができます。安くなった平均額は37万円という実績もあります。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B5LK3+1I6JWY+46CI+BYLJL",
  },
];

const BUTSUGU_SET: Product[] = [
  {
    name: "仏具セット いちりん草 5点セット（白みかげ色・備前吹）上置12号〜18号用／15,800円（税込・送料無料）",
    point: "花立・香炉・火立・仏飯器・茶湯器は素材と色をセットで揃えると統一感が出ます。",
    rakuten: "https://hb.afl.rakuten.co.jp/ichiba/558051db.aa487966.558051dc.1ae5aba5/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbutudan%2F23mbg-itr5-wh%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
    amazon: "#AFFI:amazon_仏具セット",
  },
];

const MOURNING_WEAR: Provider[] = [
  {
    name: "LULUTI（ルルティ）｜フォーマルドレス・喪服レンタル",
    point: "「買う」より「借りる」。急な弔事でも、サイズや小物までまとめてレンタルできます。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B63GF+AI2BGI+4FOM+C0IZL",
  },
  {
    name: "Cariru BLACK FORMAL｜喪服・礼服レンタル",
    point: "最短当日発送に対応。バッグ・靴・数珠など小物までセットでレンタルできます。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B63GF+AFOL1E+1PO0+25FMXT",
  },
];

const FUNERAL: Provider[] = [
  {
    name: "家族葬のこれから｜火葬プラン最安97,900円（税込）〜",
    point: "1日葬・家族葬・火葬プランを比較できます。※直葬プランの資料請求割引価格です。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B5LK3+1FSTHU+5PHI+5ZMCH",
  },
];

const MUTUAL_AID: Provider[] = [
  {
    name: "ごじょクル｜冠婚葬祭に関する相談・資料請求",
    point: "24時間365日受付。もしもの時に慌てないための、冠婚葬祭の事前相談・資料請求ができます。",
    href: "https://af.moshimo.com/af/c/click?a_id=5673575&p_id=2660&pc_id=5963&pl_id=34110",
  },
  {
    name: "ごじょスケ｜全国の互助会葬儀を一括資料請求",
    point: "全国の互助会葬儀を24時間365日、一括で探して資料請求できます。",
    href: "https://af.moshimo.com/af/c/click?a_id=5673571&p_id=2851&pc_id=6517&pl_id=36426",
  },
];

export default function ButsuguGoodsPage() {
  return (
    <main className="mx-auto max-w-md px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <nav className="mt-2 text-xs text-cocoa/50">
        <Link href="/goods" className="underline">おすすめグッズ</Link> ＞ 仏具・供養
      </nav>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={130} />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          葬儀社選びも、仏壇・位牌・骨壷選びも、
          <br />
          はじめてだと迷いますよね。
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          葬儀・仏具・供養の
          <br />
          <span className="bg-piyo px-2 rounded-lg">選び方と比較</span>
        </h1>
      </section>

      {/* PR開示 */}
      <div className="mt-6 rounded-2xl bg-cocoa/5 p-4 text-xs leading-relaxed text-cocoa/70">
        このページはPR（広告）を含みます。紹介する商品には、購入いただくと当サイトに紹介料が入るもの（アフィリエイトリンク）があります。価格・在庫は変動しますので、購入前に販売ページでご確認ください。
      </div>

      {/* 選定基準（公開） */}
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-maru text-base font-bold">🌱 みのりの選び方ポイント</h2>
        <ul className="mt-3 space-y-2 text-sm text-cocoa/80">
          <li>・<strong>色は3色以内</strong>にまとまっているか（色数が多いとにぎやかな印象になりがちです）</li>
          <li>・<strong>光沢は「半艶〜マット」</strong>が、落ち着いた雰囲気になりやすいです（位牌の文字部分は艶ありが伝統的です）</li>
          <li>・<strong>産地・素材の表記</strong>があるか（有田焼・黒檀など、選ぶ際の目安になります）</li>
          <li>・<strong>文字入れ込みの総額</strong>で比較する（本体価格だけで比べると分かりにくいことがあります）</li>
        </ul>
        <p className="mt-3 text-xs text-cocoa/50">
          ※ 上記は一般的な選び方の目安です。宗派や地域の慣習によって適切なものが異なる場合があるため、心配な場合は菩提寺や葬儀社にご確認ください。
        </p>
      </section>

      {/* 葬儀社 */}
      <ProviderSection
        emoji="⛪"
        title="葬儀社・葬儀プランを比較"
        note="家族葬・1日葬・火葬プランなど、内容と費用を事前に比較しておくと安心です。"
        providers={FUNERAL}
      />

      {/* 冠婚葬祭の事前相談 */}
      <ProviderSection
        emoji="📮"
        title="冠婚葬祭の事前相談・資料請求"
        note="まだ具体的なプランを決めていない方も、資料請求だけで備えを始められます。"
        providers={MUTUAL_AID}
      />

      {/* 仏壇 */}
      <ProductSection
        emoji="🏮"
        title="ミニ仏壇"
        note="コンパクトでも、色と艶がまとまっていると落ち着いた印象になります。"
        products={BUTSUDAN}
      />

      {/* 位牌 */}
      <ProductSection
        emoji="🪵"
        title="位牌"
        note="文字入れの方式（彫り／印刷）と、込み価格かどうかを確認すると比較しやすいです。"
        products={IHAI}
      />

      {/* 骨壷 */}
      <ProductSection
        emoji="🏺"
        title="骨壷・骨壷カバー"
        note="陶磁器の産地や色味で、印象がずいぶん変わります。"
        products={KOTSUBO}
      />

      {/* 海洋散骨（供養方法の選択肢） */}
      <ProviderSection
        emoji="🌊"
        title="海洋散骨という選択肢"
        note="お墓や仏壇を持たない供養の形として選ばれることが増えています。"
        providers={OCEAN_MEMORIAL}
      />

      {/* お墓を建てる場合の見積もり比較 */}
      <ProviderSection
        emoji="🪦"
        title="お墓を建てる場合の見積もり比較"
        note="石材店によって価格差が大きいため、複数社を比較すると安心です。"
        providers={GRAVESTONE}
      />

      {/* 仏具セット */}
      <ProductSection
        emoji="🔔"
        title="仏具セット・おりん"
        note="バラで揃えるより、セットの方が色や素材の統一感を出しやすいです。"
        products={BUTSUGU_SET}
      />

      {/* 喪服・フォーマルウェア */}
      <ProviderSection
        emoji="👗"
        title="喪服・フォーマルウェアのレンタル"
        note="急な弔事で「サイズが合う喪服がない」「毎回買うのは負担」という場合に。"
        providers={MOURNING_WEAR}
      />

      <section className="mt-10 rounded-2xl bg-piyo/25 p-4">
        <p className="font-maru text-sm font-bold">もっと詳しく知りたい方へ</p>
        <p className="mt-2 text-sm text-cocoa/80">
          葬儀費用の考え方や、お布施・戒名の基礎知識は、コラムでも詳しく解説しています。
        </p>
        <Link href="/column" className="mt-3 inline-block text-sm font-bold underline text-piyodeep">
          関連コラムを読む ›
        </Link>
      </section>

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        商品の価格・仕様・在庫状況は変更されることがあります。購入前に必ず販売ページの最新情報をご確認ください。
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

function ProductSection({
  emoji,
  title,
  note,
  products,
}: {
  emoji: string;
  title: string;
  note: string;
  products: Product[];
}) {
  return (
    <section className="mt-8">
      <h2 className="font-maru text-lg font-bold">
        {emoji} {title}
      </h2>
      <p className="mt-1 text-xs text-cocoa/60">{note}</p>
      <div className="mt-3 space-y-3">
        {products.map((p) => (
          <div key={p.name} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="font-bold text-sm leading-snug">{p.name}</p>
            <p className="mt-1 text-xs text-cocoa/70">{p.point}</p>
            <div className="mt-3 flex gap-2">
              <a
                href={p.rakuten}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="font-maru flex-1 rounded-full bg-cocoa py-2 text-center text-xs font-bold text-piyo"
              >
                楽天で見る
              </a>
              <a
                href={p.amazon}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="font-maru flex-1 rounded-full border-2 border-cocoa py-2 text-center text-xs font-bold text-cocoa"
              >
                Amazonで見る
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
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
    <section className="mt-8">
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
              詳細を見る
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
