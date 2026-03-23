import Link from "next/link";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import { getPublishedReviews } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function ReviewsPage() {
  const reviews = await getPublishedReviews();

  return (
    <div>
      <SectionTitle eyebrow="수강생 후기" title="실제 수강생의 변화와 만족 후기" />
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <Link key={review.id} href={`/reviews/${review.slug}`} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
            <Image src={review.image_url} alt={review.title} width={600} height={320} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold">{review.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{review.excerpt}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                <span>{review.author_name}</span>
                <span>{formatDate(review.created_at)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
