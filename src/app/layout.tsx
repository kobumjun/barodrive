import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingCTA } from "@/components/floating-cta";

const noto = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "바로드라이브 | 프리미엄 1:1 운전 코칭",
  description: "초보/장롱면허를 위한 프리미엄 맞춤 도로연수 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${noto.className} min-h-full bg-zinc-50 text-zinc-900`}>
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-10 md:px-6">{children}</main>
        <SiteFooter />
        <FloatingCTA />
      </body>
    </html>
  );
}
