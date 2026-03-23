import { FAQAccordion } from "@/components/faq-accordion";
import { FAQS } from "@/lib/constants";

export default function FAQPage() {
  return (
    <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm md:p-8">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-amber-100" />
        <div className="absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-sky-100" />
        <p className="relative text-sm font-semibold uppercase tracking-wide text-amber-500">FAQ</p>
        <h1 className="relative mt-2 text-3xl font-bold leading-tight text-zinc-900 md:text-4xl">
          자주 묻는 질문,
          <br />
          한 번에 확인하세요
        </h1>
        <p className="relative mt-4 leading-7 text-zinc-600">
          연수 전 불안한 포인트를 미리 해소할 수 있도록 실제 상담에서 자주 받는 질문을 정리했습니다.
        </p>
        <div className="relative mt-6 space-y-2 text-sm text-zinc-700">
          <p>✅ 사고/보험 처리 기준 안내</p>
          <p>✅ 일정 변경/취소 정책 사전 고지</p>
          <p>✅ 강사 교체 가능 여부 명확화</p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
        <FAQAccordion items={FAQS} />
      </section>
    </div>
  );
}
