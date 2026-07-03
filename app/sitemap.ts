import { MetadataRoute } from "next";
import { TOPICS } from "@/lib/topics";
import { COLUMNS } from "@/lib/columns";
import DATA from "@/lib/municipalities.json";

type City = { p: string; c: string; k: string; u: string };
const CITIES: City[] = (DATA as any).cities;

const CHUNK_SIZE = 5000; // 1ファイルあたりのURL数(50,000の上限に対して余裕を持たせる)

// 固定ページ・コラムページ(id=0の先頭に含める)
function staticEntries(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: "https://kurashi-navi.com/", priority: 1.0, changeFrequency: "weekly" },
    { url: "https://kurashi-navi.com/checklist", priority: 0.8, changeFrequency: "weekly" },
    { url: "https://kurashi-navi.com/area", priority: 0.7, changeFrequency: "weekly" },
    { url: "https://kurashi-navi.com/column", priority: 0.7, changeFrequency: "weekly" },
  ];
  for (const c of COLUMNS) {
    pages.push({ url: `https://kurashi-navi.com/column/${c.slug}`, priority: 0.6, changeFrequency: "monthly" });
  }
  return pages;
}

// 全組み合わせ数(約1,916自治体 × 12トピック ≈ 23,000件)をチャンク分割して
// 複数のsitemapファイルとして出力する(Next.jsのgenerateSitemaps機能)
export async function generateSitemaps() {
  const total = CITIES.length * TOPICS.length;
  const chunks = Math.ceil(total / CHUNK_SIZE);
  return Array.from({ length: chunks }, (_, i) => ({ id: i }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const guideEntries: MetadataRoute.Sitemap = [];
  for (const city of CITIES) {
    for (const topic of TOPICS) {
      guideEntries.push({
        url: `https://kurashi-navi.com/guide/${encodeURIComponent(city.p)}/${encodeURIComponent(city.c)}/${topic.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  if (id === 0) {
    const start = 0;
    return [...staticEntries(), ...guideEntries.slice(start, CHUNK_SIZE - staticEntries().length)];
  }
  const offset = staticEntries().length;
  const start = id * CHUNK_SIZE - offset;
  return guideEntries.slice(start, start + CHUNK_SIZE);
}
