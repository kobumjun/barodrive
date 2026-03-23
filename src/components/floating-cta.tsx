import Link from "next/link";
import { KAKAO_CHAT_URL, PHONE_LINK } from "@/lib/constants";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Link href="/pricing#inquiry-form" className="rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-zinc-950 shadow-lg transition hover:bg-amber-400">
        연수신청
      </Link>
      <a href={KAKAO_CHAT_URL} target="_blank" rel="noreferrer" className="rounded-full bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-zinc-700">
        카카오톡 상담
      </a>
      <a href={PHONE_LINK} className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-lg ring-1 ring-zinc-300 transition hover:bg-zinc-100">
        전화문의
      </a>
    </div>
  );
}
