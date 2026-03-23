import { SectionTitle } from "@/components/section-title";

const programs = [
  {
    title: "초보/장롱면허 맞춤 과정",
    description: "기본 조작, 차선 감각, 실전 도로 진입까지 단계별로 부담 없이 진행합니다.",
  },
  {
    title: "주차 집중 과정",
    description: "평행/후진/전면 주차를 공간 인지 기준으로 반복 훈련합니다.",
  },
  {
    title: "도심 도로 연수",
    description: "출퇴근 동선 중심으로 신호, 합류, 비보호 좌회전 등 핵심을 다룹니다.",
  },
  {
    title: "심화 과정",
    description: "고속도로 진입/차선 변경/장거리 주행까지 확장해 안정감을 높입니다.",
  },
];

export default function CurriculumPage() {
  return (
    <div>
      <SectionTitle eyebrow="커리큘럼" title="수강생 목표에 맞춰 설계된 프리미엄 과정" description="대상, 진행 방식, 기대 효과가 명확한 코칭 프로세스" />
      <div className="grid gap-4 md:grid-cols-2">
        {programs.map((program) => (
          <article key={program.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
            <h3 className="text-xl font-bold text-zinc-900">{program.title}</h3>
            <p className="mt-3 text-zinc-600">{program.description}</p>
          </article>
        ))}
      </div>
      <section>
        <SectionTitle eyebrow="수강 대상" title="이런 분께 추천합니다" />
        <div className="grid gap-3 md:grid-cols-3">
          {["면허 취득 후 첫 도로 주행이 두려운 분", "장롱면허에서 실운전 복귀가 필요한 분", "주차/차선 변경 등 특정 기술을 집중 강화하고 싶은 분"].map((item) => (
            <div key={item} className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700">{item}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
