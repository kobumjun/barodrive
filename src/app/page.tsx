import Link from "next/link";
import Image from "next/image";
import { FAQAccordion } from "@/components/faq-accordion";
import { HomePriceSummary } from "@/components/home-price-summary";
import { SectionTitle } from "@/components/section-title";
import { FAQS } from "@/lib/constants";
import { getPublishedReviews } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { getSitePhoneNumber, toPhoneLink } from "@/lib/site-settings";

const keywords = ["초보 운전자", "장롱면허", "주차 자신감", "도로연수", "맞춤 코칭"];

const worryBubbles = [
  {
    emoji: "😰",
    worry: "운전 못한다고 욕먹을까 봐 무서워요",
    solve: "압박 없는 1:1 코칭으로 내 속도에 맞춰 진행합니다.",
    tone: "bg-rose-50 border-rose-200",
  },
  {
    emoji: "🛡️",
    worry: "사고 나면 업체가 책임 안 질까 봐요",
    solve: "보험/안전 기준을 사전 안내하고 책임 프로세스를 명확히 운영합니다.",
    tone: "bg-sky-50 border-sky-200",
  },
  {
    emoji: "🤝",
    worry: "강사님이랑 안 맞으면 어쩌죠?",
    solve: "강사 교체 가능 정책으로 수강 만족도를 보장합니다.",
    tone: "bg-amber-50 border-amber-200",
  },
  {
    emoji: "🚗",
    worry: "연수 끝나도 혼자 운전할 자신이 없어요",
    solve: "실전 동선 반복과 점검 루틴으로 혼자서도 운전 가능하게 만듭니다.",
    tone: "bg-emerald-50 border-emerald-200",
  },
];

