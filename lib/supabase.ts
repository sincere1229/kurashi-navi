import { createClient } from "@supabase/supabase-js";

// サーバー側(APIルート)専用のクライアント。
// service role keyはブラウザに絶対出さないこと(NEXT_PUBLIC_を付けない)。
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が設定されていません");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

// 環境変数が揃っているかの簡易チェック(APIルートで早期リターンに使う)
export function isSupabaseConfigured(): boolean {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
