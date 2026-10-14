-- 인생한번 v19: 비용 공유 상세 항목 확장
-- 기존에 COST_SHARE_SETUP.sql을 실행한 프로젝트에서 SQL Editor로 한 번 실행하세요.
-- 새 항목은 모두 선택 입력(NULL 허용)이므로 기존 비용 공유 글은 그대로 유지됩니다.

alter table public.cost_reports add column if not exists guarantee_count integer check (guarantee_count is null or guarantee_count between 1 and 3000);
alter table public.cost_reports add column if not exists meal_total integer check (meal_total is null or meal_total between 0 and 1000000000);
alter table public.cost_reports add column if not exists beverage_fee integer check (beverage_fee is null or beverage_fee between 0 and 100000000);
alter table public.cost_reports add column if not exists alcohol_fee integer check (alcohol_fee is null or alcohol_fee between 0 and 100000000);
alter table public.cost_reports add column if not exists flower_fee integer check (flower_fee is null or flower_fee between 0 and 100000000);
alter table public.cost_reports add column if not exists production_fee integer check (production_fee is null or production_fee between 0 and 100000000);
alter table public.cost_reports add column if not exists parking_fee integer check (parking_fee is null or parking_fee between 0 and 100000000);
alter table public.cost_reports add column if not exists ceremony_fee integer check (ceremony_fee is null or ceremony_fee between 0 and 100000000);
alter table public.cost_reports add column if not exists pyebaek_fee integer check (pyebaek_fee is null or pyebaek_fee between 0 and 100000000);
alter table public.cost_reports add column if not exists officiant_fee integer check (officiant_fee is null or officiant_fee between 0 and 100000000);
alter table public.cost_reports add column if not exists photo_video_fee integer check (photo_video_fee is null or photo_video_fee between 0 and 100000000);
alter table public.cost_reports add column if not exists service_fee integer check (service_fee is null or service_fee between 0 and 100000000);
alter table public.cost_reports add column if not exists vat_fee integer check (vat_fee is null or vat_fee between 0 and 100000000);
alter table public.cost_reports add column if not exists other_fee integer check (other_fee is null or other_fee between 0 and 100000000);

-- 운영 메모: 기타 직접 입력으로 등록된 예식장은 venue_slug가 NULL입니다.
-- 운영자가 확인한 뒤 목록 데이터에 추가할 수 있습니다.
