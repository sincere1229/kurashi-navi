-- ============================================================
-- 暮らしナビ Supabaseスキーマ v1.0
-- Supabaseの SQL Editor に貼り付けて実行してください。
-- ============================================================

create table if not exists profiles (
  line_user_id text primary key,           -- LINEのユーザーID(友だち追加時に取得)
  display_name text,
  answers jsonb,                            -- 診断の回答6軸(A,B,C,D,E,F)
  moving_date date,                         -- 引っ越し予定日(未定ならnull)
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists user_tasks (
  id uuid primary key default gen_random_uuid(),
  line_user_id text references profiles(line_user_id) on delete cascade,
  task_id text not null,                    -- タスクマスタのID(T001等) or "CUSTOM_xxx"
  status text default 'incomplete',         -- incomplete / done
  completed_at timestamptz,
  unique (line_user_id, task_id)
);

-- リマインド送信の重複防止(同じ日に同じ人へ2回送らないため)
create table if not exists reminder_log (
  line_user_id text references profiles(line_user_id) on delete cascade,
  sent_on date not null,
  kind text not null,                       -- "D-30" / "D-7" / "D-1" / "D0" / "inactive3" 等
  primary key (line_user_id, sent_on, kind)
);

-- RLS(Row Level Security):サーバー側(service role key)からのみ読み書き可能にする
-- クライアントから直接叩かせないため、匿名キーでのアクセスは全面禁止にしておく
alter table profiles enable row level security;
alter table user_tasks enable row level security;
alter table reminder_log enable row level security;
-- ポリシーは作成しない = service role key経由(APIルート)以外は一切アクセス不可
