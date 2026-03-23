import Link from "next/link";
import Image from "next/image";
import { InquiryForm } from "@/components/inquiry-form";
import { SectionTitle } from "@/components/section-title";
import { getPricing } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const coverByKey = {
  self_car_10h:
    "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
  sedan_10h:
    "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80&sat=-10",
  suv_10h:
    "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80&bri=-5",
} as const;

const order: Array<"self_car_10h" | "sedan_10h" | "suv_10h"> = [
  "self_car_10h",
  "sedan_10h",
  "suv_10h",
];

export default async function PricingPage() {
  const pricing = await getPricing();
  const sortedPricing = [...pricing].sort(
    (a, b) => order.indexOf(a.key) - order.indexOf(b.key),
  );

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm md:p-10">
        <div className="pointer-events-none absolute right-0 top-0 hidden h-32 w-32 rounded-bl-full bg-amber-100 md:block" />
        <SectionTitle
          eyebrow="연수가격 / 신청"
          title="가격은 투명하게, 코칭은 프리미엄하게"
          description="관리자에서 실시간 수정되는 요금으로 운영됩니다."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {sortedPricing.map((item) => {
            const oldPrice = item.price + 40000;

            return (
              <article
                key={item.key}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-md transition hover:-translate-y-1"
              >
                <div className="relative h-40">
                  <Image src={coverByKey[item.key]} alt={item.label} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-zinc-900">{item.label}</h3>
                  <p className="mt-3 text-sm text-zinc-500 line-through">{formatPrice(oldPrice)}</p>
                  <p className="text-3xl font-extrabold text-zinc-900">{formatPrice(item.price)}</p>
                  <p className="mt-2 text-xs text-zinc-500">보험 안내/강사 매칭/동선 상담 포함</p>
                  <Link
                    href="#inquiry-form"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-zinc-700"
                  >
                    이 플랜 신청하기
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <InquiryForm />
      </section>
    </div>
  );
}
