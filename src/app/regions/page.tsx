import { SectionTitle } from "@/components/section-title";

const areas = ["서울 강남/서초/송파", "서울 마포/서대문/은평", "서울 강서/양천/구로", "경기 성남/분당", "경기 고양/일산", "경기 수원/용인", "경기 안양/과천", "경기 하남/남양주"];

export default function RegionsPage() {
  return (
    <div>
      <SectionTitle eyebrow="연수 지역" title="서울/경기권 중심 프리미엄 연수" description="상담 시 희망 동선에 맞춰 가능한 지역과 시간대를 안내합니다." />
      <div className="grid gap-3 md:grid-cols-2">
        {areas.map((area) => (
          <div key={area} className="rounded-xl border border-zinc-200 bg-white px-4 py-3 font-medium text-zinc-700">{area}</div>
        ))}
      </div>
    </div>
  );
}
