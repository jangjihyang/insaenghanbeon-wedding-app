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
