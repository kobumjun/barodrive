"use client";

import { FormEvent, useMemo, useState } from "react";
import { KAKAO_CHAT_URL } from "@/lib/constants";
import { toPhoneLink } from "@/lib/site-settings";

const trainingTypes = ["자차", "연수차 승용", "연수차 SUV"];

export function InquiryForm({ phoneNumber }: { phoneNumber: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const trainingType = String(formData.get("training_type") ?? "");
    const desiredSchedule = String(formData.get("desired_schedule") ?? "");
    const message = String(formData.get("message") ?? "");

    const smsBody = [
      "[바로드라이브 연수 신청]",
      `이름: ${name}`,
      `연락처: ${phone}`,
      `희망 연수 종류: ${trainingType}`,
      `희망 일정: ${desiredSchedule}`,
      `문의내용: ${message || "없음"}`,
    ].join("\n");

    const smsDigits = phoneNumber.replace(/[^0-9]/g, "");
    const smsUrl = `sms:${smsDigits}?body=${encodeURIComponent(smsBody)}`;

    setLoading(false);

    if (isMobile) {
      window.location.href = smsUrl;
      return;
    }

    setResult("PC에서는 문자앱이 자동 실행되지 않을 수 있습니다. 모바일에서 신청해 주세요.");
    window.open(smsUrl, "_self");
  }

  return (
    <section id="inquiry-form" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 md:p-8">
      <h3 className="text-2xl font-bold text-zinc-900">연수 신청하기</h3>
      <p className="mt-2 text-sm text-zinc-600">정보를 남겨주시면 문자앱에서 신청 내용이 자동으로 작성됩니다.</p>
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
        <input name="region" placeholder="희망 지역" className="rounded-xl border border-zinc-200 px-4 py-3" />
        <input name="desired_schedule" required placeholder="희망 날짜/시간" className="rounded-xl border border-zinc-200 px-4 py-3" />
        <textarea name="message" placeholder="문의 내용" className="min-h-30 rounded-xl border border-zinc-200 px-4 py-3 md:col-span-2" />
        <button disabled={loading} className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:opacity-60">
          {loading ? "연결 중..." : "신청 접수"}
        </button>
      </form>
      {result ? <p className="mt-4 text-sm font-medium text-zinc-800">{result}</p> : null}
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <a href={toPhoneLink(phoneNumber)} className="rounded-full bg-zinc-900 px-4 py-2 font-semibold text-white">전화문의 {phoneNumber}</a>
        <a href={KAKAO_CHAT_URL} target="_blank" rel="noreferrer" className="rounded-full border border-zinc-300 px-4 py-2 font-semibold text-zinc-800">카카오톡 상담</a>
      </div>
    </section>
  );
}
