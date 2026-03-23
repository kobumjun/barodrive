import { BRAND, PHONE_DISPLAY } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-zinc-950 py-10 text-zinc-300">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 text-sm md:px-6">
        <p className="text-base font-semibold text-white">{BRAND}</p>
        <p>프리미엄 1:1 운전 코칭 서비스 | 상담번호 {PHONE_DISPLAY}</p>
        <p>주소: 강남구 강남대로 92길 31, 615호</p>
        <p className="text-zinc-500">초보 운전자도 안심할 수 있는 맞춤형 커리큘럼과 안전 중심 수업을 제공합니다.</p>
      </div>
    </footer>
  );
}
