import Link from "next/link";
import { KAKAO_CHAT_URL, PHONE_LINK } from "@/lib/constants";

const buttonBase =
  "inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-bold shadow-lg transition duration-200 hover:-translate-y-0.5";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-4 right-3 z-50 flex flex-col gap-2 sm:right-4">
      <Link
        href="/pricing#inquiry-form"
        className={`${buttonBase} bg-gradient-to-r from-amber-400 to-orange-400 text-zinc-900 shadow-amber-300/60 hover:from-amber-300 hover:to-orange-300`}
      >
        연수신청
      </Link>
      <a
        href={KAKAO_CHAT_URL}
        target="_blank"
        rel="noreferrer"
        className={`${buttonBase} bg-zinc-900 text-white shadow-zinc-400/40 hover:bg-zinc-800`}
      >
        카카오톡 상담
      </a>
      <a
        href={PHONE_LINK}
        className={`${buttonBase} border border-zinc-300 bg-white text-zinc-900 shadow-zinc-300/50 hover:bg-zinc-100`}
      >
        전화문의
      </a>
    </div>
  );
}
