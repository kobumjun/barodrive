import { FAQItem, PricingItem, Review } from "@/types";

export const BRAND = "바로드라이브";
export const DEFAULT_PHONE_NUMBER = "010-8877-1028";
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

export const FALLBACK_REVIEWS: Review[] = [];
