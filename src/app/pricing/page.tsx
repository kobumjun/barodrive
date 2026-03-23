import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { SectionTitle } from "@/components/section-title";
import { getPricing } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default async function PricingPage() {
  const pricing = await getPricing();

  return (
    <div>
      <SectionTitle eyebrow="연수 가격" title="투명한 가격으로 시작하는 프리미엄 코칭" />
      <div className="grid gap-4 md:grid-cols-3">
        {pricing.map((item) => (
          <article key={item.key} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
            <h3 className="text-lg font-bold">{item.label}</h3>
            <p className="mt-3 text-3xl font-black text-zinc-900">{formatPrice(item.price)}</p>
            <Link href="#inquiry-form" className="mt-6 inline-block rounded-full bg-amber-500 px-4 py-2 font-semibold text-zinc-950">신청하기</Link>
          </article>
        ))}
      </div>
      <section>
        <InquiryForm />
      </section>
    </div>
  );
}
