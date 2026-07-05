import Link from "next/link";
import Minori from "@/components/Minori";

type Provider = {
  name: string;
  point: string;
  href: string;
};

// ▼ 提携先・実際のリンクが決まり次第、name / point / href を差し替えてください
const RENT: Provider[] = [
  {
    name: "クロスハウス｜東京でワンルーム・家具家電付き38,000円〜",
    point: "敷金・礼金・仲介手数料0円。家具家電付きなので、初期費用と手間を抑えたい方に。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+FQ7C5U+4EZ2+BYDTT",
  },
  {
    name: "OAKHOUSE（オークハウス）｜シェアハウス・ソーシャルレジデンス",
    point: "敷金・礼金・仲介手数料無料、家具家電・無料Wi-Fi付き。1998年設立、運営物件数約6,000室。新しい出会いも生まれる暮らし方です。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7U0X+FQSRRM+41A0+60H7L",
  },
];

const RENT_OUT: Provider[] = [
  {
    name: "あなたの物件、貸すならいくら？｜賃貸経営 無料査定",
    point: "民泊・アパート・マンション・シェアハウスとしての活用を検討中の方向け。カンタン30秒で無料査定を依頼できます。掲載実績1万室突破。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+B72KEQ+4EZ2+NX735",
  },
];

const REFORM: Provider[] = [
  {
    name: "リフォーム比較プロ｜リフォーム会社の一括比較",
    point: "リフォームは会社によって見積額の差が大きいため、必ず複数社を比較しましょう。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+CC5H5E+46CI+5ZMCH",
  },
  {
    name: "リフォーム会社紹介サービス｜地域の厳選工務店",
    point: "簡単・無料で、お住まいの地域に対応した工務店を紹介してもらえます。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+CEJ7KI+2ISC+HW2Q9",
  },
  {
    name: "Re:est（リエスト）｜国内最大規模のリフォーム無料見積りサイト",
    point: "リフォーム会社が作った見積りサイトです。複数社の見積りを無料で比較できます。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+BLCYXE+5UT6+5ZMCH",
  },
];

const INSURANCE_REPAIR: Provider[] = [
  {
    name: "火災保険の申請サポート｜無料調査・完全成功報酬",
    point: "台風・経年劣化などで火災保険の対象になる損傷がないか、無料で調査してもらえます。保険金が認定されなかった場合の費用はかかりません（完全成功報酬）。ただし保険金が必ず認定されるわけではない点にご注意ください。",
    href: "https://af.moshimo.com/af/c/click?a_id=5673593&p_id=2932&pc_id=6746&pl_id=37483",
  },
];

const SELL: Provider[] = [
  {
    name: "ピタットハウス秋葉原北店｜借地権の高額買取",
    point: "相談料・出張査定費・手数料はすべて0円。最短7日間で現金化できます。借地権の専門買取業者です。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+ATZ13M+5TEW+5YZ75",
  },
  {
    name: "LIXIL不動産ショップ｜どんな状態の空き家でも買取ります",
    point: "借地権・再建築不可・築50年以上・ゴミ屋敷など、他社で断られた物件にも対応。業歴13年、買取実績10,000件超。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+BG02HE+5TF6+5ZEMP",
  },
  {
    name: "ワケガイ｜訳あり不動産の買い取り（全国対応）",
    point: "共有持分・再建築不可・空き家など「訳あり」不動産の専門買取。簡単無料査定、全国対応・スピード査定に定評があります。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+BH6XOY+5J56+5YZ75",
  },
  {
    name: "ラクウル｜30秒で簡単査定・最短即日で現金化",
    point: "物件価格をスマホで簡単に査定できます。日本全国対応、最短即日の現金化に対応。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+C96B4I+56AO+HVV0H",
  },
  {
    name: "リノべる。｜マンションのかしこい売却査定",
    point: "リノベーション事業者ならではの視点で、マンションの価値を見た査定を受けられます。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+CKHJMA+303O+BXQOH",
  },
  {
    name: "スマート仲介（MIRAIAS）｜高く・早く・安心な不動産売却",
    point: "無料で最大750万円の建物・設備保証付き売却に対応。お客様満足度97.6%。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+BMJU4Y+4I6M+65ME9",
  },
  {
    name: "訪問売却査定キャンペーン｜査定1社につきPayPayポイント10,000円相当",
    point: "訪問査定を依頼するだけで、1社につきPayPayポイント10,000円相当がもらえるキャンペーンです（※条件あり）。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+AWCRIQ+53AC+1BNQZ5",
  },
];

