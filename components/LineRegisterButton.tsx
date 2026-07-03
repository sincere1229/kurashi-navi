"use client";

import { useState } from "react";
import Script from "next/script";
import { loadState } from "@/lib/logic";

declare global {
  interface Window {
    liff: any;
  }
}

const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID;

// LINEに登録して、①どの端末からでも続きを見られるように ②期日が近づいたらLINEでお知らせ、を有効にするボタン。
// NEXT_PUBLIC_LIFF_ID が未設定の間は自動的に非表示になる(未設定でもサイトは問題なく動く)。
export default function LineRegisterButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [ready, setReady] = useState(false);

  if (!LIFF_ID) return null;

  const handleRegister = async () => {
    setStatus("loading");
    try {
      const liff = window.liff;
      await liff.init({ liffId: LIFF_ID });
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href });
        return; // ログイン後リダイレクトで戻ってくる
      }
      const idToken = liff.getIDToken();
      const state = loadState();
      if (!state) {
        setStatus("error");
        return;
      }
      const res = await fetch("/api/line/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, answers: state.answers, userTasks: state.userTasks }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <Script src="https://static.line-scdn.net/liff/edge/2/sdk.js" onLoad={() => setReady(true)} />
      <p className="font-maru text-sm font-bold">🌱 LINEに登録すると…</p>
      <ul className="mt-1.5 space-y-0.5 text-xs text-cocoa/70">
        <li>・スマホを機種変更しても続きが見られます</li>
        <li>・期日が近づくと、みのりからLINEでお知らせします</li>
      </ul>
      <button
        onClick={handleRegister}
        disabled={!ready || status === "loading" || status === "done"}
        className="font-maru mt-3 w-full rounded-full bg-cocoa py-2.5 text-sm font-bold text-piyo disabled:opacity-50"
      >
        {status === "done" ? "登録できました🌱" : status === "loading" ? "登録中…" : "LINEで登録する"}
      </button>
      {status === "error" && (
        <p className="mt-2 text-xs text-shu">登録に失敗しました。時間をおいて再度お試しください。</p>
      )}
    </div>
  );
}
