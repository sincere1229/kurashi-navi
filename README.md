# 暮らしナビ v1.0(Phase 1 MVP)

引っ越しやることリスト自動生成サービス。設計・仕様書v1.0のPhase 1を実装。

## 実装済み機能
- 6問診断ウィザード(1問1画面・タップのみ)+引っ越し予定日入力
- タスク自動生成(条件フラグ判定・42タスク収録)
- マイチェックリスト:達成率バー/期日カウントダウン/カテゴリフィルタ/未完了絞り込み
- タスク詳細モーダル:窓口・持ち物チェック・ぴよ子アドバイス
- 完了時の「済」ハンコ演出+ぴよ子の褒めトースト
- localStorage保存(登録不要で使える)

## デプロイ手順(いつもの流れ)
1. GitHubで新リポジトリ作成(例:`sincere1229/kurashi-navi`)
2. このフォルダの中身をすべてアップロード(node_modulesは不要・自動生成されます)
3. Vercelで「New Project」→ リポジトリを選択 → そのままDeploy
4. 完了(環境変数は不要です)

## タスクの追加・修正
`lib/taskMaster.ts` を編集するだけ。1タスク=1オブジェクト。
- `condition`: 外側の配列=AND、内側=OR。`[]`は全員必須
  - 例:`[["B2","B3"],["C1"]]` →(市外 or 県外)かつ 車あり
- `deadline`: D-30 / D-14 / D-7 / D-1 / D0 / D+14 / D+30
- `advice`: ぴよ子のひとこと(🐣🐥は1メッセージ2個まで)

## Phase 2 以降(仕様書参照)
- Supabase会員登録・複数端末同期 / LINE通知 / 地域情報ページ / アフィリエイト枠

---

## v1.1 追加分(地域情報+収益化枠)

### 地域情報ページ(/area)
- 全国1,916自治体に対応(都道府県→市区町村を選ぶだけ)
- 各自治体の**公式サイト直リンク**+8トピックの検索リンク自動生成(ゴミ分別・休日診療・学区・子育て支援・ハザードマップ・転入手続き・交通・買い物MAP)
- リンク切れが起きない設計。個別URL収集は不要
- 選んだ自治体はlocalStorageに記憶(再訪時に復元)
- データ元:code4fukui/localgovjp(オープンデータ)。更新したい時は同CSVから`lib/municipalities.json`を再生成

### アフィリエイト枠の運用(重要)
`lib/affiliates.ts` を開いて、A8で提携した案件のURLを貼るだけ。
- **urlが空("")の枠は画面に一切表示されません**(提携前・審査中でも安全)
- MAIN_OFFERS = チェックリスト下部(引っ越し見積もり・回線・不用品買取=主砲)
- AREA_OFFERS = 地域ページ下部(ウォーターサーバー・電力切替)
- rel="nofollow sponsored" とPR表記は実装済み(ステマ規制対応)

### SEOメモ
- インデックスさせて戦うのは「トップ(診断)」。地域ページは1枚の道具ページなので薄いページ量産リスクなし

---

## v1.2 追加分(みのりリブランド+審査対策ページ)

### リブランド
- ナビゲーターを「みのり🌱」に変更(薄いグリーン基調に全面変更)
- みのりのSVGは仮デザイン(新芽+実モチーフ)。本イラスト完成後は `components/Minori.tsx` の差し替えのみでOK

### 審査対策ページ(AdSense申請に必要)
- /privacy(プライバシーポリシー:広告・解析・免責を網羅)
- /about(運営者情報)
- /contact(お問い合わせ)
- トップのフッターから3ページへリンク済み

### 公開前にやること
`lib/site.ts` を開いて以下を設定:
- contactFormUrl:Googleフォームを1つ作ってURLを貼る(推奨)
- contactEmail:メールで受けるならアドレス記入(どちらか片方でOK)

---

## v1.3 追加分(みのり本イラスト反映)

