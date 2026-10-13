-- 기존 공개 게시판을 이미 만든 경우에만 실행하세요.
-- 새 카테고리(비용 질문 / 투어 후기 / 장소 정보 / 정보 공유)를 허용합니다.
alter table public.community_posts drop constraint if exists community_posts_category_check;
alter table public.community_posts add constraint community_posts_category_check
  check (category in ('비용 질문','투어 후기','장소 정보','정보 공유'));
-- 기존 글의 카테고리는 다음처럼 바꿉니다.
update public.community_posts set category='장소 정보' where category='장소 제보';
update public.community_posts set category='투어 후기' where category='방문 후기';
update public.community_posts set category='비용 질문' where category='질문';
