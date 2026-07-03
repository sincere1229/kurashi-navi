// ============================================================
// アフィリエイト枠の設定
// 運用方法:A8.net/もしも等で提携したらurlを貼り替えるだけ。
// url が空("")の枠は画面に表示されません(審査中でも安全)。
// ============================================================

export type Affiliate = {
  label: string;       // ボタンに出る文言(バナー広告の場合はaltテキストにも使用)
  description: string; // ひとこと説明(バナー広告の場合は画像の上に小さく表示)
  url: string;         // アフィリエイトリンク(空なら非表示)
  emoji: string;
  impressionUrl?: string;  // もしも等の計測用1×1ピクセル(あれば自動で埋め込み)
  bannerImageUrl?: string; // バナー画像URL(指定するとテキストカードの代わりに画像広告を表示)
  bannerWidth?: number;    // 画像の幅(px)
  bannerHeight?: number;   // 画像の高さ(px)
};

// ---- 診断結果・チェックリスト下部に出す「主砲」枠(高単価・引っ越し直結) ----
export const MAIN_OFFERS: Affiliate[] = [
  {
    label: "引越し侍で一括見積もり",
    description: "引っ越し料金が最大50%安くなる比較サービス",
    url: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+1PBR6A+ZXM+I7NE9",
    impressionUrl: "https://www14.a8.net/0.gif?a8mat=4B7SGZ+1PBR6A+ZXM+I7NE9",
    bannerImageUrl: "https://www20.a8.net/svt/bgt?aid=260703971103&wid=005&eno=01&mid=s0000004657003059000&mc=1",
    bannerWidth: 300,
    bannerHeight: 250,
    emoji: "🚚",
  },
  {
    label: "新居のネット回線をえらぶ",
    description: "SoftBank Air・BIGLOBE光など6社から比較できます",
    url: "/column/kaisen-hikaku", // ← 回線比較コラムへ誘導(個別6社はコラム側に集約)
    emoji: "📶",
  },
  {
    label: "不用品・粗大ごみの回収はおまかせ",
    description: "ご相談・出張費・見積り、全部0円",
    url: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+1NJGCY+36X8+15P77L",
    impressionUrl: "https://www10.a8.net/0.gif?a8mat=4B7SGZ+1NJGCY+36X8+15P77L",
    bannerImageUrl: "https://www25.a8.net/svt/bgt?aid=260703971100&wid=005&eno=01&mid=s0000014894007004000&mc=1",
    bannerWidth: 300,
    bannerHeight: 250,
    emoji: "♻️",
  },
];

// ---- 地域情報ページに出す「新生活」枠 ----
export const AREA_OFFERS: Affiliate[] = [
  {
    label: "ウォーターサーバーをはじめる",
    description: "新居の設置は引っ越しと同時がいちばんラク",
    url: "",
    emoji: "💧",
  },
  {
    label: "光熱費の料金診断(enepi)",
    description: "無料診断で、お得なプランをまとめてチェック",
    url: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+2W6YQA+2W92+1NJZN5",
    impressionUrl: "https://www14.a8.net/0.gif?a8mat=4B7SGZ+2W6YQA+2W92+1NJZN5",
    bannerImageUrl: "https://www23.a8.net/svt/bgt?aid=260703971175&wid=005&eno=01&mid=s0000013511010003000&mc=1",
    bannerWidth: 300,
    bannerHeight: 250,
    emoji: "💡",
  },
];