const JUNK: Provider[] = [
  {
    name: "不用品・粗大ごみ回収サービス",
    point: "ご相談・出張費・お見積りは無料です。実家の片付けや、大量の不用品処分にも対応しています。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+1NJGCY+36X8+15P77L",
  },
];

const ESTATE_CLEANUP: Provider[] = [
  {
    name: "ライフリセット｜遺品整理",
    point: "ご遺族様に代わり、旅立ちのお手伝いをします。故人の思い出の品と丁寧に向き合いたい場合に。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B5LK3+1GZOPE+36X8+1ZHAW1",
  },
];

const BUYBACK: Provider[] = [
  {
    name: "クリエル｜出張買取（手数料・査定料・出張料すべて0円）",
    point: "捨てる前に、まず買取査定を。実家の遺品や不用品でも、価値がつく場合があります。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+CF4N6A+5O4W+2N9ZXT",
  },
];

const STORAGE: Provider[] = [
  {
    name: "宅トラ｜宅配型トランクルーム（クロネコヤマト提携）",
    point: "出し入れも配送でできる収納サービスです。保管料は月額1,628円〜。「捨てるか迷うもの」を一時的に預けたい場合に。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+1OQBKI+3E5S+5ZMCH",
  },
];

const LOAN: Provider[] = [
  {
    name: "リトライ（住宅ローン返済のご相談）",
    point: "住宅ローンの返済にお困りの場合の、任意売却・返済に関する無料相談窓口です。24時間対応・相談無料・全国対応。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+C9ROEY+56AO+NTZCH",
  },
  {
    name: "丸の内AMS｜不動産担保ローン（無料審査）",
    point: "審査は即日〜、融資は2日〜。他社で断られた物件・年齢不問・住宅ローン返済中でも申込可能です。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+CGBIDU+5PBE+5Z6WX",
  },
  {
    name: "ジェイ・エフ・シー株式会社｜不動産担保ローン・融資（無料審査）",
    point: "事業者・個人・不動産事業者、それぞれのニーズに対応。最短3日のスピード融資、30年以上の実績、全国対応。",
    href: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+CI3T76+3GA6+60OXD",
  },
];

