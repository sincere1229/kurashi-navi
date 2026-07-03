import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// LINE公式アカウントの友だち追加・メッセージ受信を処理するWebhook。
// LINE Developersコンソールの「Webhook URL」に
// https://kurashi-navi.com/api/line/webhook を設定してください。
export async function POST(req: NextRequest) {
  const secret = process.env.LINE_CHANNEL_SECRET;
  const bodyText = await req.text();

  // 署名検証(なりすまし防止)
  if (secret) {
    const signature = req.headers.get("x-line-signature") ?? "";
    const hash = crypto.createHmac("sha256", secret).update(bodyText).digest("base64");
    if (hash !== signature) {
      return NextResponse.json({ error: "invalid signature" }, { status: 401 });
    }
  }

  // 現状は受信のみ(友だち追加時点ではまだLIFFログインしていないため、
  // ユーザー特定・登録はチェックリスト画面の「LINEに登録する」ボタン経由で行う)
  // 将来的にテキストコマンド(例:「進捗」と送ると現在の達成率を返す)等を
  // ここに実装できます。

  try {
    JSON.parse(bodyText); // 形式チェックのみ
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
