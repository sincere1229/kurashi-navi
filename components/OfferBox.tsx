import { Affiliate } from "@/lib/affiliates";

// PR枠。urlが空の項目は表示しない(A8審査中でも安全に運用できる)
// bannerImageUrlがある案件は画像広告として、無ければテキストカードとして表示
// impressionUrlがある案件は、1×1の計測ピクセルを自動で埋め込む
export default function OfferBox({ title, offers }: { title: string; offers: Affiliate[] }) {
  const active = offers.filter((o) => o.url);
  if (active.length === 0) return null;
  return (
    <section className="mt-8 rounded-2xl border border-cocoa/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-maru text-sm font-bold">{title}</h2>
        <span className="rounded bg-cocoa/10 px-1.5 py-0.5 text-[10px] text-cocoa/60">PR</span>
      </div>
      <div className="mt-3 space-y-3">
        {active.map((o) =>
          o.bannerImageUrl ? (
            <a
              key={o.label}
              href={o.url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="block overflow-hidden rounded-xl border border-cocoa/10 transition active:scale-95"
            >
              <p className="bg-piyo/20 px-3 py-1.5 text-xs font-bold text-piyodeep">{o.label}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={o.bannerImageUrl}
                width={o.bannerWidth ?? 336}
                height={o.bannerHeight ?? 280}
                alt={o.label}
                className="mx-auto block h-auto w-full max-w-[336px]"
                loading="lazy"
              />
            </a>
          ) : (
            <a
              key={o.label}
              href={o.url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="flex items-center gap-3 rounded-xl bg-piyo/20 p-3 transition active:scale-95"
            >
              <span className="text-2xl">{o.emoji}</span>
              <span className="min-w-0">
                <span className="block text-sm font-bold">{o.label}</span>
                <span className="block text-xs text-cocoa/60">{o.description}</span>
              </span>
              <span className="ml-auto shrink-0 text-cocoa/40">›</span>
            </a>
          )
        )}
      </div>
      {active.map((o) =>
        o.impressionUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`imp-${o.label}`}
            src={o.impressionUrl}
            width={1}
            height={1}
            alt=""
            style={{ border: "none", position: "absolute", width: 1, height: 1, opacity: 0 }}
            loading="lazy"
          />
        ) : null
      )}
    </section>
  );
}
