import { FAQItem, PricingItem, Review } from "@/types";

export const BRAND = "바로드라이브";
export const PHONE_DISPLAY = "010-8877-1028";
export const PHONE_LINK = "tel:01088771028";
export const KAKAO_CHAT_URL =
  process.env.NEXT_PUBLIC_KAKAO_CHAT_URL ?? "https://open.kakao.com/o/placeholder";

export const FALLBACK_PRICING: PricingItem[] = [
  { id: "1", key: "self_car_10h", label: "자차 10시간", price: 290000 },
  { id: "2", key: "sedan_10h", label: "연수차(승용) 10시간", price: 320000 },
  { id: "3", key: "suv_10h", label: "연수차(SUV) 10시간", price: 340000 },
];

export const FAQS: FAQItem[] = [
  {
    question: "수업 중 사고 발생은 어떻게 처리하나요?",
    answer: "수업 중 발생 가능한 사고는 보험 기준에 따라 처리하며, 안전을 최우선으로 진행합니다.",
  },
  {
    question: "연수비 외 추가비용이 발생하나요?",
    answer: "사전 안내된 과정 외 추가 과금은 없으며, 특이사항은 상담 시 명확히 안내드립니다.",
  },
  {
    question: "연수 비용은 어떻게 납부하나요?",
    answer: "예약 확정 전 안내드린 방식으로 납부하실 수 있으며, 카드/계좌이체 등 유연하게 안내합니다.",
  },
  {
    question: "당일 취소나 일정 변경이 가능한가요?",
    answer: "일정 변경은 가능하며, 취소/변경 정책은 신청 시점에 투명하게 안내드립니다.",
  },
  {
    question: "강사님 교체가 가능한가요?",
    answer: "수강 만족도를 위해 강사 교체 요청이 가능하며, 불편사항을 빠르게 반영합니다.",
  },
  {
    question: "초보/장롱면허도 가능한가요?",
    answer: "네. 운전이 처음이거나 오랜 공백이 있는 분에게 맞춘 단계별 코칭을 제공합니다.",
  },
  {
    question: "자차 연수와 연수차 연수 차이는 무엇인가요?",
    answer: "자차 연수는 본인 차량 적응에 유리하고, 연수차 연수는 차종 선택과 심리적 부담 완화에 유리합니다.",
  },
];

export const FALLBACK_REVIEWS: Review[] = [
  {
    id: "1",
    title: "출퇴근길이 두렵지 않아졌어요",
    slug: "first-commute-confidence",
    excerpt: "3주 코칭 후 혼자 도심 주행이 가능해졌습니다.",
    content:
      "초보라 도로에만 나가면 손에 땀이 났는데, 강사님이 제 속도에 맞춰 코칭해주셔서 출퇴근길을 스스로 운전하게 됐어요.",
    author_name: "김**",
    created_at: "2026-03-01",
    image_url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
  {
    id: "2",
    title: "주차가 제일 큰 고민이었는데 해결됐어요",
    slug: "parking-confidence-up",
    excerpt: "평행/후진 주차를 반복 훈련해 실전 자신감이 생겼어요.",
    content:
      "주차만 생각하면 피하고 싶었는데, 주차 동선과 시야 포인트를 체계적으로 알려주셔서 이제는 혼자서도 가능합니다.",
    author_name: "이**",
    created_at: "2026-02-21",
    image_url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
  {
    id: "3",
    title: "강사 교체 시스템이 신뢰를 줬어요",
    slug: "coach-switch-trust",
    excerpt: "수강자 중심 운영이라 더 안심하고 시작할 수 있었습니다.",
    content:
      "1:1 맞춤형 코칭과 응대가 정말 전문적이었고, 과정 내내 불안하지 않게 세심하게 배려해주셨어요.",
    author_name: "박**",
    created_at: "2026-02-10",
    image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
];
