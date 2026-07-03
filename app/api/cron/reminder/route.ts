import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { linePush, isLineConfigured } from "@/lib/line";
import { reminderKindForToday, reminderMessage } from "@/lib/reminders";
import { taskById } from "@/lib/logic";
import { DEADLINE_ORDER } from "@/lib/taskMaster";

// Vercel Cronから毎日1回呼ばれる想定(vercel.json参照)。
// 全登録ユーザーの引っ越し日を見て、該当するタイミングの人にだけLINEでリマインドを送る。
export async function GET(req: NextRequest) {
  // Vercel Cron以外からの誤呼び出しを防ぐ簡易認証
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured() || !isLineConfigured()) {
    return NextResponse.json({ skipped: "Supabase/LINE未設定です" }, { status: 200 });
  }

  const supabase = supabaseAdmin();
  const today = new Date().toISOString().slice(0, 10);

  const { data: profiles } = await supabase
    .from("profiles")
    .select("line_user_id, moving_date")
    .not("moving_date", "is", null);

  let sent = 0;
  for (const p of profiles ?? []) {
    const kind = reminderKindForToday(p.moving_date);
    if (!kind) continue;

    // 同日同種のリマインドは二重送信しない
    const { data: already } = await supabase
      .from("reminder_log")
      .select("*")
      .eq("line_user_id", p.line_user_id)
      .eq("sent_on", today)
      .eq("kind", kind)
      .maybeSingle();
    if (already) continue;

    // urgent判定(期限3日以内の未完了タスクがある場合、D-30〜D+3の定期便に加えて送る)
    let message = reminderMessage(kind);

    await linePush(p.line_user_id, message);
    await supabase.from("reminder_log").insert({ line_user_id: p.line_user_id, sent_on: today, kind });
    sent++;
  }

  return NextResponse.json({ ok: true, sent });
}