export default async function HomePage() {
  const reviews = await getPublishedReviews(4);
  const phoneNumber = await getSitePhoneNumber();

  return (
    <div className="space-y-20 pb-8">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-6 py-10 text-white shadow-lg md:px-10 md:py-14">
        <div className="absolute -right-20 -top-12 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute -bottom-16 left-20 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] [background-size:18px_18px]" />

        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
              Premium Driving Coaching
            </p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              초보도 안심하는
              <br />
              프리미엄 1:1 운전연수
            </h1>
            <p className="mt-4 max-w-xl text-zinc-200 md:text-lg">
              강사-수강생 궁합, 안전 프로세스, 실전 루트를 모두 고려한 맞춤 코칭으로
              운전이 두려운 상태에서 혼자 운전 가능한 상태까지 설계합니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/pricing#inquiry-form"
                className="rounded-full bg-amber-400 px-6 py-3 font-bold text-zinc-900 shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                연수 신청하기
              </Link>
              <a
                href={toPhoneLink(phoneNumber)}
                className="rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
              >
                전화 상담하기 ({phoneNumber})
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-100"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 top-8 hidden rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-sm backdrop-blur md:block">
              🚘 도심 실전 코칭
            </div>
            <div className="absolute -right-2 top-24 hidden rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-sm backdrop-blur md:block">
              🅿️ 주차 집중 훈련
            </div>
            <div className="absolute left-10 bottom-2 hidden rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-sm backdrop-blur md:block">
              🛡️ 안전/보험 안내
            </div>
            <div className="relative h-[420px] overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-5 shadow-md backdrop-blur">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-amber-300/35 blur-3xl" />
              <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-cyan-300/25 blur-3xl" />
              <div className="absolute inset-0 opacity-25 [background:linear-gradient(120deg,transparent_0%,rgba(255,255,255,.8)_48%,transparent_100%)]" />
              <div className="relative grid h-full grid-rows-[auto_auto_1fr] gap-4 overflow-hidden rounded-2xl border border-white/25 bg-zinc-900/35 p-5">
                <div className="grid w-full grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4">
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">맞춤 코칭 플랜</p>
                    <p className="mt-1 break-keep text-base font-bold leading-6">수강생 성향 기반 루트 설계</p>
                  </div>
                  <span className="rounded-full bg-emerald-300/20 px-3 py-1 text-xs font-semibold text-emerald-100">
                    1:1
                  </span>
                </div>
                <div className="grid w-full gap-3 sm:grid-cols-2">
                  <div className="w-full rounded-xl border border-white/20 bg-white/10 p-4">
                    <p className="text-xs text-zinc-200">안전 중심</p>
                    <p className="mt-1 break-keep text-sm font-semibold leading-6">보험/대응 프로세스 사전 안내</p>
                  </div>
                  <div className="w-full rounded-xl border border-white/20 bg-white/10 p-4">
                    <p className="text-xs text-zinc-200">실전 중심</p>
                    <p className="mt-1 break-keep text-sm font-semibold leading-6">도심/주차/차선변경 맞춤 훈련</p>
                  </div>
                </div>
                <div className="grid w-full grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4">
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-200">수강생 만족도 관리</p>
                    <p className="mt-1 break-keep text-sm font-semibold leading-6">강사 교체 가능 · 단계별 피드백</p>
                  </div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-xl">
                    ✨
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="고민 해결"
          title="혹시 이런 걱정 중이신가요?"
          description="걱정은 말풍선에 담고, 해결은 코칭 프로세스로 보여드립니다."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {worryBubbles.map((item, index) => (
            <article
              key={item.worry}
              className={`relative rounded-xl border p-5 shadow-sm ${item.tone}`}
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                  {item.emoji}
                </span>
                <div>
                  <p className="font-bold text-zinc-900">{item.worry}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-700">{item.solve}</p>
                  <p className="mt-3 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-zinc-700">
                    Solution {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="바로드라이브의 약속"
          title="프리미엄 코칭을 완성하는 4가지 핵심"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["01", "🎯", "1:1 맞춤 코칭", "운전 성향과 목표에 맞춰 수업 강도와 루트를 설계합니다."],
            ["02", "🛡️", "사고 시 보험 처리", "안전 기준과 사고 대응 프로세스를 투명하게 안내합니다."],
            ["03", "🔄", "강사 교체 가능", "코칭 스타일이 맞지 않으면 빠르게 조정할 수 있습니다."],
            ["04", "🧭", "장롱면허 맞춤", "주차/골목/차선변경까지 단계형 커리큘럼으로 실전 감각을 만듭니다."],
          ].map(([num, icon, title, desc], idx) => (
            <article
              key={title}
              className={`rounded-xl border p-5 shadow-sm transition hover:-translate-y-0.5 ${
                ["bg-white border-zinc-200", "bg-amber-50 border-amber-200", "bg-sky-50 border-sky-200", "bg-emerald-50 border-emerald-200"][idx]
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-bold text-white">{num}</span>
                <span className="text-2xl">{icon}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-zinc-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="후기 미리보기" title="실제 수강생의 변화" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.slice(0, 4).map((review) => (
            <Link
              key={review.id}
              href={`/reviews/${review.slug || review.id}`}
              className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={review.image_url}
                  alt={review.title}
                  width={480}
                  height={300}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  loading="lazy"
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-700">
                  후기
                </div>
              </div>
              <div className="p-5">
                <h3 className="line-clamp-2 font-bold text-zinc-900">{review.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{review.excerpt}</p>
                <p className="mt-3 text-xs text-zinc-500">{review.author_name} · {formatDate(review.created_at)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <HomePriceSummary />

      <section className="grid gap-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div>
          <p className="mb-2 text-sm font-semibold text-amber-500">FAQ</p>
          <h3 className="text-3xl font-bold text-zinc-900">처음 상담 전에 가장 많이 묻는 질문</h3>
          <p className="mt-3 text-zinc-600">걱정되는 부분을 미리 확인하고 편하게 신청하세요.</p>
          <Link href="/faq" className="mt-5 inline-block rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold">
            전체 FAQ 보기
          </Link>
        </div>
        <FAQAccordion items={FAQS.slice(0, 4)} />
      </section>

      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-100 p-8 text-zinc-900 shadow-md">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/40" />
        <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-white/50" />
        <h2 className="text-3xl font-extrabold">지금 상담받고 운전 자신감을 시작하세요</h2>
        <p className="mt-2">초보도 안심할 수 있는 프리미엄 1:1 코칭 서비스</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/pricing#inquiry-form" className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-bold text-white">
            지금 신청하기
          </Link>
          <a href={toPhoneLink(phoneNumber)} className="rounded-full bg-white px-5 py-3 text-sm font-bold">
            전화 상담
          </a>
        </div>
      </section>
    </div>
  );
}
