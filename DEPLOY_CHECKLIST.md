# 인생한번 배포 체크리스트

## Supabase
- [ ] `supabase/schema.sql` 실행 완료
- [ ] `supabase/review-photo-migration.sql` 실행 완료 (후기 사진 업로드)
- [ ] Authentication → URL Configuration에 Vercel 주소 및 `/my` Redirect URL 등록
- [ ] Authentication → Providers에서 Google 활성화 및 Google Client ID/Secret 저장
- [ ] Authentication → Providers에서 Kakao 활성화 및 Kakao REST API Key/Client Secret 저장

## Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_URL` 입력
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 입력
- [ ] 선택: `NEXT_PUBLIC_KAKAO_MAP_KEY` 입력 (실제 지도 표시)
- [ ] GitHub main 브랜치 최신 커밋 반영 후 Vercel 재배포 완료

## 운영 전 확인
- [ ] Google 로그인 / 카카오 로그인 / 이메일 가입 모두 테스트
- [ ] 로그인 후 `/my`로 돌아오는지 확인
- [ ] 후기 사진은 JPG/PNG/WEBP, 5장·장당 8MB 제한 확인
- [ ] 실제 웨딩홀 사진·상호·주소 게시 전 각 사업자 사용 허가 및 최신 정보 확인
