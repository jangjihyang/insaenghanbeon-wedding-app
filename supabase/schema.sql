-- 인생한번: Supabase SQL Editor에서 한 번 실행하세요.
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  hall_slug text not null,
  created_at timestamptz not null default now(),
  unique(user_id, hall_slug)
);
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  hall_slug text not null,
  author_name text not null default '예비부부',
  rating numeric not null check (rating between 1 and 5),
  meal_rating numeric not null check (meal_rating between 1 and 5),
  mood_rating numeric not null check (mood_rating between 1 and 5),
  parking_rating numeric not null check (parking_rating between 1 and 5),
  content text not null check (char_length(content) between 20 and 800),
  status text not null default 'published' check (status in ('published','hidden')),
  created_at timestamptz not null default now()
);
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  hall_slug text not null,
  wedding_date date,
  guest_count integer,
  contact_name text not null,
  contact_phone text not null,
  note text,
  created_at timestamptz not null default now()
);
alter table public.favorites enable row level security;
alter table public.reviews enable row level security;
alter table public.inquiries enable row level security;
drop policy if exists "favorites own rows" on public.favorites;
create policy "favorites own rows" on public.favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "reviews read published" on public.reviews;
create policy "reviews read published" on public.reviews for select using (status = 'published' or auth.uid() = user_id);
drop policy if exists "reviews insert own" on public.reviews;
create policy "reviews insert own" on public.reviews for insert with check (auth.uid() = user_id);
drop policy if exists "reviews update own" on public.reviews;
create policy "reviews update own" on public.reviews for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "reviews delete own" on public.reviews;
create policy "reviews delete own" on public.reviews for delete using (auth.uid() = user_id);
drop policy if exists "inquiries own rows" on public.inquiries;
create policy "inquiries own rows" on public.inquiries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
