import type { Metadata } from "next";
import ShindanClient from "./ShindanClient";

export const metadata: Metadata = {
  title: "わたしの資産タイプ診断｜暮らしナビ",
  description:
    "7つの質問に答えるだけで、あなたに合ったお金の守り方・育て方のタイプがわかる無料診断。貯蓄型？積立型？NISAやiDeCoなど、いま知っておきたい制度の入り口をご案内します。",
  openGraph: {
    title: "わたしの資産タイプ診断｜暮らしナビ",
    description:
      "かんたん7問・約1分。あなたのお金のタイプと、知っておきたい制度の入り口がわかります。",
    url: "https://kurashi-navi.com/tools/shisan-shindan",
    siteName: "暮らしナビ",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-stone-50">
      <ShindanClient />
    </main>
  );
}
