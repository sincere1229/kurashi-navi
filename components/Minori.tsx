import Image from "next/image";

type Variant = "smile" | "main";

const SRC: Record<Variant, string> = {
  smile: "/characters/minori-smile.png", // 顔アップ(吹き出し・小サイズ向け)
  main: "/characters/minori-main.png",   // 全身・案内ポーズ(LPのファーストビュー等)
};

// みのり(暮らしナビ ナビゲーターキャラクター)
export default function Minori({
  size = 72,
  variant,
}: {
  size?: number;
  variant?: Variant;
}) {
  // variant未指定時は表示サイズで自動選択(小さい場面は顔アップの方がきれいに見える)
  const v: Variant = variant ?? (size <= 90 ? "smile" : "main");
  const aspect = v === "smile" ? 1 : 1122 / 1402; // main画像の縦横比に合わせて高さを算出

  return (
    <Image
      src={SRC[v]}
      alt="みのり"
      width={size}
      height={Math.round(size / aspect)}
      className="select-none rounded-2xl object-contain"
      style={{ width: size, height: "auto" }}
      priority={size >= 90}
    />
  );
}
