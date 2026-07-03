"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Minori from "@/components/Minori";
import OfferBox from "@/components/OfferBox";
import { AREA_OFFERS } from "@/lib/affiliates";
import DATA from "@/lib/municipalities.json";

type City = { p: string; c: string; k: string; u: string };
const PREFS: string[] = (DATA as any).prefs;
const CITIES: City[] = (DATA as any).cities;

const AREA_KEY = "kurashi_navi_area_v1";

// 「知りたいこと」→ Google検索リンクを自動生成(レベル1方式)
const TOPICS: { emoji: string; label: string; q: string }[] = [
  { emoji: "🗑", label: "ゴミの分別・収集日", q: "ゴミ 分別 収集日" },
  { emoji: "🏥", label: "休日・夜間診療", q: "休日診療 夜間 救急" },
  { emoji: "🏫", label: "学区・小中学校", q: "学区 小学校 通学区域" },
  { emoji: "👶", label: "子育て支援・手当", q: "子育て支援 児童手当 医療費助成" },
  { emoji: "🌊", label: "ハザードマップ", q: "ハザードマップ" },
  { emoji: "📋", label: "転入届・引っ越し手続き", q: "転入届 引っ越し 手続き" },
  { emoji: "🚌", label: "コミュニティバス・交通", q: "コミュニティバス 公共交通" },
  { emoji: "🛒", label: "スーパー・買い物", q: "スーパー", maps: true } as any,
];

function searchUrl(pref: string, city: string, q: string, maps?: boolean) {
  const query = encodeURIComponent(`${pref}${city} ${q}`);
  return maps
    ? `https://www.google.com/maps/search/${query}`
    : `https://www.google.com/search?q=${query}`;
}

export default function AreaPage() {
  const [pref, setPref] = useState("");
  const [city, setCity] = useState("");

  // 前回選択を復元
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AREA_KEY);
      if (saved) {
        const { p, c } = JSON.parse(saved);
        setPref(p ?? "");
        setCity(c ?? "");
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (pref && city) localStorage.setItem(AREA_KEY, JSON.stringify({ p: pref, c: city }));
    } catch {}
  }, [pref, city]);

  const cityOptions = useMemo(() => CITIES.filter((c) => c.p === pref), [pref]);
  const selected = useMemo(
    () => CITIES.find((c) => c.p === pref && c.c === city) ?? null,
    [pref, city]
  );

  return (
    <main className="mx-auto max-w-md px-5 pb-24">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-lg font-black">暮らしナビ🏠</Link>
        <Link href="/checklist" className="text-xs text-cocoa/60 underline">やることリストへ</Link>
      </header>

      <section className="flex items-start gap-3">
        <div className="shrink-0"><Minori size={64} /></div>
        <p className="relative bubble rounded-2xl bg-white p-3 text-sm shadow-sm">
          引っ越し先の町のこと、ちょっと予習しておこう!全国どこでも案内できるよ🌱
        </p>
      </section>

      {/* 自治体えらび */}
      <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
        <p className="font-maru text-sm font-bold">📍 引っ越し先はどこ?</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <select
            value={pref}
            onChange={(e) => { setPref(e.target.value); setCity(""); }}
            className="rounded-xl border-2 border-piyo bg-cream p-3 text-sm"
          >
            <option value="">都道府県</option>
            {PREFS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!pref}
            className="rounded-xl border-2 border-piyo bg-cream p-3 text-sm disabled:opacity-40"
          >
            <option value="">市区町村</option>
            {cityOptions.map((c) => <option key={c.c} value={c.c}>{c.c}</option>)}
          </select>
        </div>
      </section>

      {selected && (
        <>
          {/* 公式サイト(直リンク) */}
          {selected.u && (
            <a
              href={selected.u}
              target="_blank"
              rel="noopener"
              className="font-maru mt-4 flex items-center justify-center gap-2 rounded-full bg-cocoa py-3.5 font-bold text-piyo shadow active:scale-95 transition"
            >
              🏛 {selected.c}の公式サイトをひらく
            </a>
          )}

          {/* 知りたいことリンク */}
          <section className="mt-5">
            <h2 className="font-maru text-sm font-bold text-cocoa/80">🔎 {selected.c}のことを調べる</h2>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {TOPICS.map((t: any) => (
                <a
                  key={t.label}
                  href={searchUrl(selected.p, selected.c, t.q, t.maps)}
                  target="_blank"
                  rel="noopener"
                  className="rounded-2xl bg-white p-3 shadow-sm transition active:scale-95"
                >
                  <span className="text-xl">{t.emoji}</span>
                  <span className="mt-1 block text-sm font-bold leading-snug">{t.label}</span>
                </a>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-cocoa/50">
              各リンクは検索結果を開きます。制度の内容は必ず自治体の公式サイトでご確認ください。
            </p>
          </section>

          <OfferBox title="🌸 新生活のお得情報" offers={AREA_OFFERS} />
        </>
      )}
    </main>
  );
}
