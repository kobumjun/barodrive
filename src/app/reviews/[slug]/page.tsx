import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getReviewBySlug } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function ReviewDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);

  if (!review) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <Image src={review.image_url} alt={review.title} width={1200} height={640} className="h-80 w-full rounded-2xl object-cover" />
      <h1 className="mt-8 text-3xl font-bold">{review.title}</h1>
      <p className="mt-3 text-sm text-zinc-500">{review.author_name} · {formatDate(review.created_at)}</p>
      <div className="mt-6 whitespace-pre-line leading-8 text-zinc-700">{review.content}</div>
      <Link href="/reviews" className="mt-10 inline-block rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold">목록으로 돌아가기</Link>
    </article>
  );
}
