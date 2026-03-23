import Link from "next/link";
import { BRAND } from "@/lib/constants";

const menus = [
  { href: "/curriculum", label: "커리큘럼 안내" },
  { href: "/pricing", label: "연수가격/신청" },
  { href: "/regions", label: "연수지역" },
  { href: "/reviews", label: "수강생 후기" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
          {BRAND}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 md:flex">
          {menus.map((menu) => (
            <Link key={menu.href} href={menu.href} className="transition hover:text-zinc-900">
              {menu.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
