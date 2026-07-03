import { NextRequest, NextResponse } from "next/server";
import { verifyLineIdToken } from "@/lib/line";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

// LIFFログイン後、ブラウザ(localStorage)の診断結果・タスク状態をSupabaseに保存し、
// 以後このLINEアカウントで期日リマインドを受け取れるようにする。
export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "サーバー未設定です(Supabase)" }, { status: 503 });
  }

  const body = await req.json();
  const { idToken, answers, userTasks } = body as {
    idToken: string;
    answers: { A: string; B: string; C: string; D: string; E: string; F: string[]; movingDate: string };
    userTasks: { taskId: string; status: "incomplete" | "done" }[];
  };

  if (!idToken) {
    return NextResponse.json({ error: "idTokenが必要です" }, { status: 400 });
  }

  const verified = await verifyLineIdToken(idToken);
  if (!verified) {
    return NextResponse.json({ error: "LINEログインの検証に失敗しました" }, { status: 401 });
  }

  const supabase = supabaseAdmin();
  const { userId, displayName } = verified;

  // プロフィール(診断回答+引っ越し日)を保存
  await supabase.from("profiles").upsert({
    line_user_id: userId,
    display_name: displayName ?? null,
    answers,
    moving_date: answers.movingDate || null,
    updated_at: new Date().toISOString(),
  });

  // タスク状態を保存(既存分は一旦消してから入れ直す。シンプルさ優先)
  await supabase.from("user_tasks").delete().eq("line_user_id", userId);
  if (userTasks?.length) {
    await supabase.from("user_tasks").insert(
      userTasks.map((t) => ({
        line_user_id: userId,
        task_id: t.taskId,
        status: t.status,
        completed_at: t.status === "done" ? new Date().toISOString() : null,
      }))
    );
  }

  return NextResponse.json({ ok: true, userId });
}