// ---- コラム専用枠(テーマごとの記事下部に表示) ----
export const COLUMN_OFFERS: Record<string, Affiliate[]> = {
  waste: [
    {
      label: "不用品・粗大ごみの回収(ECOクリーン)",
      description: "手数料・出張費・見積り、全部0円",
      url: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+1NJGCY+36X8+15P77L",
      impressionUrl: "https://www10.a8.net/0.gif?a8mat=4B7SGZ+1NJGCY+36X8+15P77L",
      bannerImageUrl: "https://www25.a8.net/svt/bgt?aid=260703971100&wid=005&eno=01&mid=s0000014894007004000&mc=1",
      bannerWidth: 300,
      bannerHeight: 250,
      emoji: "♻️",
    },
    {
      label: "出張買取(クリエル)",
      description: "手数料・査定料・出張料すべて0円。買取額が抽選で7倍",
      url: "https://px.a8.net/svt/ejp?a8mat=4B3VR7+CF4N6A+5O4W+2N9ZXT",
      impressionUrl: "https://www12.a8.net/0.gif?a8mat=4B3VR7+CF4N6A+5O4W+2N9ZXT",
      bannerImageUrl: "https://www26.a8.net/svt/bgt?aid=260521603751&wid=005&eno=01&mid=s0000026456016003000&mc=1",
      bannerWidth: 300,
      bannerHeight: 250,
      emoji: "💰",
    },
  ],
  car: [
    {
      label: "自動車保険の見積もりを比較",
      description: "住所変更のタイミングは、プラン見直しの好機です",
      url: "", // ← A8 自動車保険一括見積もり案件(未提携)
      emoji: "🚗",
    },
  ],
  parking: [
    {
      label: "駅近・格安の月極駐車場を探す",
      description: "PMC マンスリーパーキング",
      url: "https://af.moshimo.com/af/c/click?a_id=5664872&p_id=1826&pc_id=3512&pl_id=25516",
      impressionUrl: "https://i.moshimo.com/af/i/impression?a_id=5664872&p_id=1826&pc_id=3512&pl_id=25516",
      bannerImageUrl: "https://image.moshimo.com/af/img/1161/000000025516.png",
      bannerWidth: 336,
      bannerHeight: 280,
      emoji: "🅿️",
    },
  ],
  moving: [
    {
      label: "引越し侍で一括見積もり",
      description: "引っ越し料金が最大50%安くなる比較サービス",
      url: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+1PBR6A+ZXM+I7NE9",
      impressionUrl: "https://www14.a8.net/0.gif?a8mat=4B7SGZ+1PBR6A+ZXM+I7NE9",
      bannerImageUrl: "https://www20.a8.net/svt/bgt?aid=260703971103&wid=005&eno=01&mid=s0000004657003059000&mc=1",
      bannerWidth: 300,
      bannerHeight: 250,
      emoji: "🚚",
    },
    {
      label: "宅配型トランクルーム(宅トラ)",
      description: "保管料は月額1,628円〜。郊外倉庫でクロネコヤマトが安心",
      url: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+1OQBKI+3E5S+5ZMCH",
      impressionUrl: "https://www19.a8.net/0.gif?a8mat=4B7SGZ+1OQBKI+3E5S+5ZMCH",
      bannerImageUrl: "https://www27.a8.net/svt/bgt?aid=260703971102&wid=005&eno=01&mid=s0000015832001006000&mc=1",
      bannerWidth: 300,
      bannerHeight: 250,
      emoji: "📦",
    },
  ],
  electricity: [
    {
      label: "ドコモでんき(GMOとくとくBB限定)",
      description: "dポイントがたまってお得。5,000円キャッシュバック",
      url: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+2ZRKCY+50+83SRAP",
      impressionUrl: "https://www12.a8.net/0.gif?a8mat=4B7SGZ+2ZRKCY+50+83SRAP",
      bannerImageUrl: "https://www25.a8.net/svt/bgt?aid=260703971181&wid=005&eno=01&mid=s0000000018049011000&mc=1",
      bannerWidth: 300,
      bannerHeight: 250,
      emoji: "💡",
    },
    {
      label: "光熱費の料金診断(enepi)",
      description: "無料診断で、月3,000円以上安くなることも",
      url: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+2W6YQA+2W92+1NJZN5",
      impressionUrl: "https://www14.a8.net/0.gif?a8mat=4B7SGZ+2W6YQA+2W92+1NJZN5",
      bannerImageUrl: "https://www23.a8.net/svt/bgt?aid=260703971175&wid=005&eno=01&mid=s0000013511010003000&mc=1",
      bannerWidth: 300,
      bannerHeight: 250,
      emoji: "💡",
    },
  ],
  gas: [
    {
      label: "プロパンガス複数社比較(enepi)",
      description: "最大年間8万円安くなることも。今すぐ比較",
      url: "https://px.a8.net/svt/ejp?a8mat=4B7SGZ+30CZYQ+2W92+NUU7L",
      impressionUrl: "https://www10.a8.net/0.gif?a8mat=4B7SGZ+30CZYQ+2W92+NUU7L",
      bannerImageUrl: "https://www26.a8.net/svt/bgt?aid=260703971182&wid=005&eno=01&mid=s0000013511004007000&mc=1",
      bannerWidth: 234,
      bannerHeight: 60,
      emoji: "🔥",
    },
  ],
  // インターネット回線比較コラム専用(6社まとめて掲載)
  internet: [
    {
      label: "SoftBank Air",
      description: "工事不要・使い放題。最短1ヶ月、最大50,000円キャッシュバック",
      url: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+BPIZE2+3NMM+HWPVL",
      impressionUrl: "https://www13.a8.net/0.gif?a8mat=4B5Q84+BPIZE2+3NMM+HWPVL",
      bannerImageUrl: "https://www29.a8.net/svt/bgt?aid=260607748708&wid=004&eno=01&mid=s0000017059003008000&mc=1",
      bannerWidth: 300,
      bannerHeight: 250,
      emoji: "📶",
    },
    {
      label: "BIGLOBE光",
      description: "当社限定キャンペーン。最短開通確認後、即日振込み最大50,000円",
      url: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+BQ4FRM+3HKU+1BNYOX",
      impressionUrl: "https://www11.a8.net/0.gif?a8mat=4B5Q84+BQ4FRM+3HKU+1BNYOX",
      bannerImageUrl: "https://www25.a8.net/svt/bgt?aid=260607748709&wid=005&eno=01&mid=s0000016275008006000&mc=1",
      bannerWidth: 300,
      bannerHeight: 250,
      emoji: "📶",
    },
    {
      label: "WiMAX(GMOとくとくBB)",
      description: "ビリビリ還元祭!最大68,000円キャッシュバック(期間限定)",
      url: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+BOC4YA+50+3IT44X",
      impressionUrl: "https://www13.a8.net/0.gif?a8mat=4B5Q84+BOC4YA+50+3IT44X",
      bannerImageUrl: "https://www26.a8.net/svt/bgt?aid=260607748706&wid=005&eno=01&mid=s0000000018021299000&mc=1",
      bannerWidth: 300,
      bannerHeight: 250,
      emoji: "📶",
    },
    {
      label: "auひかり",
      description: "期間限定スペシャルキャンペーン。3社合計最大186,800円おトク",
      url: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+BOXKK2+348K+3H2BC1",
      impressionUrl: "https://www15.a8.net/0.gif?a8mat=4B5Q84+BOXKK2+348K+3H2BC1",
      bannerImageUrl: "https://www26.a8.net/svt/bgt?aid=260607748707&wid=005&eno=01&mid=s0000014546021006000&mc=1",
      bannerWidth: 300,
      bannerHeight: 250,
      emoji: "📶",
    },
    {
      label: "フレッツ光",
      description: "どこよりも早い還元で新生活を応援。最大60,000円+大幅割引",
      url: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+9KQ34I+1MWA+O3UA9",
      impressionUrl: "https://www14.a8.net/0.gif?a8mat=4B5Q84+9KQ34I+1MWA+O3UA9",
      bannerImageUrl: "https://www27.a8.net/svt/bgt?aid=260607748579&wid=005&eno=01&mid=s0000007633004049000&mc=1",
      bannerWidth: 383,
      bannerHeight: 136,
      emoji: "📶",
    },
    {
      label: "BB.exciteひかり Classic",
      description: "PPPoE光回線。マンション月額3,696円、初期費用・工事費無料",
      url: "https://px.a8.net/svt/ejp?a8mat=4B5Q84+9HQX3M+7JY+1BNYOX",
      impressionUrl: "https://www16.a8.net/0.gif?a8mat=4B5Q84+9HQX3M+7JY+1BNYOX",
      bannerImageUrl: "https://www23.a8.net/svt/bgt?aid=260607748574&wid=005&eno=01&mid=s0000000979008006000&mc=1",
      bannerWidth: 300,
      bannerHeight: 250,
      emoji: "📶",
    },
  ],
};

// ---- スクリプト埋め込み型広告(A8のブランドセーフ広告等・地域限定案件) ----
export type ScriptAd = {
  label: string;
  articleId: string;
  linkId: string;
  imageId: string;
  siteId: string;
  sad: string;
  mat: string; // 計測ピクセルのa8matパラメータ
  impressionUrl: string;
};

export const SCRIPT_ADS: Record<string, ScriptAd> = {
  tokyu_denki_gas: {
    label: "東急でんき&ガス(東急線沿線にお住まいの方限定)",
    siteId: "1734",
    articleId: "2311",
    linkId: "10778",
    imageId: "11485",
    sad: "s00000021918003",
    mat: "4B7SGZ+30YFKI+4P4C+HVNAP",
    impressionUrl: "https://www18.a8.net/0.gif?a8mat=4B7SGZ+30YFKI+4P4C+HVNAP",
  },
};

// ---- 姉妹サイト(別テーマの困りごとへの誘導) ----
export const SISTER_SITES = [
  {
    label: "やさしい介護ナビ",
    description: "引っ越し先でも介護は続きます。あんしんの手続きガイド",
    url: "https://kaigo-anshin.net",
    emoji: "🩷",
  },
];
