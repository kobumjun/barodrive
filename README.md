# 바로드라이브 랜딩/예약 사이트

Next.js(App Router) + TypeScript + Tailwind + Supabase 기반의 프리미엄 운전 연수 홍보/신청 사이트입니다.

## 실행 방법

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 필수 환경변수

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_KAKAO_CHAT_URL`
- `ADMIN_PIN`

## Supabase 준비

1. `supabase/schema.sql` 실행
2. Storage에 public bucket `reviews` 생성
3. 필요 시 RLS 정책 구성

## 페이지 구성

- `/` 메인
- `/curriculum` 커리큘럼
- `/pricing` 연수가격/신청
- `/regions` 연수지역
- `/reviews` 후기 목록
- `/reviews/[slug]` 후기 상세
- `/faq` FAQ
- `/admin` 관리자

## 관리자 기능

- 가격 수정
- 후기 추가/삭제 (이미지 업로드 포함)
- 신청 접수 내역 확인
- PIN 기반 세션 로그인/로그아웃