export default function RealEstateGoodsPage() {
  return (
    <main className="mx-auto max-w-md px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-xl font-black">
          暮らしナビ<span className="text-piyodeep">🏠</span>
        </Link>
      </header>

      <nav className="mt-2 text-xs text-cocoa/50">
        <Link href="/goods" className="underline">おすすめグッズ</Link> ＞ 不動産
      </nav>

      <section className="mt-4 text-center">
        <div className="mx-auto w-fit">
          <Minori size={130} />
        </div>
        <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
          新しいおうち探しも、
          <br />
          実家の整理も、まずは比較から🌱
        </p>
        <h1 className="font-maru mt-6 text-2xl font-black leading-relaxed">
          不動産
          <br />
          <span className="bg-piyo px-2 rounded-lg">新居探し・貸す・売る・査定</span>
        </h1>
      </section>

      {/* PR開示 */}
      <div className="mt-6 rounded-2xl bg-cocoa/5 p-4 text-xs leading-relaxed text-cocoa/70">
        このページはPR（広告）を含みます。掲載しているサービスの一部には、ご利用いただくと当サイトに紹介料が入るもの（アフィリエイトプログラム）があります。料金・査定内容は事業者ごとに異なるため、詳細は各サービスの公式ページでご確認ください。
      </div>

      {/* 新居探し（引っ越し文脈） */}
      <section className="mt-6 flex items-center gap-3 rounded-2xl bg-piyo/25 p-4">
        <span className="text-2xl">🚚</span>
        <p className="text-sm text-cocoa/80">
          引っ越し先を探している方は、
          <Link href="/moving" className="mx-1 font-bold underline text-piyodeep">
            やることリスト診断
          </Link>
          もあわせてご覧ください。
        </p>
      </section>

      <ProviderSection
        emoji="🏢"
        title="新居を探す（賃貸・購入）"
        note="エリア・沿線・間取りなどの条件で、複数の物件をまとめて探せます。"
        providers={RENT}
      />

      <ProviderSection
        emoji="🔑"
        title="所有物件を貸す（賃貸経営）"
        note="実家や空き家を、売らずに賃貸・民泊として活用する選択肢もあります。30秒で無料査定できます。"
        providers={RENT_OUT}
      />

      <ProviderSection
        emoji="🏠"
        title="火災保険で修理できるか、まず無料調査"
        note="台風・経年劣化などによる損傷は、火災保険の対象になる場合があります。調査は無料、完全成功報酬制です。"
        providers={INSURANCE_REPAIR}
      />

      <ProviderSection
        emoji="🔨"
        title="リフォームを検討する場合"
        note="会社によって見積額の差が大きいため、必ず複数社を比較しましょう。"
        providers={REFORM}
      />

      {/* 選定基準（売却） */}
      <section className="mt-10 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-maru text-base font-bold">🌱 みのりの比較ポイント（売却・査定）</h2>
        <ul className="mt-3 space-y-2 text-sm text-cocoa/80">
          <li>・<strong>査定の依頼先数</strong>（1社だけでなく複数社を比較できるか）</li>
          <li>・<strong>空き家・古家への対応</strong>（実家じまいで多い相談です）</li>
          <li>・<strong>売却までの想定期間</strong>（仲介か買取かで大きく変わります）</li>
          <li>・<strong>個人情報の取り扱い</strong>（査定依頼後の連絡方法・件数）</li>
        </ul>
      </section>

      <ProviderSection
        emoji="🏚"
        title="売却・空き家の査定（実家じまい）"
        note="複数社の査定を比較してから決めると、相場感をつかみやすくなります。"
        providers={SELL}
      />

      <ProviderSection
        emoji="💳"
        title="住宅ローンの返済にお困りの方へ"
        note="返済が難しくなった場合、任意売却などの選択肢を早めに相談することで、負担を軽減できる場合があります。"
        providers={LOAN}
      />

      <ProviderSection
        emoji="💰"
        title="まずは買取査定（捨てる前に）"
        note="手数料・査定料・出張料はすべて無料です。価値がつくものは、処分の前に査定を。"
        providers={BUYBACK}
      />

      <ProviderSection
        emoji="🕊"
        title="遺品整理"
        note="故人の思い出の品と丁寧に向き合いたい場合の、専門の遺品整理サービスです。"
        providers={ESTATE_CLEANUP}
      />

      <ProviderSection
        emoji="🗑"
        title="不用品・粗大ごみの処分"
        note="実家の片付けや引っ越しの荷物整理で、大量の不用品が出た場合に。"
        providers={JUNK}
      />

      <ProviderSection
        emoji="📦"
        title="捨てるか迷うものの一時保管"
        note="「今すぐ処分は決められないけれど、家には置いておけない」というものに。"
        providers={STORAGE}
      />

      <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
        査定額・条件は事業者や物件の状況によって異なります。お申し込み前に必ず公式ページでご確認ください。
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
              詳細を見る・査定を申し込む
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
