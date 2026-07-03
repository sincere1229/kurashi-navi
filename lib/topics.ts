// ============================================================
// SEOガイドページ用のトピックマスタ
// 「都市名 × このトピック」の組み合わせで /guide/[pref]/[city]/[topic] を生成する。
// taskIds は lib/taskMaster.ts の実データを参照し、内容の重複生成(スパム化)を避ける。
// ============================================================

export type Topic = {
  slug: string;
  label: string;        // ページタイトルに使う手続き名
  searchPhrase: string;  // 検索されやすい言い回し(例:「電気の住所変更」)
  emoji: string;
  taskIds: string[];     // lib/taskMaster.ts のタスクID(複数可)
  offerSlug: string;     // lib/affiliates.ts の COLUMN_OFFERS のキー
  intro: string;         // トピック共通の導入文(都市名は呼び出し側で差し込む)
};

export const TOPICS: Topic[] = [
  {
    slug: "tenshutu-tennyu",
    label: "転出届・転入届",
    searchPhrase: "転入届 転出届 手続き",
    emoji: "📋",
    taskIds: ["T001", "T003"],
    offerSlug: "moving",
    intro: "他の市区町村へ引っ越す場合、旧住所での「転出届」と新住所での「転入届」の2つの手続きが必要です。",
  },
  {
    slug: "tenkyo",
    label: "転居届",
    searchPhrase: "転居届 手続き",
    emoji: "📋",
    taskIds: ["T002"],
    offerSlug: "moving",
    intro: "同じ市区町村内で引っ越す場合は、転出届は不要で「転居届」のみで手続きが完了します。",
  },
  {
    slug: "mynumber",
    label: "マイナンバーカードの住所変更",
    searchPhrase: "マイナンバーカード 住所変更",
    emoji: "🪪",
    taskIds: ["T004"],
    offerSlug: "moving",
    intro: "マイナンバーカードの住所変更は、転入届・転居届と同じ窓口で同時に手続きできます。",
  },
  {
    slug: "kokuho",
    label: "国民健康保険の切り替え",
    searchPhrase: "国民健康保険 住所変更 手続き",
    emoji: "🏥",
    taskIds: ["T005"],
    offerSlug: "moving",
    intro: "国民健康保険に加入している方は、引っ越しにともなう資格の切り替え手続きが必要です。",
  },
  {
    slug: "jido-teate",
    label: "児童手当の住所変更",
    searchPhrase: "児童手当 住所変更 手続き",
    emoji: "👶",
    taskIds: ["T501"],
    offerSlug: "moving",
    intro: "児童手当は、引っ越しの翌日から15日以内に新住所の役場で手続きをすれば、支給が途切れません。",
  },
  {
    slug: "menkyo-jusho",
    label: "運転免許証の住所変更",
    searchPhrase: "免許 住所変更 手続き",
    emoji: "🚗",
    taskIds: ["T201"],
    offerSlug: "car",
    intro: "運転免許証の住所変更は、新住所を管轄する警察署または運転免許センターで手続きします。",
  },
  {
    slug: "shako-shomei",
    label: "車庫証明の取得",
    searchPhrase: "車庫証明 取得方法",
    emoji: "🅿️",
    taskIds: ["T202"],
    offerSlug: "parking",
    intro: "車を持っている方が他の市区町村へ引っ越す場合、車庫証明の取得が必要になります。",
  },
  {
    slug: "denki",
    label: "電気の住所変更",
    searchPhrase: "電気 引っ越し 手続き",
    emoji: "💡",
    taskIds: ["T105"],
    offerSlug: "electricity",
    intro: "電気の使用停止・開始手続きは、多くの場合Webで数分で完結します。",
  },
  {
    slug: "gas",
    label: "ガスの開栓・住所変更",
    searchPhrase: "ガス 引っ越し 開栓",
    emoji: "🔥",
    taskIds: ["T106"],
    offerSlug: "gas",
    intro: "ガスの開栓には係員の立ち会いが必要なため、早めの予約がおすすめです。",
  },
  {
    slug: "suido",
    label: "水道の使用開始",
    searchPhrase: "水道 引っ越し 手続き",
    emoji: "🚰",
    taskIds: ["T107"],
    offerSlug: "electricity",
    intro: "水道の使用開始・停止手続きは、自治体の水道局へ連絡します。",
  },
  {
    slug: "gomi-bunbetsu",
    label: "ゴミの分別・粗大ごみ",
    searchPhrase: "ゴミ 分別 粗大ごみ",
    emoji: "🗑",
    taskIds: ["T103"],
    offerSlug: "waste",
    intro: "自治体によってゴミの分別ルールや収集日が異なるため、引っ越し前後の確認が欠かせません。",
  },
  {
    slug: "tenko-tenen",
    label: "転校・転園手続き",
    searchPhrase: "転校 転園 手続き",
    emoji: "🎒",
    taskIds: ["T504", "T505"],
    offerSlug: "moving",
    intro: "お子さまがいる家庭は、転校・転園の手続きも引っ越しスケジュールに組み込む必要があります。",
  },
];

export function topicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}
