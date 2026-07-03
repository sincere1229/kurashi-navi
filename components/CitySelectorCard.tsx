"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CitySelection, SavedState, saveState } from "@/lib/logic";
import DATA from "@/lib/municipalities.json";

type City = { p: string; c: string; k: string; u: string };
const PREFS: string[] = (DATA as any).prefs;
const CITIES: City[] = (DATA as any).cities;

// 転出元・転入先を任意入力してもらい、両方揃うと該当の手続きガイド(/guide)への
// 直リンクを表示する。診断フローには含めず、チェックリスト画面での後入力に対応。
export default function CitySelectorCard({
  state,
  onUpdate,
}: {
  state: SavedState;
  onUpdate: (next: SavedState) => void;
}) {
  const [open, setOpen] = useState(!!(state.cities?.departureCity || state.cities?.destCity));
  const cities = state.cities ?? {};

  const set = (patch: Partial<CitySelection>) => {
    const next: SavedState = { ...state, cities: { ...cities, ...patch } };
    onUpdate(next);
    saveState(next);
  };

  const departureCityOptions = useMemo(
    () => CITIES.filter((c) => c.p === cities.departurePref),
    [cities.departurePref]
  );
  const destCityOptions = useMemo(
    () => CITIES.filter((c) => c.p === cities.destPref),
    [cities.destPref]
  );

  const bothSet = cities.departurePref && cities.departureCity && cities.destPref && cities.destCity;

  return (
    <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between">
        <span className="font-maru text-sm font-bold">📍 転出元・転入先の街を登録する(任意)</span>
        <span className="text-cocoa/40">{open ? "▲" : "▼"}</span>
      </button>
      {!open && (
        <p className="mt-1 text-xs text-cocoa/60">登録すると、両方の街の手続きガイドに直接リンクできます</p>
      )}

      {open && (
        <div className="mt-3 space-y-4">
          <div>
            <p className="text-xs font-bold text-cocoa/70">転出元(今の住まい)</p>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              <select
                value={cities.departurePref ?? ""}
                onChange={(e) => set({ departurePref: e.target.value, departureCity: "" })}
                className="rounded-xl border-2 border-piyo bg-cream p-2.5 text-sm"
              >
                <option value="">都道府県</option>
                {PREFS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <select
                value={cities.departureCity ?? ""}
                onChange={(e) => set({ departureCity: e.target.value })}
                disabled={!cities.departurePref}
                className="rounded-xl border-2 border-piyo bg-cream p-2.5 text-sm disabled:opacity-40"
              >
                <option value="">市区町村</option>
                {departureCityOptions.map((c) => <option key={c.c} value={c.c}>{c.c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-cocoa/70">転入先(新しい住まい)</p>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              <select
                value={cities.destPref ?? ""}
                onChange={(e) => set({ destPref: e.target.value, destCity: "" })}
                className="rounded-xl border-2 border-piyo bg-cream p-2.5 text-sm"
              >
                <option value="">都道府県</option>
                {PREFS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <select
                value={cities.destCity ?? ""}
                onChange={(e) => set({ destCity: e.target.value })}
                disabled={!cities.destPref}
                className="rounded-xl border-2 border-piyo bg-cream p-2.5 text-sm disabled:opacity-40"
              >
                <option value="">市区町村</option>
                {destCityOptions.map((c) => <option key={c.c} value={c.c}>{c.c}</option>)}
              </select>
            </div>
          </div>

          {bothSet && (
            <div className="grid grid-cols-1 gap-2 border-t border-cocoa/10 pt-3">
              <Link
                href={`/guide/${encodeURIComponent(cities.departurePref!)}/${encodeURIComponent(cities.departureCity!)}/tenshutu-tennyu`}
                className="rounded-xl bg-piyo/25 p-3 text-sm"
              >
                📤 {cities.departureCity}の転出手続きガイドを見る →
              </Link>
              <Link
                href={`/guide/${encodeURIComponent(cities.destPref!)}/${encodeURIComponent(cities.destCity!)}/tenshutu-tennyu`}
                className="rounded-xl bg-piyo/25 p-3 text-sm"
              >
                📥 {cities.destCity}の転入手続きガイドを見る →
              </Link>
              <Link
                href={`/guide/${encodeURIComponent(cities.destPref!)}/${encodeURIComponent(cities.destCity!)}/gomi-bunbetsu`}
                className="rounded-xl bg-piyo/25 p-3 text-sm"
              >
                🗑 {cities.destCity}のゴミ分別ガイドを見る →
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
