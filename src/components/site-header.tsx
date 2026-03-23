"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/constants";

const menus = [
  { href: "/curriculum", label: "커리큘럼 안내" },
  { href: "/pricing", label: "연수가격/신청" },
  { href: "/regions", label: "연수지역" },
  { href: "/reviews", label: "수강생 후기" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

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

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 md:hidden"
          aria-label="모바일 메뉴 열기"
          onClick={() => setOpen(true)}
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[70] md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-[84%] max-w-xs bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between border-b border-zinc-200 pb-4">
              <span className="font-bold text-zinc-900">{BRAND}</span>
              <button
                type="button"
                className="rounded-lg border border-zinc-200 px-2 py-1 text-sm font-semibold"
                onClick={() => setOpen(false)}
              >
                닫기
              </button>
            </div>
            <nav className="space-y-2">
              {menus.map((menu) => (
                <Link
                  key={menu.href}
                  href={menu.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
                >
                  {menu.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
