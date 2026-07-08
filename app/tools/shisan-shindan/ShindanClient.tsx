"use client";

import { useState } from "react";
import Minori from "@/components/Minori";

/* ============================================================
   わたしの資産タイプ診断 — 暮らしナビ
   設計書 v1.0 準拠（ゲート判定 → スコア → 安全側調整）
   ============================================================ */

/* ---------- リンク管理（差し替えはここだけ） ---------- */
const LINKS = {
  // ★ A8リンクに差し替えてください
  fpSoudan: {
    label: "FP無料相談を予約する",
    url: "https://px.a8.net/svt/ejp?a8mat=XXXXXXXX", // ★A8: マネードクター系
    note: "お金の悩みを無料でプロに相談",
  },
  shoken: {
    label: "ネット証券の口座開設を見る",
    url: "https://px.a8.net/svt/ejp?a8mat=YYYYYYYY", // ★A8: SBI証券 or 楽天証券
    note: "NISA対応のネット証券",
  },
  // 公式リンク（※URLは公開前に要確認）
  fsaGuide: {
    label: "金融庁：基礎から学べる金融ガイド",
    url: "https://www.fsa.go.jp/teach/kou3.html",
  },
  yokinHoken: {
    label: "預金保険機構（公式）",
    url: "https://www.dic.go.jp/",
  },
  nisa: {
    label: "金融庁：NISA特設ウェブサイト",
    url: "https://www.fsa.go.jp/policy/nisa2/",
  },
  toshiJikan: {
    label: "日本証券業協会：投資の時間",
    url: "https://www.jsda.or.jp/jikan/",
  },
  // 内部リンク（★暮らしナビの実パスに合わせて調整）
  bouei: { label: "おひとりさま防衛編を読む", url: "/column" },
  mushoku: { label: "無職防衛編を読む", url: "/column" },
  kaigo: { label: "介護・実家のお金の記事を読む", url: "/goods/care" },
  souzoku: { label: "相続の準備を知る", url: "/lp/souzoku" },
};

/* ---------- 設問データ ---------- */
type Option = { label: string; value: string; score?: number };
type Question = {
  id: string;
  text: string;
  minori: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "age",
    text: "年代を教えてください",
    minori: "まずは基本からお聞きしますね。年代によって、時間がどれだけ味方になるかが変わるんです🍀",
    options: [
      { label: "30代以下", value: "a1", score: 4 },
      { label: "40代", value: "a2", score: 3 },
      { label: "50代", value: "a3", score: 2 },
      { label: "60代", value: "a4", score: 1 },
      { label: "70代以上", value: "a5", score: 0 },
    ],
  },
  {
    id: "family",
    text: "家族構成に近いものは？",
    minori: "ご家族のかたちによって、備え方も少しずつ違ってくるんですよ。",
    options: [
      { label: "おひとりさま", value: "f1" },
      { label: "夫婦のみ", value: "f2" },
      { label: "子育て中", value: "f3" },
      { label: "親の介護・実家の悩みあり", value: "f4" },
    ],
  },
  {
    id: "asset",
    text: "貯蓄・資産の総額は？（ざっくりでOK）",
    minori: "正確でなくて大丈夫です。だいたいの感覚で選んでくださいね🍀",
    options: [
      { label: "100万円未満", value: "s1" },
      { label: "100〜500万円", value: "s2" },
      { label: "500〜1,500万円", value: "s3" },
      { label: "1,500〜3,000万円", value: "s4" },
      { label: "3,000万円以上", value: "s5" },
    ],
  },
  {
    id: "monthly",
    text: "毎月、貯蓄や運用に回せる金額は？",
    minori: "無理のない範囲で考えるのが、長続きのコツです。",
    options: [
      { label: "ほぼない", value: "m1" },
      { label: "〜1万円", value: "m2" },
      { label: "1〜3万円", value: "m3" },
      { label: "3〜5万円", value: "m4" },
      { label: "5万円以上", value: "m5" },
    ],
  },
  {
    id: "exp",
    text: "投資の経験はありますか？",
    minori: "経験がなくてもまったく問題ありません。正直に選んでくださいね🍀",
    options: [
      { label: "まったくない", value: "e1", score: 0 },
      { label: "NISAなどを少しだけ", value: "e2", score: 1 },
      { label: "数年やっている", value: "e3", score: 2 },
      { label: "株や投資信託を積極的に", value: "e4", score: 3 },
    ],
  },
  {
    id: "risk",
    text: "もし資産が一時的に2割減ったら？",
    minori: "ここは大切な質問です。ご自身の気持ちに正直になってみてください。",
    options: [
      { label: "夜も眠れない", value: "r1", score: 0 },
      { label: "かなり不安になる", value: "r2", score: 1 },
      { label: "少し気になる程度", value: "r3", score: 2 },
      { label: "長期なら気にしない", value: "r4", score: 3 },
    ],
  },
  {
    id: "goal",
    text: "お金のいちばんの目的は？",
    minori: "最後の質問です。あなたの『なんのため』を教えてください🍀",
    options: [
      { label: "当面の生活を守る", value: "g1", score: 0 },
      { label: "老後資金づくり", value: "g2", score: 1 },
      { label: "子や孫に遺す・相続の準備", value: "g3", score: 1 },
      { label: "増やして楽しみたい", value: "g4", score: 3 },
    ],
  },
];

