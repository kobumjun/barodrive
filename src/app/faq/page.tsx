import { FAQAccordion } from "@/components/faq-accordion";
import { SectionTitle } from "@/components/section-title";
import { FAQS } from "@/lib/constants";

export default function FAQPage() {
  return (
    <div>
      <SectionTitle eyebrow="FAQ" title="자주 묻는 질문" description="상담 전 가장 많이 문의하시는 내용을 정리했습니다." />
      <FAQAccordion items={FAQS} />
    </div>
  );
}
