import Link from "next/link";
import Image from "next/image";
import { FAQAccordion } from "@/components/faq-accordion";
import { SectionTitle } from "@/components/section-title";
import { FAQS, PHONE_DISPLAY, PHONE_LINK } from "@/lib/constants";
import { getPublishedReviews } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const keywords = ["초보 운전자", "장롱면허", "주차 자신감", "도로연수", "맞춤 코칭"];

export default async function HomePage() {
  const reviews = await getPublishedReviews(3);

  return (
    <div>
      <section className="grid gap-10 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-700 p-8 text-white md:grid-cols-2 md:p-12">
        <div>
          <p className="mb-4 inline-block rounded-full bg-white/15 px-3 py-1 text-sm">프리미엄 1:1 운전 코칭</p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">초보도 안심하는 프리미엄 도로연수, 바로드라이브</h1>
          <p className="mt-4 text-zinc-200">신뢰할 수 있는 강사진과 체계적인 맞춤 커리큘럼으로 실제 도로 자신감을 완성합니다.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/pricing#inquiry-form" className="rounded-full bg-amber-500 px-5 py-3 font-semibold text-zinc-950">연수 신청하기</Link>
            <a href={PHONE_LINK} className="rounded-full border border-white/40 px-5 py-3 font-semibold">전화 상담하기 ({PHONE_DISPLAY})</a>
          </div>
        </div>
        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span key={keyword} className="rounded-full border border-white/35 bg-white/10 px-3 py-1 text-sm">{keyword}</span>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-zinc-100">한 번의 수업으로 끝내는 연수가 아닌, 수강생의 성향과 목표에 맞춰 반복 가능한 안전 습관을 만드는 코칭 서비스를 제공합니다.</p>
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="고민 해결"
          title="운전이 무서운 순간, 바로드라이브가 바꿉니다"
          description="수강생이 실제로 가장 많이 말하는 고민을 코칭 로드맵에 반영했습니다."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["운전이 무서워요", "호흡부터 시야 확보까지, 긴장 완화 루틴으로 출발합니다."],
            ["주차가 너무 어려워요", "차량 감각을 키우는 반복 실습으로 주차 자신감을 만듭니다."],
            ["도로에 나가면 긴장돼요", "실전 동선 중심 훈련으로 도심 주행 적응을 돕습니다."],
            ["강사가 안 맞으면 어쩌죠?", "강사 교체 가능 정책으로 만족도를 보장합니다."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-zinc-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="바로드라이브의 약속" title="신뢰와 안전 중심의 1:1 코칭 시스템" />
        <div className="grid gap-4 md:grid-cols-3">
          {["1:1 맞춤 코칭", "사고시 보험처리", "강사 교체 가능", "장롱면허 맞춤 연수", "주차/골목길/도로 맞춤 수업", "수강생 니즈 기반 수업 설계"].map((item) => (
            <div key={item} className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm font-semibold text-zinc-800">{item}</div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="서비스 신뢰" title="경험 많은 강사진과 체계적 수업" />
        <div className="grid gap-4 md:grid-cols-4">
          {["전문 강사진", "안전한 연수 진행", "체계적인 커리큘럼", "후기 기반 만족도 관리"].map((item) => (
            <div key={item} className="rounded-2xl bg-zinc-900 p-5 text-white">{item}</div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="후기 미리보기" title="실제 수강생 후기로 확인하는 변화" />
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <Link key={review.id} href={`/reviews/${review.slug}`} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition hover:-translate-y-0.5">
              <Image src={review.image_url} alt={review.title} width={600} height={320} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-bold">{review.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{review.excerpt}</p>
                <p className="mt-3 text-xs text-zinc-500">{formatDate(review.created_at)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="FAQ" title="자주 묻는 질문" />
        <FAQAccordion items={FAQS.slice(0, 4)} />
        <Link href="/faq" className="mt-4 inline-block text-sm font-semibold text-zinc-700 underline">전체 FAQ 보기</Link>
      </section>

      <section className="mb-8 rounded-3xl bg-amber-500 p-8 text-zinc-950">
        <h2 className="text-3xl font-bold">지금 상담받고 나에게 맞는 연수를 시작하세요</h2>
        <p className="mt-2">초보도, 장롱면허도 안심할 수 있는 프리미엄 코칭.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/pricing#inquiry-form" className="rounded-full bg-zinc-900 px-5 py-3 font-semibold text-white">지금 신청하기</Link>
          <a href={PHONE_LINK} className="rounded-full bg-white px-5 py-3 font-semibold">전화 상담</a>
        </div>
      </section>
    </div>
  );
}
