// みのり(仮SVG)。本イラストができたらこのコンポーネントだけ差し替えればOK
// モチーフ:新芽・実り。薄いグリーンの丸いマスコット
export default function Minori({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="みのり" role="img">
      {/* 頭の双葉(新芽) */}
      <path d="M50 24 Q38 12 28 16 Q38 22 47 27 Z" fill="#6FAE6A" />
      <path d="M52 24 Q64 10 74 15 Q63 21 55 27 Z" fill="#8BC98A" />
      <path d="M50 30 L50 20" stroke="#5B8F57" strokeWidth="3" strokeLinecap="round" />
      {/* からだ */}
      <ellipse cx="50" cy="60" rx="33" ry="31" fill="#C9E8C5" />
      {/* おなかの実(小さなオレンジの実=みのり) */}
      <circle cx="50" cy="72" r="7" fill="#F5B971" />
      <path d="M50 66 Q52 63 55 64" stroke="#5B8F57" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* ほっぺ */}
      <circle cx="31" cy="62" r="6" fill="#FFB8A8" opacity="0.7" />
      <circle cx="69" cy="62" r="6" fill="#FFB8A8" opacity="0.7" />
      {/* 目(にっこり) */}
      <path d="M34 52 Q38 48 42 52" stroke="#3E5C3A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M58 52 Q62 48 66 52" stroke="#3E5C3A" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* くち */}
      <path d="M46 60 Q50 64 54 60" stroke="#3E5C3A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* 葉っぱの手 */}
      <path d="M17 58 Q8 52 10 44 Q20 48 22 56 Z" fill="#8BC98A" />
      <path d="M83 58 Q92 52 90 44 Q80 48 78 56 Z" fill="#8BC98A" />
      {/* あし */}
      <ellipse cx="42" cy="91" rx="6" ry="4" fill="#8BC98A" />
      <ellipse cx="58" cy="91" rx="6" ry="4" fill="#8BC98A" />
    </svg>
  );
}
