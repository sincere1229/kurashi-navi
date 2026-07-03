"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Minori from "@/components/Minori";
import { Answers, generateChecklist, saveState } from "@/lib/logic";

type Option = { code: string; emoji: string; label: string };
type Question = { key: keyof Pick<Answers, "A" | "B" | "C" | "D" | "E"> | "F"; title: string; multi?: boolean; options: Option[] };

const QUESTIONS: Question[] = [
  {
    key: "A", title: "どなたで引っ越しますか?",
    options: [
      { code: "A1", emoji: "🧑", label: "ひとりで(単身)" },
      { code: "A2", emoji: "👨‍👩‍👧", label: "家族で" },
      { code: "A3", emoji: "🏠🏠", label: "二世帯で" },
    ],
  },
  {
    key: "B", title: "引っ越し先はどこですか?",
    options: [
      { code: "B1", emoji: "📍", label: "同じ市区町村内" },
      { code: "B2", emoji: "🚃", label: "別の市区町村へ" },
      { code: "B3", emoji: "🗾", label: "別の都道府県へ" },
    ],
  },
  {
    key: "C", title: "お車やバイクはお持ちですか?",
    options: [
      { code: "C1", emoji: "🚗", label: "車がある" },
      { code: "C2", emoji: "🛵", label: "バイク・原付のみ" },
      { code: "C3", emoji: "❌", label: "どちらもなし" },
    ],
  },
  {
    key: "D", title: "ペットはいますか?",
    options: [
      { code: "D1", emoji: "🐕", label: "犬" },
      { code: "D2", emoji: "🐈", label: "猫" },
      { code: "D3", emoji: "🐹", label: "その他(小動物・鳥など)" },
      { code: "D4", emoji: "❌", label: "いない" },
    ],
  },
  {
    key: "E", title: "今の家と、新しい家は?",
    options: [
      { code: "E1", emoji: "🏢➡🏢", label: "賃貸 → 賃貸" },
      { code: "E2", emoji: "🏠➡🏢", label: "持ち家 → 賃貸" },
      { code: "E3", emoji: "🏢➡🏡", label: "賃貸 → 新築・購入" },
      { code: "E4", emoji: "🏠➡🏡", label: "持ち家 → 持ち家" },
    ],
  },
  {
    key: "F", title: "お子さまはいますか?(あてはまるもの全部)", multi: true,
    options: [
      { code: "F1", emoji: "👶", label: "乳幼児(未就学)" },
      { code: "F2", emoji: "🎒", label: "小学生" },
      { code: "F3", emoji: "🏫", label: "中学生以上" },
      { code: "F4", emoji: "❌", label: "いない" },
    ],
  },
];

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(-1); // -1=LP, 0..5=質問, 6=日付入力
  const [answers, setAnswers] = useState<Answers>({ A: "", B: "", C: "", D: "", E: "", F: [], movingDate: "" });

  const taskCount = useMemo(
    () => (step === 6 ? generateChecklist(answers).length : 0),
    [step, answers]
  );

  const pick = (q: Question, code: string) => {
    if (q.multi) {
      setAnswers((prev) => {
        let next = prev.F.includes(code) ? prev.F.filter((c) => c !== code) : [...prev.F, code];
        if (code === "F4") next = ["F4"];
        else next = next.filter((c) => c !== "F4");
        return { ...prev, F: next };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [q.key]: code }));
      setStep((s) => s + 1);
    }
  };

  const finish = () => {
    const userTasks = generateChecklist(answers);
    saveState({ answers, userTasks });
    router.push("/checklist");
  };

  // ---------- LP ----------
  if (step === -1) {
    return (
      <main className="mx-auto max-w-md px-5 pb-16">
        <header className="flex items-center justify-between py-4">
          <span className="font-maru text-xl font-black">暮らしナビ<span className="text-piyodeep">🏠</span></span>
        </header>

        <section className="mt-6 text-center">
          <div className="mx-auto w-fit"><Minori size={170} variant="main" /></div>
          <p className="relative bubble mt-3 mx-auto w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
            引っ越し、なにから始めればいいかわからない…<br />を、ぜんぶ解決するよ!
          </p>
          <h1 className="font-maru mt-8 text-2xl font-black leading-relaxed">
            あなた専用の<br />
            <span className="bg-piyo px-2 rounded-lg">引っ越しやることリスト</span>を<br />
            60秒でつくります
          </h1>
          <button
            onClick={() => setStep(0)}
            className="font-maru mt-8 w-full rounded-full bg-cocoa py-4 text-lg font-bold text-piyo shadow-lg active:scale-95 transition"
          >
            ▶ 無料で診断をはじめる
          </button>
          <p className="mt-3 text-xs text-cocoa/60">登録不要・6つの質問に答えるだけ</p>
        </section>

        <section className="mt-14 space-y-4">
          <h2 className="font-maru text-lg font-bold">つかいかたは3ステップ</h2>
          {[
            ["1", "6つの質問にタップで回答", "世帯・移動先・車・ペット・住まい・お子さまの6つだけ"],
            ["2", "やることリストが自動生成", "あなたに必要な手続きだけを、期限順に並べます"],
            ["3", "みのりと一緒にチェック", "完了したら「済」のハンコ。期限が近いものはお知らせ"],
          ].map(([n, t, d]) => (
            <div key={n} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <span className="font-maru grid h-9 w-9 shrink-0 place-items-center rounded-full bg-piyo font-black">{n}</span>
              <div>
                <p className="font-bold">{t}</p>
                <p className="mt-1 text-sm text-cocoa/70">{d}</p>
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-16 border-t border-cocoa/10 pt-6 text-center text-xs text-cocoa/50">
          手続きの内容は自治体により異なる場合があります。最新情報は必ず各自治体の公式サイトでご確認ください。<br />
          <span className="mt-3 flex justify-center gap-4">
            <a href="/about" className="underline">運営者情報</a>
            <a href="/privacy" className="underline">プライバシーポリシー</a>
            <a href="/contact" className="underline">お問い合わせ</a>
          </span>
          <span className="mt-2 block">© 暮らしナビ</span>
        </footer>
      </main>
    );
  }

  // ---------- 日付入力(最終ステップ) ----------
  if (step === 6) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-8">
        <ProgressDots current={6} />
        <div className="mt-10 text-center">
          <Minori size={80} />
          <h2 className="font-maru mt-4 text-xl font-bold">引っ越し予定日は決まってる?</h2>
          <p className="mt-2 text-sm text-cocoa/70">期限のカウントダウンに使うよ(あとで変更OK)</p>
          <input
            type="date"
            value={answers.movingDate}
            onChange={(e) => setAnswers((p) => ({ ...p, movingDate: e.target.value }))}
            className="mt-6 w-full rounded-2xl border-2 border-piyo bg-white p-4 text-center text-lg"
          />
          <div className="mt-8 rounded-2xl bg-piyo/25 p-4">
            <p className="font-maru text-sm">あなたに必要な手続きは…</p>
            <p className="font-maru text-3xl font-black">{taskCount}<span className="text-base">個</span> みつかったよ🌱</p>
          </div>
          <button onClick={finish} className="font-maru mt-6 w-full rounded-full bg-cocoa py-4 text-lg font-bold text-piyo shadow-lg active:scale-95 transition">
            リストを見る
          </button>
          {!answers.movingDate && (
            <button onClick={finish} className="mt-3 text-sm text-cocoa/60 underline">日付は未定のまますすむ</button>
          )}
          <button onClick={() => setStep(5)} className="mt-6 block w-full text-sm text-cocoa/50">← もどる</button>
        </div>
      </main>
    );
  }

  // ---------- 質問ウィザード ----------
  const q = QUESTIONS[step];
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-8">
      <ProgressDots current={step} />
      <h2 className="font-maru mt-10 text-xl font-bold">
        Q{step + 1}. {q.title}
      </h2>
      <div className="mt-6 grid gap-3">
        {q.options.map((opt) => {
          const selected = q.multi ? answers.F.includes(opt.code) : false;
          return (
            <button
              key={opt.code}
              onClick={() => pick(q, opt.code)}
              className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left shadow-sm transition active:scale-95 ${
                selected ? "border-cocoa bg-piyo" : "border-transparent bg-white"
              }`}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className="font-bold">{opt.label}</span>
              {selected && <span className="ml-auto font-maru font-black">✓</span>}
            </button>
          );
        })}
      </div>
      {q.multi && (
        <button
          onClick={() => setStep(6)}
          disabled={answers.F.length === 0}
          className="font-maru mt-6 w-full rounded-full bg-cocoa py-4 font-bold text-piyo disabled:opacity-40"
        >
          つぎへ
        </button>
      )}
      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-cocoa/50">← もどる</button>
      )}
    </main>
  );
}

function ProgressDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <span key={i} className={`h-2 flex-1 rounded-full ${i <= current ? "bg-piyodeep" : "bg-cocoa/10"}`} />
      ))}
    </div>
  );
}
