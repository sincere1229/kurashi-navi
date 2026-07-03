import { SISTER_SITES } from "@/lib/affiliates";

// 別テーマの困りごとへの誘導(姉妹サイトへのリンク)
export default function SisterSiteCard() {
  if (SISTER_SITES.length === 0) return null;
  return (
    <section className="mt-6 space-y-2">
      {SISTER_SITES.map((s) => (
        <a
          key={s.label}
          href={s.url}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition active:scale-95"
        >
          <span className="text-2xl">{s.emoji}</span>
          <span className="min-w-0">
            <span className="font-maru block font-bold">{s.label}</span>
            <span className="block text-xs text-cocoa/60">{s.description}</span>
          </span>
          <span className="ml-auto shrink-0 text-cocoa/40">›</span>
        </a>
      ))}
    </section>
  );
}
