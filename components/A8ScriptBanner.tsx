"use client";

import Script from "next/script";
import { ScriptAd } from "@/lib/affiliates";

// A8の「ブランドセーフ広告」枠。通常のimgタグではなく、
// 外部スクリプトが非同期でバナーを描画する特殊な広告形式。
// サイトごとに一度だけ https://ad-verification.a8.net/ad/js/brandsafe.js を読み込み、
// 各広告のdiv内でbrandsafe_js_async()を呼び出す。
export default function A8ScriptBanner({ ad }: { ad: ScriptAd }) {
  const divId = `div_admane_async_${ad.siteId}_${ad.articleId}_${ad.linkId}`;
  const callParams = `//ad-verification.a8.net/ad', _site=${ad.siteId}&_article=${ad.articleId}&_link=${ad.linkId}&_image=${ad.imageId}&sad=${ad.sad}`;

  return (
    <div className="overflow-hidden rounded-xl border border-cocoa/10">
      <p className="bg-piyo/20 px-3 py-1.5 text-xs font-bold text-piyodeep">{ad.label}</p>
      <div className="flex justify-center p-2">
        <Script src="https://ad-verification.a8.net/ad/js/brandsafe.js" strategy="lazyOnload" />
        <div id={divId} />
        <Script id={`script-${divId}`} strategy="lazyOnload">
          {`brandsafe_js_async('${callParams}', '260703971183', '1');`}
        </Script>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ad.impressionUrl}
          width={1}
          height={1}
          alt=""
          style={{ border: "none", position: "absolute", width: 1, height: 1, opacity: 0 }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
