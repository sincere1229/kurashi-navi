import Link from "next/link";
import Minori from "@/components/Minori";
import { COLUMNS } from "@/lib/columns";
import { SITE } from "@/lib/site";

export const metadata = { title: `お役立ちコラム|${SITE.name}` };

export default function ColumnList() {
  return (
    <main className="mx-auto max-w-md px-5 pb-16">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="font-maru text-lg font-black">{SITE.name}🏠</Link>
        <Link href="/checklist" className="text-xs text-cocoa/60 underline">やることリストへ</Link>
      </header>

      <section className="flex items-start gap-3">
        <div className="shrink-0"><Minori size={64} /></div>
        <p className="relative bubble rounded-2xl bg-white p-3 text-sm shadow-sm">
          手続きにまつわる「知っておくと得すること」をまとめました🌱
        </p>
      </section>

      <section className="mt-6 space-y-3">
        {COLUMNS.map((c) => (
          <Link
            key={c.slug}
            href={`/column/${c.slug}`}
            className="block rounded-2xl bg-white p-4 shadow-sm transition active:scale-95"
          >
            <span className="font-maru inline-block rounded-full bg-piyo/40 px-2.5 py-0.5 text-xs font-bold text-piyodeep">
              {c.category}
            </span>
            <p className="font-maru mt-2 font-bold leading-snug">{c.title}</p>
            <p className="mt-1 text-sm text-cocoa/60">{c.lead}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
