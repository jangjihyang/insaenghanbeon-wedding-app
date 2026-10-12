# 인생한번 — 웨딩홀 탐색 서비스

## 포함 기능
- 반응형 홈, 탐색, 상세, 후기, 비교, 마이페이지, 견적 문의
- Supabase 이메일 로그인/회원가입
- 찜, 리얼 후기, 견적 문의 데이터 저장 및 개인 내역 조회
- 공개 후기 목록 및 웨딩홀 상세 후기 불러오기
- 후기 사진 업로드: 최대 5장, JPG·PNG·WEBP, 장당 8MB
- 지도 기반 지역 탐색: 카카오맵 JavaScript 키 설정 시 실제 지도·마커 활성화

## 시작하기
1. `.env.example`을 복사하여 `.env.local`을 만듭니다.
2. Supabase 대시보드에서 Project URL과 anon public key를 입력합니다.
3. 지도 기능은 Kakao Developers에서 JavaScript 키를 만든 뒤 `NEXT_PUBLIC_KAKAO_MAP_KEY`에 입력합니다.
4. Supabase SQL Editor에 `supabase/schema.sql`을 실행합니다.
5. `npm install && npm run dev`로 실행합니다.

## 배포 전
- Vercel 환경 변수에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 추가하세요.
- 실제 상용 전에는 웨딩홀 데이터, 요금, 사진, 상호를 계약/공식 정보로 교체하고, 후기 신고/관리자 검수 기능을 별도로 추가하세요.

## 후기 사진 업로드 설정
기존 Supabase 프로젝트에 사진 후기 기능을 추가하려면 `supabase/review-photo-migration.sql` 전체를 Supabase SQL Editor에서 한 번 실행하세요. 이 과정은 `reviews.image_urls` 열과 `review-images` 저장소 버킷, 업로드 권한을 만듭니다.

## Google·Kakao 소셜 로그인 설정
소스에는 Google과 Kakao 로그인 버튼 및 Supabase OAuth 연결 코드가 포함되어 있습니다. 실제 사용 전 아래 설정을 완료해야 합니다.

1. Supabase Dashboard → Authentication → URL Configuration에서 **Site URL**을 Vercel 배포 주소(예: `https://your-project.vercel.app`)로 설정하고, Redirect URLs에 `https://your-project.vercel.app/my`를 추가합니다.
2. Supabase Dashboard → Authentication → Providers → Google에서 Google Cloud Console의 Client ID/Secret을 입력하고 활성화합니다. Google Cloud Console OAuth 승인된 리디렉션 URI에는 Supabase 화면에 표시되는 Callback URL을 그대로 추가합니다.
3. Supabase Dashboard → Authentication → Providers → Kakao에서 Kakao Developers REST API Key/Client Secret을 입력하고 활성화합니다. Kakao Developers의 Redirect URI에도 Supabase 화면에 표시되는 Callback URL을 그대로 추가합니다.
4. Google 또는 Kakao 개발자 콘솔의 키·시크릿은 Vercel 환경 변수나 GitHub에 넣지 않습니다. Supabase Provider 설정 화면에만 입력합니다.

## 공개 후기·소셜 리서치 데이터 (v8)

- 각 웨딩홀 상세 화면과 `/reviews`에 공개 후기 요약, 출처 링크, 확인일, 신뢰도를 추가했습니다.
- 데이터는 `lib/data.ts`의 `publicReviewResearch`에 있습니다.
- 모든 원문 사진/영상은 재게시하지 않고 외부 원문 링크만 제공합니다.
- 운영 기준과 주의사항은 `PUBLIC_REVIEW_SOURCES.md`를 참고하세요.

## 대량 웨딩 장소 목록 (v9)

- 서울·경기·인천 공개 웹 후보 **186곳**을 `lib/venue-inventory.ts`에 추가했습니다.
- `/search` 화면에서 지역·출처 상태·장소명 기준으로 검색할 수 있습니다.
- 상태값은 `공식 확인(16)`, `플랫폼 확인(122)`, `추가 확인 필요(48)`로 구분합니다.
- 상태값은 실시간 영업·예약 가능 보증이 아니며, 운영 전에는 각 장소의 공식 상담으로 재검증해야 합니다.

## 공개 정보공유·실제 지도 (v10)

- `/community`에서 로그인 없이 장소 제보, 방문 후기, 질문, 정보 공유 글을 작성·열람할 수 있습니다.
- 공개 게시판을 실제로 사용하려면 Supabase SQL Editor에서 `supabase/COMMUNITY_BOARD_SETUP.sql`을 한 번 실행해야 합니다.
- 운영 안내는 `COMMUNITY_BOARD_OPERATION.md`를 참고하세요.
- 메인 지도는 Kakao API 키가 없어도 OpenStreetMap 실제 지도 바탕화면을 표시합니다. 공개 주소가 없는 후보는 장소명 검색 결과 또는 지역 중심을 표시하므로 외부 지도 링크로 다시 확인해야 합니다.
- 공개 웹 기반 후보 69곳을 추가해 서울·경기·인천 장소 후보는 총 255곳입니다.