/* ---------- 判定ロジック（純関数） ---------- */
type Answers = Record<string, string>;
type TypeKey = "type1" | "type2" | "type3" | "type4" | "type5";

function isGate(ans: Answers): boolean {
  if (ans.asset === "s1") return true; // 100万円未満 → 即タイプ1
  if (ans.monthly === "m1" && ans.asset === "s2") return true; // 余力なし×〜500万
  return false;
}

function calcScore(ans: Answers): number {
  let total = 0;
  for (const q of QUESTIONS) {
    const opt = q.options.find((o) => o.value === ans[q.id]);
    if (opt?.score !== undefined) total += opt.score;
  }
  return total;
}

function judge(ans: Answers): TypeKey {
  if (isGate(ans)) return "type1";
  const score = calcScore(ans);
  let type: TypeKey;
  if (score <= 3) type = "type2";
  else if (score <= 7) type = "type3";
  else if (score <= 10) type = "type4";
  else type = "type5";
  // 安全側調整：「夜も眠れない」は1段階引き下げ
  if (ans.risk === "r1") {
    if (type === "type5") type = "type4";
    else if (type === "type4") type = "type3";
  }
  return type;
}

/* ---------- 結果データ ---------- */
type LinkItem = { label: string; url: string; note?: string };
type ResultDef = {
  emoji: string;
  name: string;
  catch: string;
  body: string;
  steps: string[];
  revenue: LinkItem | null; // 収益リンクは最大1本
  official: LinkItem; // 公式リンク1本
};

const RESULTS: Record<TypeKey, ResultDef> = {
  type1: {
    emoji: "🛡️",
    name: "生活防衛ファースト型",
    catch: "いまは「増やす」より「守る」とき。それは正しい判断です。",
    body: "あなたの回答からは、まず毎日の暮らしの土台を固める時期だと読み取れます。焦って運用を始める必要はまったくありません。生活費の3〜6か月分の「生活防衛資金」を先に確保することが、どんな投資よりも確実にあなたを守ります。",
    steps: [
      "家計の固定費を見直す（通信費・保険・サブスク）",
      "生活防衛資金（生活費3〜6か月分）を普通預金で確保する",
      "使える公的制度を確認する（国民年金の免除・猶予、住居確保給付金など）",
    ],
    revenue: null, // 非収益タイプ
    official: LINKS.fsaGuide,
  },
  type2: {
    emoji: "🏦",
    name: "守りの貯蓄型",
    catch: "減らさないことが最優先。あなたの堅実さは強みです。",
    body: "大きなリスクは取りたくない、でもお金のことはきちんとしておきたい——そんなあなたに合うのは「守りながら少しだけ働いてもらう」考え方です。元本保証のある預金を軸に、金利や制度をうまく使うだけでも差がつきます。",
    steps: [
      "金利の高いネット銀行の定期預金・普通預金を知る",
      "個人向け国債（変動10年）などの低リスク商品を知る",
      "預金保険制度（1金融機関あたり1,000万円まで保護）の仕組みを理解する",
    ],
    revenue: LINKS.fpSoudan,
    official: LINKS.yokinHoken,
  },
  type3: {
    emoji: "🌱",
    name: "コツコツ積立型",
    catch: "時間を味方につける、いちばん再現性の高いスタイル。",
    body: "毎月決まった額を長く積み立てる——派手さはありませんが、多くの人にとって現実的で続けやすい方法です。国が用意した非課税制度（NISA・iDeCo）は、まさにこのスタイルのためにあります。まずは制度の中身を正しく知るところから。",
    steps: [
      "新NISA（つみたて投資枠：年120万円まで非課税）の仕組みを知る",
      "iDeCo（掛金が全額所得控除。原則60歳まで引き出せない点に注意）を知る",
      "少額（月5,000円〜1万円）から始めて値動きに慣れる",
    ],
    revenue: LINKS.shoken,
    official: LINKS.nisa,
  },
  type4: {
    emoji: "⚖️",
    name: "バランス型",
    catch: "守りと攻めの配分を、自分の言葉で決められる人。",
    body: "あなたはある程度の経験や余裕があり、「全部貯金」でも「全部投資」でもない中間を探しているタイプです。大切なのは配分（アセットアロケーション）の考え方。年代・目的・値下がり耐性から自分なりの割合を決めると、相場に振り回されにくくなります。",
    steps: [
      "預金・債券・株式（投資信託）の配分の考え方を学ぶ",
      "新NISAの成長投資枠とつみたて投資枠の使い分けを知る",
      "年1回の「配分の点検（リバランス）」を習慣にする",
    ],
    revenue: LINKS.fpSoudan,
    official: LINKS.nisa,
  },
  type5: {
    emoji: "🚀",
    name: "積極運用型",
    catch: "リスクを理解した上で、攻める準備ができている人。",
    body: "経験も下落耐性もあるあなたなら、選択肢は広がります。ただし積極型ほど大切なのは「ルールを先に決めること」。生活防衛資金には手をつけない、集中しすぎない——攻めの土台は守りです。",
    steps: [
      "新NISA成長投資枠（年240万円）の活用を検討する",
      "手数料（信託報酬）と分散の観点で商品を比較する",
      "損益通算・確定申告など税の基本を押さえる",
    ],
    revenue: LINKS.shoken,
    official: LINKS.toshiJikan,
  },
};