### キャラクター画像
- `public/characters/minori-smile.png`(顔アップ・四つ葉クローバーのヘアピン)
- `public/characters/minori-main.png`(全身・案内ポーズ)
- `components/Minori.tsx` が表示サイズに応じて自動で使い分け(90px以下=顔アップ、それ以上=全身)。個別指定したい場合は `<Minori size={150} variant="main" />` のように明示可能
- SVG仮デザインから本イラストに完全移行。以後、表情差分(困り顔・お祝いポーズ等)を追加する場合は `SRC` に追記するだけでOK

### 差分追加のやり方(将来用)
1. 新しい表情/ポーズの画像を `public/characters/` に追加
2. `components/Minori.tsx` の `Variant` 型と `SRC` に1行追加
3. 呼び出し側で `variant="新しい名前"` を指定

---

## v1.4 追加分(お役立ちコラム+アフィリエイト誘導)

### 実装内容
- `/column`(コラム一覧)+ `/column/[slug]`(記事詳細)を追加。5本収録:
  - 不用品・ゴミ(furiwake-taisho)/ 車・免許(kuruma-tetsuzuki)/ 引っ越し準備(hikkoshi-mitsumori)/ 電気(denki-kirikae)/ ガス(gas-kirikae)
- 各記事は「困りごと→メリットのある選択肢→みのりのひとこと」の3段構成。記事末尾にテーマ専用のPR枠(OfferBox)を表示
- トップページのフッター、チェックリスト画面からコラム一覧への導線を追加

### コラムの追加方法
`lib/columns.ts` の `COLUMNS` 配列に1オブジェクト追加するだけ。`offerSlug`は`lib/affiliates.ts`の`COLUMN_OFFERS`のキーと対応させる(新テーマなら両方に追記)。

### アフィリエイトURLの反映先(現状すべて空・非表示)
`lib/affiliates.ts`の`COLUMN_OFFERS`:
- waste(不用品買取・回収)← 実家どうするナビの提携を副サイト経由で
- car(自動車保険)← 新規申請分
- moving(引っ越し見積もり)← 新規申請分。MAIN_OFFERSと同一案件でOK
- electricity(電力切替)← 新規申請分
- gas(ガス切替)← 新規申請分

---

## v1.5 追加分(バナー画像広告対応+駐車場コラム)

### バナー画像広告(もしもアフィリエイト等)
`lib/affiliates.ts` の各案件に `bannerImageUrl` / `bannerWidth` / `bannerHeight` を指定すると、テキストカードの代わりに画像バナーが表示されます。指定しなければ従来通りテキストカードです(混在OK)。
```ts
{
  label: "案件名",
  description: "",
  url: "クリック用URL",
  impressionUrl: "計測ピクセルURL(あれば)",
  bannerImageUrl: "バナー画像URL",
  bannerWidth: 336,
  bannerHeight: 280,
  emoji: "🅿️",
}
```

### 新規コラム
- 車・駐車場「新居の駐車場、賃貸契約と同時に探し始めていますか?」(chushajo-sagashi)
- 月極駐車場案件(PMCマンスリーパーキング)をバナー広告として反映済み

---

## v1.6 追加分(A8バナー広告13件+回線比較コラム+姉妹サイト連携)

### 反映したアフィリエイト案件
- **引っ越し**:引越し侍(MAIN_OFFERS・movingコラム)、宅配型トランクルーム 宅トラ(movingコラム追加枠)
- **不用品買取**:ECOクリーン(MAIN_OFFERS・wasteコラム)、クリエル出張買取(wasteコラム追加枠)
- **電気**:ドコモでんき、enepi光熱費診断(electricityコラム・AREA_OFFERS)
- **ガス**:enepiプロパンガス比較(gasコラム)
- **インターネット回線**:SoftBank Air・BIGLOBE光・WiMAX・auひかり・フレッツ光・BB.excite光の6社を新設の`internet`枠にまとめ、新規コラム`/column/kaisen-hikaku`で比較記事として掲載。MAIN_OFFERSの回線ボタンはこのコラムへ誘導する形に変更

