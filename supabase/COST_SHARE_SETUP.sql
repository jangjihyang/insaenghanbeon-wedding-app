-- 인생한번: 비영리 익명 웨딩홀 비용공유 및 신고 기능
-- Supabase Dashboard > SQL Editor에서 한 번 실행하세요.
-- 공개 작성 구조이므로 운영자는 content_reports를 정기적으로 확인하고,
-- 문제가 있는 cost_reports/community_posts의 status를 hidden으로 바꿔야 합니다.
create table if not exists public.cost_reports (
  id uuid primary key default gen_random_uuid(),
  venue_name text not null check (char_length(venue_name) between 2 and 100), venue_slug text,
  region text not null check (region in ('서울','경기','인천','기타')),
  report_type text not null check (report_type in ('상담 견적','계약 견적','실제 결제')),
  event_month date not null, guest_count integer check (guest_count is null or guest_count between 1 and 3000), guarantee_count integer check (guarantee_count is null or guarantee_count between 1 and 3000),
  meal_price integer check (meal_price is null or meal_price between 0 and 1000000), meal_total integer check (meal_total is null or meal_total between 0 and 1000000000), rental_fee integer check (rental_fee is null or rental_fee between 0 and 100000000), required_fee integer check (required_fee is null or required_fee between 0 and 100000000), beverage_fee integer check (beverage_fee is null or beverage_fee between 0 and 100000000), alcohol_fee integer check (alcohol_fee is null or alcohol_fee between 0 and 100000000), flower_fee integer check (flower_fee is null or flower_fee between 0 and 100000000), production_fee integer check (production_fee is null or production_fee between 0 and 100000000), parking_fee integer check (parking_fee is null or parking_fee between 0 and 100000000), ceremony_fee integer check (ceremony_fee is null or ceremony_fee between 0 and 100000000), pyebaek_fee integer check (pyebaek_fee is null or pyebaek_fee between 0 and 100000000), officiant_fee integer check (officiant_fee is null or officiant_fee between 0 and 100000000), photo_video_fee integer check (photo_video_fee is null or photo_video_fee between 0 and 100000000), service_fee integer check (service_fee is null or service_fee between 0 and 100000000), vat_fee integer check (vat_fee is null or vat_fee between 0 and 100000000), other_fee integer check (other_fee is null or other_fee between 0 and 100000000),
  total_amount integer not null check (total_amount between 10000 and 1000000000), vat_included boolean,
  nickname text not null default '익명 예비부부' check (char_length(nickname) between 1 and 24), note text check (note is null or char_length(note) <= 800),
  status text not null default 'published' check (status in ('published','hidden')), created_at timestamptz not null default now()
);
create index if not exists cost_reports_lookup_idx on public.cost_reports(status, region, venue_slug, created_at desc);
alter table public.cost_reports enable row level security;
drop policy if exists "public can read published cost reports" on public.cost_reports;
create policy "public can read published cost reports" on public.cost_reports for select using (status='published');
drop policy if exists "public can add cost reports" on public.cost_reports;
create policy "public can add cost reports" on public.cost_reports for insert with check (status='published');
create table if not exists public.content_reports (
 id uuid primary key default gen_random_uuid(), target_type text not null check (target_type in ('cost','community')), target_id uuid not null,
 reason text not null check (char_length(reason) between 2 and 200), status text not null default 'open' check (status in ('open','reviewed','dismissed')), created_at timestamptz not null default now()
);
alter table public.content_reports enable row level security;
drop policy if exists "public can submit content reports" on public.content_reports;
create policy "public can submit content reports" on public.content_reports for insert with check (status='open');
-- 운영: 신고 확인 후 개인정보·광고·권리 침해·비방 글은 먼저 hidden 처리하고 검토하세요.
-- update public.cost_reports set status='hidden' where id='글 UUID';
-- update public.community_posts set status='hidden' where id='글 UUID';
