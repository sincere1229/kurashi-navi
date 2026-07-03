import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kurashi-navi.com"),
  title: "暮らしナビ|あなた専用の引っ越しやることリストを60秒で",
  description:
    "6つの質問に答えるだけで、あなたの引っ越しに必要な手続きリストを自動生成。期日管理からみのりの応援まで、引っ越し準備をまるごとナビゲートします。",
  openGraph: {
    title: "暮らしナビ|あなた専用の引っ越しやることリストを60秒で",
    description: "6つの質問に答えるだけで、引っ越しに必要な手続きリストを自動生成。期限管理までまるごとナビ。",
    url: "https://kurashi-navi.com",
    siteName: "暮らしナビ",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
