import Link from "next/link";
import { ClipboardList, MessageCircle, Phone } from "lucide-react";
import { KAKAO_CHAT_URL } from "@/lib/constants";
import { toPhoneLink } from "@/lib/site-settings";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(0,0,0,0.08)] px-4 py-2.5 text-sm font-extrabold shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5";

export function FloatingCTA({ phoneNumber }: { phoneNumber: string }) {
  return (
    <div className="fixed bottom-5 right-3 z-[90] flex flex-col gap-2 sm:bottom-4 sm:right-4">
      <Link
        href="/pricing#inquiry-form"
        className={`${buttonBase} bg-[#22C55E] text-white hover:bg-[#16A34A]`}
      >
        <ClipboardList size={16} />
        연수신청
      </Link>
      <a
        href={KAKAO_CHAT_URL}
        target="_blank"
        rel="noreferrer"
        className={`${buttonBase} bg-[#FEE500] text-[#111111] hover:bg-[#F2DA00]`}
      >
        <MessageCircle size={16} />
        카카오톡 상담
      </a>
      <a
        href={toPhoneLink(phoneNumber)}
        className={`${buttonBase} bg-[#2563EB] text-white hover:bg-[#1D4ED8]`}
      >
        <Phone size={16} />
        전화문의
      </a>
    </div>
  );
}