### スクリプト型広告(A8ブランドセーフ広告)への対応
`components/A8ScriptBanner.tsx` を新設。通常のimg広告と違い外部JSでバナーを描画する形式に対応。東急でんき&ガス(東急線沿線限定)を電気コラムに設置。今後同形式の案件が来たら `lib/affiliates.ts` の `SCRIPT_ADS` に追記するだけでOK。

### 姉妹サイト連携
`components/SisterSiteCard.tsx` を新設。`lib/affiliates.ts` の `SISTER_SITES` にサイトを追加するだけで、チェックリスト画面・コラム記事末尾に誘導カードが表示される。現在「やさしい介護ナビ」(kaigo-anshin.net)を設置済み。他のnaviサイトを追加する場合もここに1行追記でOK。

### 未提携(空欄のまま)
- car(自動車保険)のみ引き続き未提携

---

## v1.7 追加分(LINE登録+個別リマインド機能)

### 何が変わったか
- チェックリスト画面に「このリストはこの端末に保存されています」という説明文を追加(既存のlocalStorage保存の分かりにくさを解消)
- 「LINEで登録する」ボタンを追加。登録すると:
  - 別の端末・機種変更後でも続きが見られる(Supabaseにデータを保存)
  - 引っ越し日を基準に、みのりからLINEで個別リマインドが届く(1ヶ月前・1週間前・前日・当日・3日後の5タイミング。仕様書第4章のメッセージをそのまま使用)
- `NEXT_PUBLIC_LIFF_ID` が未設定の間はボタンごと非表示になるので、準備が整うまでは今まで通り安全に公開できます(アフィリエイト枠と同じ「空なら非表示」の考え方)

### 恵子さんに準備していただくもの(3つ)

**① LINE Developersでチャネルを2つ作成**
既存の「Twinkle Lab」等のLINE公式アカウントとは別に、暮らしナビ専用のチャネルを作るのがおすすめです(混線防止)。
1. [LINE Developers Console](https://developers.line.biz/console/)でプロバイダーを開く(既存のものでOK)
2. 「Messaging API」チャネルを新規作成 → 暮らしナビ用の公式アカウントができます
   - チャネルアクセストークン(長期)を発行 → `LINE_CHANNEL_ACCESS_TOKEN`
   - チャネルシークレット → `LINE_CHANNEL_SECRET`
   - Webhook URLに `https://kurashi-navi.com/api/line/webhook` を設定、Webhookを「利用する」に
3. 同じプロバイダーで「LINEログイン」チャネルも新規作成
   - チャネルID → `LINE_LOGIN_CHANNEL_ID`
   - 「LIFF」タブでLIFFアプリを追加(エンドポイントURL: `https://kurashi-navi.com/checklist`、サイズ:Full)→ 発行されたLIFF ID → `NEXT_PUBLIC_LIFF_ID`

**② Supabaseプロジェクトを作成**
1. [supabase.com](https://supabase.com)で新規プロジェクト作成(既存のTwinkle Knowledge OS等と同じアカウントでOK、プロジェクトは分けるのがおすすめ)
2. SQL Editorで `supabase/schema.sql` の中身をそのまま実行(テーブルが3つ作られます)
3. Settings → API から:
   - Project URL → `SUPABASE_URL`
   - service_role key(secretの方) → `SUPABASE_SERVICE_ROLE_KEY`

**③ Vercelに環境変数を設定**
`.env.example` を参考に、上記で取得した値をVercelの Settings → Environment Variables に登録してください。`CRON_SECRET` は任意の適当な文字列でOKです(推測されにくいものを)。

### 注意点
- Vercel Cron(`vercel.json`)は毎日1回リマインドを送信します。**Vercelの無料プランではCronの実行頻度に制限がある場合があるため**、Proプラン推奨、または外部の無料Cronサービス(cron-job.org等)から `https://kurashi-navi.com/api/cron/reminder` を呼ぶ代替も可能です(その場合はAuthorizationヘッダーに `Bearer {CRON_SECRET}` を付けてもらう必要があります)
- 上記3点が未設定でも、サイト自体は今まで通り正常に動きます(LINE登録ボタンが表示されないだけ)
