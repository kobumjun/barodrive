import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getReviewBySlug } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);

  if (!review) notFound();

  return (
    <article className="mx-auto max-w-4xl space-y-7 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={review.image_url}
          alt={review.title}
          width={1400}
          height={900}
          className="h-[360px] w-full object-cover md:h-[430px]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5">
          <h1 className="text-2xl font-bold text-white md:text-3xl">{review.title}</h1>
          <p className="mt-2 text-sm text-zinc-200">
            {review.author_name} · {formatDate(review.created_at)}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-50 p-5 text-[15px] leading-8 text-zinc-700 md:p-6">
        {review.content}
      </div>

      <Link
        href="/reviews"
        className="inline-flex items-center rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
      >
        목록으로 돌아가기
      </Link>
    </article>
  );
}
