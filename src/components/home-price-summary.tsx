import { getPricing } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const descriptions: Record<string, string> = {
  self_car_10h: "내 차량 적응 중심 맞춤 코칭",
  sedan_10h: "균형 잡힌 도심 실전 연수",
  suv_10h: "차체 감각까지 고려한 코칭",
};

const order = ["self_car_10h", "sedan_10h", "suv_10h"];

export async function HomePriceSummary() {
  const pricing = await getPricing();
  const sorted = [...pricing].sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <h3 className="text-2xl font-bold text-zinc-900">연수 가격 안내</h3>
      <p className="mt-2 text-sm text-zinc-600">10시간 기준 기본 요금입니다</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {sorted.map((item) => (
          <article
            key={item.key}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-zinc-700">{item.label}</p>
            <p className="mt-2 text-2xl font-extrabold text-zinc-900">{formatPrice(item.price)}</p>
            <p className="mt-2 text-xs text-zinc-500">{descriptions[item.key] ?? "프리미엄 맞춤 코칭"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
