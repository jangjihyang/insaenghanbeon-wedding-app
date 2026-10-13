-- 인생한번 공개 정보공유 게시판: Supabase SQL Editor에서 한 번 실행하세요.
-- 로그인 없이 읽기/작성하도록 설계되어 스팸·개인정보 게시 위험이 있습니다.
-- 운영자는 대시보드에서 신고 글을 hidden으로 바꾸거나 삭제해 관리해야 합니다.
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  nickname text not null default '익명 예비부부' check (char_length(nickname) between 1 and 24),
  category text not null check (category in ('장소 제보','방문 후기','질문','정보 공유')),
  venue_name text check (char_length(venue_name) <= 80),
  region text check (region in ('서울','경기','인천','기타')),
  title text not null check (char_length(title) between 3 and 100),
  content text not null check (char_length(content) between 10 and 2000),
  source_url text check (source_url is null or source_url ~* '^https?://'),
  status text not null default 'published' check (status in ('published','hidden')),
  created_at timestamptz not null default now()
);
alter table public.community_posts enable row level security;
drop policy if exists "community public reads published" on public.community_posts;
create policy "community public reads published" on public.community_posts for select using (status = 'published');
drop policy if exists "community anonymous insert" on public.community_posts;
create policy "community anonymous insert" on public.community_posts for insert to anon, authenticated with check (
  status = 'published'
  and char_length(nickname) between 1 and 24
  and char_length(title) between 3 and 100
  and char_length(content) between 10 and 2000
);
-- 일반 방문자는 수정/삭제할 수 없고, 관리자는 Supabase Dashboard에서 관리합니다.
