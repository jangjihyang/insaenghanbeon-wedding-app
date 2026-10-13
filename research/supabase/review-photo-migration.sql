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
