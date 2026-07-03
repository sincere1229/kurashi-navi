// LINE Messaging API / LIFF 連携ヘルパー
// 必要な環境変数:
//   LINE_CHANNEL_ACCESS_TOKEN … Messaging APIチャネルの長期アクセストークン
//   NEXT_PUBLIC_LIFF_ID        … LIFFアプリID(クライアント側で使用)

export function isLineConfigured(): boolean {
  return !!process.env.LINE_CHANNEL_ACCESS_TOKEN;
}

// LINEに1通プッシュメッセージを送る
export async function linePush(lineUserId: string, text: string): Promise<void> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) throw new Error("LINE_CHANNEL_ACCESS_TOKEN が設定されていません");

  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      to: lineUserId,
      messages: [{ type: "text", text }],
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LINE push failed: ${res.status} ${body}`);
  }
}

// LIFFのIDトークンを検証し、LINEユーザーIDと表示名を取り出す
// (LIFF Login Channel IDが必要。LINE Developersコンソールで確認できます)
export async function verifyLineIdToken(
  idToken: string
): Promise<{ userId: string; displayName?: string } | null> {
  const channelId = process.env.LINE_LOGIN_CHANNEL_ID;
  if (!channelId) throw new Error("LINE_LOGIN_CHANNEL_ID が設定されていません");

  const res = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ id_token: idToken, client_id: channelId }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return { userId: data.sub, displayName: data.name };
}
