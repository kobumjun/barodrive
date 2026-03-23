import Link from "next/link";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import { getPublishedReviews } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const PAGE_SIZE = 6;

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPageRaw = Number(page ?? "1");
  const currentPage = Number.isFinite(currentPageRaw) && currentPageRaw > 0 ? Math.floor(currentPageRaw) : 1;
  const reviews = await getPublishedReviews();
  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pagedReviews = reviews.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm md:p-10">
        <div className="pointer-events-none absolute -right-10 -top-12 hidden h-44 w-44 rounded-full bg-amber-100 md:block" />
        <SectionTitle
          eyebrow="수강생 후기"
          title="직접 경험한 변화, 솔직한 후기"
          description="기본 시드 후기와 관리자 등록 후기가 함께 노출됩니다."
        />
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {pagedReviews.map((review, index) => (
          <Link
            key={review.id}
            href={`/reviews/${review.slug || review.id}`}
            className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative">
              <Image
                src={review.image_url}
                alt={review.title}
                width={900}
                height={560}
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-zinc-900/80 px-2.5 py-1 text-xs font-semibold text-white">
                후기 #{String(startIndex + index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-5">
              <h3 className="line-clamp-2 text-lg font-bold text-zinc-900">{review.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600">{review.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span className="rounded-full bg-zinc-100 px-2 py-1 font-medium">{review.author_name}</span>
                <span>{formatDate(review.created_at)}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {totalPages > 1 ? (
        <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="후기 페이지네이션">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
            const isActive = pageNum === safePage;
            return (
              <Link
                key={pageNum}
                href={`/reviews?page=${pageNum}`}
                className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNum}
              </Link>
            );
          })}
          {safePage < totalPages ? (
            <Link
              href={`/reviews?page=${safePage + 1}`}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
            >
              다음
            </Link>
          ) : null}
        </nav>
      ) : null}
    </div>
  );
}
