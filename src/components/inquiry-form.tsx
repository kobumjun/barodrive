"use client";

import { FormEvent, useState } from "react";
import { KAKAO_CHAT_URL, PHONE_DISPLAY, PHONE_LINK } from "@/lib/constants";

const trainingTypes = ["자차", "연수차 승용", "연수차 SUV"];

export function InquiryForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!response.ok) {
      setResult("접수에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setResult("신청이 정상적으로 접수되었습니다. 빠르게 연락드릴게요.");
    form.reset();
  }

  return (
    <section id="inquiry-form" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 md:p-8">
      <h3 className="text-2xl font-bold text-zinc-900">연수 신청하기</h3>
      <p className="mt-2 text-sm text-zinc-600">정보를 남겨주시면 맞춤 코칭 상담을 도와드립니다.</p>
      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <input name="name" required placeholder="이름" className="rounded-xl border border-zinc-200 px-4 py-3" />
        <input name="phone" required placeholder="연락처" className="rounded-xl border border-zinc-200 px-4 py-3" />
        <select name="training_type" required className="rounded-xl border border-zinc-200 px-4 py-3">
          <option value="">희망 연수 종류 선택</option>
          {trainingTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input name="region" required placeholder="희망 지역" className="rounded-xl border border-zinc-200 px-4 py-3" />
        <input name="desired_schedule" required placeholder="희망 날짜/시간" className="rounded-xl border border-zinc-200 px-4 py-3" />
        <textarea name="message" placeholder="문의 내용" className="min-h-30 rounded-xl border border-zinc-200 px-4 py-3 md:col-span-2" />
        <button disabled={loading} className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:opacity-60">
          {loading ? "접수 중..." : "신청 접수"}
        </button>
      </form>
      {result ? <p className="mt-4 text-sm font-medium text-zinc-800">{result}</p> : null}
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <a href={PHONE_LINK} className="rounded-full bg-zinc-900 px-4 py-2 font-semibold text-white">전화문의 {PHONE_DISPLAY}</a>
        <a href={KAKAO_CHAT_URL} target="_blank" rel="noreferrer" className="rounded-full border border-zinc-300 px-4 py-2 font-semibold text-zinc-800">카카오톡 상담</a>
      </div>
    </section>
  );
}
