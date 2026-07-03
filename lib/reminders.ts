import { Task } from "./taskMaster";
import { daysLeft, dueDateOf } from "./logic";

export type ReminderKind = "D-30" | "D-7" | "D-1" | "D0" | "D+3" | "urgent" | "inactive";

// 引っ越し予定日から見た「今日がどのタイミングか」を判定する
export function reminderKindForToday(movingDate: string): ReminderKind | null {
  if (!movingDate) return null;
  const left = daysLeft(new Date(movingDate + "T00:00:00"));
  if (left === null) return null;
  if (left === 30) return "D-30";
  if (left === 7) return "D-7";
  if (left === 1) return "D-1";
  if (left === 0) return "D0";
  if (left === -3) return "D+3";
  return null;
}

// 仕様書第4章のテンプレートに準拠したメッセージ本文
export function reminderMessage(kind: ReminderKind, opts: { urgentTasks?: Task[] } = {}): string {
  switch (kind) {
    case "D-30":
      return "引っ越しまで、ちょうど1ヶ月だね🌱\n今月の山場は「引っ越し業者の予約」と「賃貸の解約連絡」。この2つは早いほどお金も選択肢も得するから、今週中がおすすめだよ。";
    case "D-7":
      return "あと7日!ここからが役所ウィーク🏃\n転出届は平日しか受け付けてない役場が多いから、お仕事の予定と相談して「役所に行く日」を先に決めちゃおう。";
    case "D-1":
      return "いよいよ明日だね…!ここまで本当におつかれさま🌱\n今夜やるのは3つだけ。①冷蔵庫を空にする ②洗濯機の水抜き ③貴重品と転出証明書を手荷物バッグへ。";
    case "D0":
      return "引っ越し日和!🚚\n旧居を出る前に【ブレーカーOFF・窓の鍵・忘れ物】の最終チェック。新居では【ブレーカーON→水道の元栓→ガス立ち会い】の順だよ。";
    case "D+3":
      return "新しいおうちには慣れてきた?🌱\n引っ越しの本当のゴールは「転入届」。期限は引っ越しから14日以内だよ。ここまで来たらもうひと息!";
    case "urgent": {
      const names = (opts.urgentTasks ?? []).slice(0, 2).map((t) => t.name).join("・");
      return `「${names}」の期限が近づいてるよ🌱 平日に動ける日、確認しておくと安心です。`;
    }
    case "inactive":
      return "やっほ〜、みのりだよ🌱 最近リストを見てないみたい。忙しい時期だよね、今日は見るだけでもOK!";
  }
}

export function checklistUrl(): string {
  return "https://kurashi-navi.com/checklist";
}
