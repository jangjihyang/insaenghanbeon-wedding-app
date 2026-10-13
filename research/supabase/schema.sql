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
-- 후기 사진 기능용: Supabase SQL Editor에서 실행
alter table public.reviews
  add column if not exists image_urls text[] not null default '{}';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'review-images',
  'review-images',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 8388608,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists "public can read review images" on storage.objects;
create policy "public can read review images"
on storage.objects for select
using (bucket_id = 'review-images');

drop policy if exists "users upload own review images" on storage.objects;
create policy "users upload own review images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'review-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users delete own review images" on storage.objects;
create policy "users delete own review images"
on storage.objects for delete to authenticated
using (
  bucket_id = 'review-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);
