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
    id: "seed-1",
    title: "주차가 제일 무서웠는데 이제는 먼저 들어갑니다",
    slug: "seed-parking-confidence",
    excerpt: "평행주차 포인트를 반복해서 익히니 실전에서 손이 덜 떨렸어요.",
    content:
      "주차할 때 뒤차가 기다리면 너무 긴장했는데, 강사님이 시야 기준점을 아주 쉽게 알려주셔서 이제는 침착하게 주차할 수 있어요. 특히 골목 주차가 정말 많이 편해졌습니다.",
    author_name: "김**",
    created_at: "2026-03-22",
    image_url:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
  {
    id: "seed-2",
    title: "장롱면허 8년, 출퇴근 혼자 운전 시작했어요",
    slug: "seed-long-break-commute",
    excerpt: "출퇴근 동선 위주로 연수 받아서 바로 실전에 적용했습니다.",
    content:
      "면허만 있고 운전은 거의 안 해서 늘 겁이 났는데, 동네부터 큰길까지 단계적으로 연습해주셔서 출퇴근길 운전이 가능해졌어요. 혼자 운전할 수 있다는 게 가장 큰 변화입니다.",
    author_name: "이**",
    created_at: "2026-03-20",
    image_url:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
  {
    id: "seed-3",
    title: "강사님이 친절해서 긴장이 확 줄었습니다",
    slug: "seed-kind-coach",
    excerpt: "실수해도 차분하게 설명해주셔서 부담이 없었어요.",
    content:
      "처음에는 실수할까 봐 말을 잘 못했는데, 분위기를 편하게 만들어주셔서 질문도 많이 하고 더 빨리 늘었습니다. 초보한테 정말 중요한 부분이라고 느꼈어요.",
    author_name: "박**",
    created_at: "2026-03-17",
    image_url:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
  {
    id: "seed-4",
    title: "SUV 연수 선택했는데 시야 잡는 법이 좋아요",
    slug: "seed-suv-lesson",
    excerpt: "차체 큰 차량이 막연히 무서웠는데 기준점을 익혔습니다.",
    content:
      "SUV가 처음이라 차선 감각이 어려웠는데, 차폭 감각과 백미러 체크 루틴을 반복해서 알려주셔서 금방 익숙해졌어요. 장거리 주행도 자신감이 생겼습니다.",
    author_name: "최**",
    created_at: "2026-03-14",
    image_url:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
  {
    id: "seed-5",
    title: "차선 변경 타이밍이 드디어 보이기 시작했어요",
    slug: "seed-lane-change",
    excerpt: "합류/차선 변경이 어려운 분들에게 특히 추천합니다.",
    content:
      "늘 깜빡이 켜고도 못 들어가서 당황했는데, 시선 분배와 진입 타이밍을 익히고 나서 훨씬 자연스러워졌어요. 도심에서 스트레스가 줄었습니다.",
    author_name: "정**",
    created_at: "2026-03-10",
    image_url:
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
  {
    id: "seed-6",
    title: "골목길/이면도로 공포가 사라졌습니다",
    slug: "seed-alley-road",
    excerpt: "좁은 길 교행 요령을 배워서 일상 운전이 편해졌어요.",
    content:
      "양쪽 주차된 골목길에서 늘 식은땀이 났는데, 속도 조절과 차폭 판단 포인트를 알려주셔서 예전보다 훨씬 안정적입니다.",
    author_name: "윤**",
    created_at: "2026-03-06",
    image_url:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
  {
    id: "seed-7",
    title: "사고/보험 안내가 명확해서 안심됐어요",
    slug: "seed-insurance-trust",
    excerpt: "연수 전 안내가 투명해서 심리적으로 편했습니다.",
    content:
      "혹시 모를 상황이 걱정됐는데, 보장 범위와 진행 절차를 미리 안내받아 마음이 편했어요. 안전 우선 수업이라는 점이 신뢰를 줬습니다.",
    author_name: "한**",
    created_at: "2026-03-03",
    image_url:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
  {
    id: "seed-8",
    title: "강사 교체 제도가 있어 시작하기 쉬웠어요",
    slug: "seed-coach-switch",
    excerpt: "수강생 입장에서 선택권이 있다는 점이 좋았습니다.",
    content:
      "초보라 강사와 잘 맞을지 걱정이 컸는데 교체 가능 정책이 있어 부담이 덜했어요. 실제 수업도 친절했고 만족도가 높았습니다.",
    author_name: "서**",
    created_at: "2026-02-28",
    image_url:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
  {
    id: "seed-9",
    title: "연수 끝나고도 혼자 운전할 자신감이 생겼어요",
    slug: "seed-self-driving-confidence",
    excerpt: "단순 코스 반복이 아니라 실전 습관을 만들어 준 수업이었습니다.",
    content:
      "연수 직후뿐 아니라 그 이후가 더 걱정이었는데, 스스로 점검하는 체크리스트를 알려주셔서 꾸준히 안정적으로 운전하고 있어요.",
    author_name: "임**",
    created_at: "2026-02-24",
    image_url:
      "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?auto=format&fit=crop&w=1200&q=80",
    is_published: true,
  },
];
