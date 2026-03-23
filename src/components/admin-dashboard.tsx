"use client";

import { FormEvent, useMemo, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import { formatDate, slugify } from "@/lib/utils";
import { Inquiry, PricingItem, Review } from "@/types";

type Tab = "pricing" | "reviews" | "inquiries";

const imageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSize = 5 * 1024 * 1024;

function createStoragePath(file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const random = crypto.randomUUID().slice(0, 8);
  return `uploads/${file.lastModified}-${random}-${safeName}`;
}

export function AdminDashboard({
  initialPricing,
  initialReviews,
  initialInquiries,
}: {
  initialPricing: PricingItem[];
  initialReviews: Review[];
  initialInquiries: Inquiry[];
}) {
  const [tab, setTab] = useState<Tab>("pricing");
  const [pricing, setPricing] = useState(initialPricing);
  const [reviews, setReviews] = useState(initialReviews);
  const [inquiries] = useState(initialInquiries);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [storagePath, setStoragePath] = useState("");

  const pricingMap = useMemo(() => Object.fromEntries(pricing.map((item) => [item.key, item.price])), [pricing]);

  async function savePricing() {
    const response = await fetch("/api/admin/pricing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pricingMap),
    });

    setMessage(response.ok ? "가격 저장 완료" : "가격 저장 실패");
  }

  async function handleImageUpload(file: File) {
    if (!imageTypes.includes(file.type)) {
      setMessage("이미지는 jpg/jpeg/png/webp만 가능합니다.");
      return;
    }
    if (file.size > maxImageSize) {
      setMessage("이미지는 최대 5MB까지 업로드 가능합니다.");
      return;
    }

    setUploading(true);
    const supabase = getSupabaseClient();
    const path = createStoragePath(file);
    const { error } = await supabase.storage.from("reviews").upload(path, file, { upsert: true });

    if (error) {
      setUploading(false);
      setMessage(`이미지 업로드 실패: ${error.message}`);
      return;
    }

    const { data } = supabase.storage.from("reviews").getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setStoragePath(path);
    setUploading(false);
    setMessage("이미지 업로드 완료");
  }

  async function replaceReviewImage(review: Review, file: File) {
    if (!imageTypes.includes(file.type) || file.size > maxImageSize) {
      setMessage("교체 이미지는 jpg/jpeg/png/webp, 5MB 이하만 가능합니다.");
      return;
    }
    const supabase = getSupabaseClient();
    const newPath = createStoragePath(file);
    const { error } = await supabase.storage.from("reviews").upload(newPath, file, { upsert: true });
    if (error) {
      setMessage(`이미지 교체 실패: ${error.message}`);
      return;
    }

    const { data } = supabase.storage.from("reviews").getPublicUrl(newPath);
    await fetch(`/api/admin/reviews/${review.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: data.publicUrl, storage_path: newPath }),
    });

    if (review.storage_path) {
      await supabase.storage.from("reviews").remove([review.storage_path]);
    }

    setReviews((prev) =>
      prev.map((item) =>
        item.id === review.id ? { ...item, image_url: data.publicUrl, storage_path: newPath } : item,
      ),
    );
    setMessage("후기 이미지 교체 완료");
  }

  async function createReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const payload = {
      title: String(data.title),
      slug: slugify(String(data.title)),
      excerpt: String(data.excerpt),
      content: String(data.content),
      author_name: String(data.author_name),
      created_at: String(data.created_at),
      image_url: imageUrl,
      storage_path: storagePath,
      is_published: true,
    };

    const response = await fetch("/api/admin/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setMessage("후기 저장 실패");
      return;
    }

    const created = await response.json();
    setMessage("후기 저장 완료");
    form.reset();
    setImageUrl("");
    setStoragePath("");
    if (created.review) {
      setReviews((prev) => [created.review, ...prev]);
    } else {
      location.reload();
    }
  }

  async function deleteReview(id: string) {
    const target = reviews.find((item) => item.id === id);
    if (target?.storage_path) {
      const supabase = getSupabaseClient();
      await supabase.storage.from("reviews").remove([target.storage_path]);
    }
    const response = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    if (response.ok) {
      setReviews((prev) => prev.filter((item) => item.id !== id));
      setMessage("후기 삭제 완료");
    } else {
      setMessage("후기 삭제 실패");
    }
  }

  async function editReview(review: Review) {
    const title = window.prompt("새 제목", review.title);
    if (!title) return;
    const excerpt = window.prompt("새 요약", review.excerpt);
    if (!excerpt) return;
    const content = window.prompt("새 본문", review.content);
    if (!content) return;

    const response = await fetch(`/api/admin/reviews/${review.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        excerpt,
        content,
        slug: slugify(title),
      }),
    });

    if (!response.ok) {
      setMessage("후기 수정 실패");
      return;
    }
    setReviews((prev) =>
      prev.map((item) =>
        item.id === review.id
          ? { ...item, title, excerpt, content, slug: slugify(title) }
          : item,
      ),
    );
    setMessage("후기 수정 완료");
  }

  async function removeReviewImage(review: Review) {
    const supabase = getSupabaseClient();
    if (review.storage_path) {
      await supabase.storage.from("reviews").remove([review.storage_path]);
    }
    const fallbackImage =
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80";
    const response = await fetch(`/api/admin/reviews/${review.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: fallbackImage, storage_path: null }),
    });
    if (!response.ok) {
      setMessage("이미지 삭제 실패");
      return;
    }
    setReviews((prev) =>
      prev.map((item) =>
        item.id === review.id ? { ...item, image_url: fallbackImage, storage_path: null } : item,
      ),
    );
    setMessage("이미지 삭제 완료");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    location.reload();
  }

  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200">
        <p className="mb-4 text-sm font-semibold text-zinc-500">관리 메뉴</p>
        <div className="space-y-2">
          {[
            ["pricing", "연수 가격"],
            ["reviews", "후기 관리"],
            ["inquiries", "신청 내역"],
          ].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key as Tab)} className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold ${tab === key ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-700"}`}>
              {label}
            </button>
          ))}
        </div>
        <button onClick={logout} className="mt-6 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm font-semibold">로그아웃</button>
      </aside>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
        {tab === "pricing" ? (
          <div>
            <h2 className="text-xl font-bold">연수 가격 수정</h2>
            <div className="mt-4 grid gap-3">
              {pricing.map((item) => (
                <label key={item.key} className="grid gap-2 text-sm">
                  <span className="font-semibold">{item.label}</span>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(event) =>
                      setPricing((prev) =>
                        prev.map((target) => (target.key === item.key ? { ...target, price: Number(event.target.value) } : target)),
                      )
                    }
                    className="rounded-lg border border-zinc-200 px-3 py-2"
                  />
                </label>
              ))}
            </div>
            <button onClick={savePricing} className="mt-4 rounded-lg bg-amber-500 px-4 py-2 font-semibold">가격 저장</button>
          </div>
        ) : null}

        {tab === "reviews" ? (
          <div>
            <h2 className="text-xl font-bold">후기 추가</h2>
            <form onSubmit={createReview} className="mt-4 grid gap-3">
              <input name="title" required placeholder="제목" className="rounded-lg border border-zinc-200 px-3 py-2" />
              <input name="excerpt" required placeholder="요약" className="rounded-lg border border-zinc-200 px-3 py-2" />
              <textarea name="content" required placeholder="본문" className="min-h-32 rounded-lg border border-zinc-200 px-3 py-2" />
              <div className="grid gap-3 md:grid-cols-2">
                <input name="author_name" required placeholder="작성자 (예: 김**)" className="rounded-lg border border-zinc-200 px-3 py-2" />
                <input name="created_at" type="date" required className="rounded-lg border border-zinc-200 px-3 py-2" />
              </div>
              <label className="text-sm font-semibold">후기 이미지 (최대 5MB)</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void handleImageUpload(file);
                  }
                }}
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              />
              {imageUrl ? (
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="preview" className="h-20 w-24 rounded object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl("");
                      setStoragePath("");
                    }}
                    className="rounded border border-zinc-300 px-3 py-1 text-sm"
                  >
                    이미지 제거
                  </button>
                </div>
              ) : null}
              <button disabled={uploading || !imageUrl} className="rounded-lg bg-zinc-900 px-4 py-2 font-semibold text-white disabled:opacity-60">
                {uploading ? "업로드 중..." : "후기 저장"}
              </button>
            </form>

            <h3 className="mt-8 text-lg font-bold">기존 후기</h3>
            <div className="mt-3 space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3">
                  <div>
                    <p className="font-semibold">{review.title}</p>
                    <p className="text-xs text-zinc-500">{review.author_name} · {formatDate(review.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer rounded border border-zinc-300 px-2 py-1 text-xs font-semibold">
                      이미지 교체
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            void replaceReviewImage(review, file);
                          }
                        }}
                      />
                    </label>
                    <button onClick={() => editReview(review)} className="rounded border border-zinc-300 px-3 py-1 text-sm font-semibold">수정</button>
                    <button onClick={() => removeReviewImage(review)} className="rounded border border-zinc-300 px-3 py-1 text-sm font-semibold">이미지 삭제</button>
                    <button onClick={() => deleteReview(review.id)} className="rounded border border-red-300 px-3 py-1 text-sm font-semibold text-red-600">삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === "inquiries" ? (
          <div>
            <h2 className="text-xl font-bold">신청폼 접수 내역</h2>
            <div className="mt-4 overflow-auto rounded-xl border border-zinc-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-zinc-100 text-zinc-700">
                  <tr>
                    <th className="p-3">이름</th>
                    <th className="p-3">연락처</th>
                    <th className="p-3">연수종류</th>
                    <th className="p-3">지역</th>
                    <th className="p-3">희망시간</th>
                    <th className="p-3">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((item) => (
                    <tr key={item.id} className="border-t border-zinc-100">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.phone}</td>
                      <td className="p-3">{item.training_type}</td>
                      <td className="p-3">{item.region}</td>
                      <td className="p-3">{item.desired_schedule}</td>
                      <td className="p-3">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {message ? <p className="mt-4 text-sm font-semibold text-zinc-700">{message}</p> : null}
      </section>
    </div>
  );
}
