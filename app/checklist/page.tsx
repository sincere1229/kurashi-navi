"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Minori from "@/components/Minori";
import OfferBox from "@/components/OfferBox";
import SisterSiteCard from "@/components/SisterSiteCard";
import LineRegisterButton from "@/components/LineRegisterButton";
import { MAIN_OFFERS } from "@/lib/affiliates";
import { DEADLINE_LABEL, DEADLINE_ORDER, Task } from "@/lib/taskMaster";
import {
  SavedState, daysLeft, dueDateOf, fmtDate, loadState, piyokoProgressMessage,
  PIYOKO_PRAISE, saveState, sortDeadline, taskById,
} from "@/lib/logic";

const CATEGORIES = ["すべて", "役所", "ライフライン", "住まい", "車・免許", "ペット", "子ども", "お金・契約", "当日作業"] as const;

export default function Checklist() {
  const [state, setState] = useState<SavedState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("すべて");
  const [hideDone, setHideDone] = useState(false);
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const [praise, setPraise] = useState<string | null>(null);

  useEffect(() => {
    setState(loadState());
    setLoaded(true);
  }, []);

  const movingDate = state?.answers.movingDate ?? "";
  const daysToMove = useMemo(() => {
    if (!movingDate) return null;
    return daysLeft(new Date(movingDate + "T00:00:00"));
  }, [movingDate]);

  const tasks = useMemo(() => {
    if (!state) return [];
    return state.userTasks
      .map((ut) => ({ ut, task: taskById(ut.taskId)! }))
      .filter(({ task }) => !!task)
      .filter(({ task }) => filter === "すべて" || task.category === filter)
      .filter(({ ut }) => !hideDone || ut.status !== "done")
      .sort((a, b) => sortDeadline(a.task, b.task));
  }, [state, filter, hideDone]);

  const doneCount = state?.userTasks.filter((t) => t.status === "done").length ?? 0;
  const total = state?.userTasks.length ?? 0;
  const rate = total ? Math.round((doneCount / total) * 100) : 0;

  const toggle = (taskId: string) => {
    if (!state) return;
    const next: SavedState = {
      ...state,
      userTasks: state.userTasks.map((t) =>
        t.taskId === taskId
          ? t.status === "done"
            ? { ...t, status: "incomplete" as const, completedAt: undefined }
            : { ...t, status: "done" as const, completedAt: new Date().toISOString() }
          : t
      ),
    };
    const nowDone = next.userTasks.find((t) => t.taskId === taskId)?.status === "done";
    setState(next);
    saveState(next);
    if (nowDone) {
      setPraise(PIYOKO_PRAISE[Math.floor(Math.random() * PIYOKO_PRAISE.length)]);
      setTimeout(() => setPraise(null), 2500);
    }
  };

  if (!loaded) return null;

  if (!state || state.userTasks.length === 0) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 text-center">
        <Minori size={150} variant="main" />
        <p className="font-maru mt-4 text-lg font-bold">まだリストがないみたい🌱</p>
        <p className="mt-2 text-sm text-cocoa/70">60秒の診断で、あなた専用のやることリストを作ろう!</p>
        <Link href="/" className="font-maru mt-6 rounded-full bg-cocoa px-8 py-3 font-bold text-piyo">診断をはじめる</Link>
      </main>
    );
  }

  // 期日区分ごとにグループ化
  const groups = DEADLINE_ORDER.map((d) => ({
    deadline: d,
    items: tasks.filter(({ task }) => task.deadline === d),
  })).filter((g) => g.items.length > 0);

  return (
    <main className="mx-auto max-w-md px-5 pb-24">
      {/* ヘッダー */}
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-lg font-black">暮らしナビ🏠</Link>
        <Link href="/" className="text-xs text-cocoa/60 underline">診断をやり直す</Link>
      </header>

      {/* みのり吹き出し+カウントダウン */}
      <section className="flex items-start gap-3">
        <div className="shrink-0"><Minori size={64} /></div>
        <div className="relative bubble rounded-2xl bg-white p-3 text-sm shadow-sm">
          {daysToMove !== null && daysToMove >= 0 && (
            <p className="font-maru font-bold">引っ越しまで あと{daysToMove}日!</p>
          )}
          <p className="mt-1">{piyokoProgressMessage(doneCount, total, daysToMove)}</p>
        </div>
      </section>

      {/* 進捗バー */}
      <section className="mt-4">
        <div className="flex items-end justify-between">
          <span className="font-maru text-sm font-bold">達成率 {rate}%</span>
          <span className="text-xs text-cocoa/60">{doneCount}/{total} 完了</span>
        </div>
        <div className="mt-1 h-3 overflow-hidden rounded-full bg-cocoa/10">
          <div className="h-full rounded-full bg-piyodeep transition-all duration-500" style={{ width: `${rate}%` }} />
        </div>
        <p className="mt-2 text-[11px] text-cocoa/50">
          💾 このリストはこの端末に保存されています。次に開いた時もそのまま続きから見られます。
        </p>
      </section>

      <div className="mt-3">
        <LineRegisterButton />
      </div>

      {/* フィルタ */}
      <section className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`font-maru shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition ${
              filter === c ? "bg-cocoa text-piyo" : "bg-white text-cocoa/70 shadow-sm"
            }`}
          >
            {c}
          </button>
        ))}
      </section>
      <label className="mt-2 flex items-center gap-2 text-xs text-cocoa/70">
        <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} className="accent-piyodeep" />
        未完了だけ表示
      </label>

      {/* タスクリスト(期日区分ごと) */}
      {groups.map((g) => (
        <section key={g.deadline} className="mt-6">
          <h2 className="font-maru text-sm font-bold text-cocoa/80">{DEADLINE_LABEL[g.deadline]}</h2>
          <div className="mt-2 space-y-2">
            {g.items.map(({ ut, task }) => {
              const due = dueDateOf(task, movingDate);
              const left = daysLeft(due);
              const urgent = ut.status === "incomplete" && left !== null && left <= 3 && left >= 0;
              const done = ut.status === "done";
              return (
                <div
                  key={task.id}
                  className={`relative flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition ${done ? "opacity-60" : ""} ${urgent ? "ring-2 ring-shu/60" : ""}`}
                >
                  <button
                    onClick={() => toggle(task.id)}
                    aria-label={done ? "未完了に戻す" : "完了にする"}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 ${done ? "border-shu" : "border-cocoa/25"}`}
                  >
                    {done && (
                      <span className="stamp font-maru select-none text-sm font-black text-shu">済</span>
                    )}
                  </button>
                  <button onClick={() => setOpenTask(task)} className="min-w-0 flex-1 text-left">
                    <p className={`font-bold leading-snug ${done ? "line-through" : ""}`}>{task.name}</p>
                    <p className="mt-0.5 truncate text-xs text-cocoa/60">📍{task.place}</p>
                  </button>
                  <div className="shrink-0 text-right">
                    {due && !done && (
                      <>
                        <p className={`font-maru text-xs font-bold ${urgent ? "text-shu" : "text-cocoa/70"}`}>
                          {left !== null && left >= 0 ? `あと${left}日` : "期限すぎ⚠"}
                        </p>
                        <p className="text-[10px] text-cocoa/50">{fmtDate(due)}まで</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* PR枠(主砲:引っ越し直結・高単価) */}
      <OfferBox title="🚚 引っ越し準備に役立つサービス" offers={MAIN_OFFERS} />

      {/* コラムへの導線 */}
      <Link
        href="/column"
        className="mt-3 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition active:scale-95"
      >
        <span className="text-2xl">📖</span>
        <span>
          <span className="font-maru block font-bold">お役立ちコラムを読む</span>
          <span className="block text-xs text-cocoa/60">ゴミ・車・電気・ガスの「得する話」</span>
        </span>
        <span className="ml-auto text-cocoa/40">›</span>
      </Link>

      {/* 地域情報への導線 */}
      <Link
        href="/area"
        className="mt-6 flex items-center gap-3 rounded-2xl bg-piyo/25 p-4 transition active:scale-95"
      >
        <span className="text-2xl">📍</span>
        <span>
          <span className="font-maru block font-bold">引っ越し先の町を予習する</span>
          <span className="block text-xs text-cocoa/60">ゴミ分別・休日診療・子育て支援など(全国対応)</span>
        </span>
        <span className="ml-auto text-cocoa/40">›</span>
      </Link>

      <SisterSiteCard />

      {/* 褒めトースト */}
      {praise && (
        <div className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl bg-cocoa p-3 text-center text-sm font-bold text-piyo shadow-xl">
          🌱 {praise}
        </div>
      )}

      {/* タスク詳細モーダル */}
      {openTask && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-cocoa/40" onClick={() => setOpenTask(null)}>
          <div
            className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-cream p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-cocoa/20" />
            <h3 className="font-maru text-lg font-bold">{openTask.name}</h3>
            <p className="mt-1 text-xs text-cocoa/60">{DEADLINE_LABEL[openTask.deadline]}</p>

            <div className="mt-4 rounded-2xl bg-white p-4">
              <p className="font-maru text-sm font-bold">📍 どこで?</p>
              <p className="mt-1 text-sm">{openTask.place}</p>
            </div>

            {openTask.docs.length > 0 && (
              <div className="mt-3 rounded-2xl bg-white p-4">
                <p className="font-maru text-sm font-bold">📄 持ち物チェック</p>
                <ul className="mt-2 space-y-1">
                  {openTask.docs.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm"><span>☐</span>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-3 rounded-2xl bg-piyo/25 p-4">
              <p className="font-maru text-sm font-bold">🌱 みのりのアドバイス</p>
              <p className="mt-1 text-sm leading-relaxed">{openTask.advice}</p>
            </div>

            <button
              onClick={() => { toggle(openTask.id); setOpenTask(null); }}
              className="font-maru mt-5 w-full rounded-full bg-cocoa py-3.5 font-bold text-piyo"
            >
              {state.userTasks.find((t) => t.taskId === openTask.id)?.status === "done" ? "未完了にもどす" : "完了にする(済)"}
            </button>
            <button onClick={() => setOpenTask(null)} className="mt-3 w-full text-sm text-cocoa/60">とじる</button>
          </div>
        </div>
      )}
    </main>
  );
}
