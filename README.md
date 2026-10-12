# 인생한번 — 웨딩홀 탐색 서비스

## 포함 기능
- 반응형 홈, 탐색, 상세, 후기, 비교, 마이페이지, 견적 문의
- Supabase 이메일 로그인/회원가입
- 찜, 리얼 후기, 견적 문의 데이터 저장 및 개인 내역 조회
- 공개 후기 목록 및 웨딩홀 상세 후기 불러오기
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
