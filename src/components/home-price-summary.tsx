const pricingItems = [
  {
    title: "자차 10시간",
    price: "290,000원",
    description: "내 차량 적응 중심 맞춤 코칭",
  },
  {
    title: "연수차(승용) 10시간",
    price: "320,000원",
    description: "균형 잡힌 도심 실전 연수",
  },
  {
    title: "연수차(SUV) 10시간",
    price: "340,000원",
    description: "차체 감각까지 고려한 코칭",
  },
];

export function HomePriceSummary() {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <h3 className="text-2xl font-bold text-zinc-900">연수 가격 안내</h3>
      <p className="mt-2 text-sm text-zinc-600">10시간 기준 기본 요금입니다</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {pricingItems.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-zinc-700">{item.title}</p>
            <p className="mt-2 text-2xl font-extrabold text-zinc-900">{item.price}</p>
            <p className="mt-2 text-xs text-zinc-500">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