const DISCLAIMER_TOP =
  "※本診断は一般的な情報提供を目的としたもので、投資助言・推奨ではありません。金融商品の選択・購入はご自身の判断で行い、必要に応じてファイナンシャルプランナー等の専門家にご相談ください。";
const DISCLAIMER_BOTTOM =
  "本診断の結果は入力内容に基づく簡易的な分類です。実際の家計状況・税制・制度の適用条件は個々に異なります。制度の詳細は必ず公式サイトでご確認ください。";

/* ---------- コンポーネント ---------- */
export default function ShindanClient() {
  const [step, setStep] = useState(-1); // -1: intro, 0..6: 設問, 7: 結果
  const [answers, setAnswers] = useState<Answers>({});

  const total = QUESTIONS.length;

  const selectOption = (qid: string, value: string) => {
    const next = { ...answers, [qid]: value };
    setAnswers(next);
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      setStep(total); // 結果へ
      // GA4イベント（gtag導入済みの場合のみ発火）
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "shindan_complete", {
          shindan_name: "shisan",
          shindan_type: judge(next),
        });
      }
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(-1);
  };

  /* ----- イントロ ----- */
  if (step === -1) {
    return (
      <div className="mx-auto max-w-xl px-4 py-10">
        <p className="text-xs text-stone-500 mb-2">
          ホーム &gt; ツール &gt; わたしの資産タイプ診断
        </p>
        <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold text-teal-700 tracking-widest mb-2">
            かんたん7問・約1分
          </p>
          <h1 className="text-2xl font-bold text-stone-800 leading-snug">
            わたしの資産タイプ診断
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            あなたに合ったお金の守り方・育て方がわかる
          </p>
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-green-50 p-4">
            <div className="shrink-0">
              <Minori size={56} variant="smile" />
            </div>
            <p className="text-sm text-stone-700 leading-relaxed">
              「貯金だけでいいのかな？」「NISAって私に関係あるの？」——
              7つの質問に答えるだけで、あなたに合ったお金の守り方・育て方の
              タイプをご案内します🍀
            </p>
          </div>
          <button
            onClick={() => setStep(0)}
            className="mt-6 w-full rounded-xl bg-teal-700 py-3.5 text-white font-bold hover:bg-teal-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            診断をはじめる
          </button>
          <p className="mt-4 text-[11px] leading-relaxed text-stone-500">
            {DISCLAIMER_TOP}
          </p>
        </div>
      </div>
    );
  }

  /* ----- 設問 ----- */
  if (step < total) {
    const q = QUESTIONS[step];
    return (
      <div className="mx-auto max-w-xl px-4 py-10">
        {/* 進捗 */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-stone-500 mb-1">
            <span>質問 {step + 1} / {total}</span>
            <button
              onClick={() => setStep(step - 1 >= 0 ? step - 1 : -1)}
              className="underline hover:text-teal-700"
            >
              ひとつ戻る
            </button>
          </div>
          <div className="h-2 rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-teal-600 transition-all duration-300"
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <div className="shrink-0">
              <Minori size={44} variant="smile" />
            </div>
            <p className="text-xs text-stone-500 leading-relaxed pt-1">
              {q.minori}
            </p>
          </div>
          <h2 className="text-lg font-bold text-stone-800 mb-5">{q.text}</h2>
          <div className="flex flex-col gap-3">
            {q.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectOption(q.id, opt.value)}
                className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                  answers[q.id] === opt.value
                    ? "border-teal-600 bg-teal-50 text-teal-800"
                    : "border-stone-200 bg-white text-stone-700 hover:border-teal-400 hover:bg-teal-50/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ----- 結果 ----- */
  const type = judge(answers);
  const r = RESULTS[type];
  const showSouzoku = answers.goal === "g3";
  const familyLink =
    answers.family === "f1"
      ? LINKS.bouei
      : answers.family === "f4"
      ? LINKS.kaigo
      : null;

  const shareText = encodeURIComponent(
    `わたしの資産タイプは「${r.emoji} ${r.name}」でした！\n#暮らしナビ #資産タイプ診断`
  );
  const shareUrl = encodeURIComponent("https://kurashi-navi.com/tools/shisan-shindan");

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold text-teal-700 tracking-widest">
          あなたの資産タイプは…
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-4xl" aria-hidden>{r.emoji}</span>
          <h2 className="text-2xl font-bold text-stone-800">{r.name}</h2>
        </div>
        <p className="mt-3 text-sm font-semibold text-teal-800">{r.catch}</p>

        {/* 免責（結果直下・固定） */}
        <p className="mt-4 rounded-lg bg-stone-100 p-3 text-[11px] leading-relaxed text-stone-600">
          {DISCLAIMER_TOP}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-stone-700">{r.body}</p>

        <h3 className="mt-6 text-sm font-bold text-stone-800">
          一般的に検討されるステップ
        </h3>
        <ul className="mt-2 space-y-2">
          {r.steps.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-stone-700">
              <span className="text-teal-600 font-bold shrink-0">✓</span>
              <span className="leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>

        {/* リンク：収益1本（PR表記）＋公式1本 */}
        <div className="mt-7 space-y-3">
          {r.revenue && (
            <a
              href={r.revenue.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block rounded-xl border-2 border-teal-600 bg-teal-700 p-4 text-center hover:bg-teal-800 transition-colors"
            >
              <span className="inline-block rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold text-white mb-1">
                PR
              </span>
              <span className="block font-bold text-white">
                {r.revenue.label}
              </span>
              {r.revenue.note && (
                <span className="block text-xs text-teal-100 mt-1">
                  {r.revenue.note}
                </span>
              )}
            </a>
          )}
          <a
            href={r.official.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-stone-300 bg-white p-4 text-center text-sm font-bold text-stone-700 hover:border-teal-500 hover:text-teal-700 transition-colors"
          >
            🏛️ {r.official.label} ↗
          </a>
        </div>

        {/* 内部リンク（家族構成・相続フラグ） */}
        {(familyLink || showSouzoku) && (
          <div className="mt-6 rounded-xl bg-green-50 p-4">
            <p className="flex items-center gap-2 text-xs text-stone-600 mb-2">
              <span className="shrink-0">
                <Minori size={36} variant="smile" />
              </span>
              <span>あなたには、こちらの記事もお役に立つと思います🍀</span>
            </p>
            <div className="flex flex-col gap-2">
              {familyLink && (
                <a
                  href={familyLink.url}
                  className="text-sm font-semibold text-teal-700 underline underline-offset-2 hover:text-teal-900"
                >
                  → {familyLink.label}
                </a>
              )}
              {showSouzoku && (
                <a
                  href={LINKS.souzoku.url}
                  className="text-sm font-semibold text-teal-700 underline underline-offset-2 hover:text-teal-900"
                >
                  → {LINKS.souzoku.label}
                </a>
              )}
            </div>
          </div>
        )}

        {/* シェア・再診断 */}
        <div className="mt-7 flex gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-xl bg-stone-800 py-3 text-center text-sm font-bold text-white hover:bg-stone-900 transition-colors"
          >
            結果をXでシェア
          </a>
          <button
            onClick={restart}
            className="flex-1 rounded-xl border border-stone-300 py-3 text-sm font-bold text-stone-600 hover:border-teal-500 hover:text-teal-700 transition-colors"
          >
            もう一度診断する
          </button>
        </div>

        {/* 免責（末尾・固定） */}
        <p className="mt-6 border-t border-stone-200 pt-4 text-[11px] leading-relaxed text-stone-500">
          {DISCLAIMER_BOTTOM}
        </p>
      </div>
    </div>
  );
}
