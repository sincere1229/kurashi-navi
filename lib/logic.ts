import { TASKS, Task, DeadlineType, DEADLINE_ORDER } from "./taskMaster";

export type Answers = {
  A: string; B: string; C: string; D: string; E: string;
  F: string[]; // 子どもは複数選択
  movingDate: string; // "YYYY-MM-DD" or ""(未定)
};

export type UserTask = {
  taskId: string;
  status: "incomplete" | "done";
  completedAt?: string;
};

export type CitySelection = {
  departurePref?: string;
  departureCity?: string;
  destPref?: string;
  destCity?: string;
};

export type SavedState = { answers: Answers; userTasks: UserTask[]; cities?: CitySelection };

const STORAGE_KEY = "kurashi_navi_v1";

// ---- 条件マッチング(外側AND・内側OR) ----
export function matchCondition(condition: string[][], answers: Answers): boolean {
  const codes = new Set([answers.A, answers.B, answers.C, answers.D, answers.E, ...answers.F]);
  return condition.every((orGroup) => orGroup.some((code) => codes.has(code)));
}

export function generateChecklist(answers: Answers): UserTask[] {
  return TASKS.filter((t) => matchCondition(t.condition, answers)).map((t) => ({
    taskId: t.id,
    status: "incomplete" as const,
  }));
}

// ---- 期日計算 ----
const OFFSET: Record<DeadlineType, number> = {
  "D-30": -30, "D-14": -14, "D-7": -7, "D-1": -1, "D0": 0, "D+14": 14, "D+30": 30,
};

export function dueDateOf(task: Task, movingDate: string): Date | null {
  if (!movingDate) return null;
  const d = new Date(movingDate + "T00:00:00");
  d.setDate(d.getDate() + OFFSET[task.deadline]);
  return d;
}

export function daysLeft(due: Date | null): number | null {
  if (!due) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((due.getTime() - today.getTime()) / 86400000);
}

export function fmtDate(d: Date): string {
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export function taskById(id: string): Task | undefined {
  return TASKS.find((t) => t.id === id);
}

export function sortDeadline(a: Task, b: Task): number {
  return DEADLINE_ORDER.indexOf(a.deadline) - DEADLINE_ORDER.indexOf(b.deadline);
}

// ---- localStorage ----
export function saveState(state: SavedState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}
export function loadState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedState) : null;
  } catch { return null; }
}

// ---- みのり:進捗連動メッセージ(仕様書第4章) ----
export function piyokoProgressMessage(doneCount: number, total: number, daysToMove: number | null): string {
  const rate = total === 0 ? 0 : doneCount / total;
  if (doneCount === 0) {
    return "まずは一番かんたんな1個から、いっしょにやってみよう!最初の1個がいちばんえらいんだよ🌱";
  }
  if (rate >= 1) return "全タスク完了…!!✨ あなたの新生活が、素敵なものになりますように。みのりはずっと応援してるよ💛";
  if (rate >= 0.75) return "もう75%!?はやすぎる…みのり、感動してる🥹 残りは仕上げだけだね!";
  if (rate >= 0.5) return "はんぶん終わったー!!🎊 折り返し地点だよ。がんばってるあなたに拍手👏";
  if (rate >= 0.25) return "4分の1クリア!いいペースだね。この調子なら余裕のある引っ越しになりそう🍀";
  if (daysToMove !== null && daysToMove <= 7 && daysToMove >= 0) {
    return `引っ越しまであと${daysToMove}日!ここからが役所ウィーク🏃 「役所に行く日」を先に決めちゃおう!`;
  }
  return "最初の1個、完了〜!🎉 この調子で、今日はもう1個だけいってみる?🌱";
}

export const PIYOKO_PRAISE = [
  "ナイス!ぽん、と「済」が押される音が気持ちいいね🌱",
  "1個へった!着実に進んでるよ、えらい🍀",
  "その調子!面倒なことから片づけられる人、尊敬です✨",
  "完了〜!ちょっとずつが、いちばん強いんだよ🌱",
];
