import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainNav from "@/components/MainNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "马农不卷大厂",
  description: "IT 学习网站：简介、课程与项目展示。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased selection:bg-white/10`}
      >
        {/* Global Background Elements - Moved outside to ensure z-index works correctly */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030303]">
          {/* Noise Base */}
          <div className="absolute inset-0 bg-noise opacity-[0.12] mix-blend-overlay" />
          
          {/* The Grid - More Visible */}
          <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-70" />

          {/* Dynamic Mesh Gradients - Much Stronger and More Colorful */}
          <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-blue-600/[0.15] blur-[160px] rounded-full animate-pulse duration-[10s]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-purple-600/[0.15] blur-[160px] rounded-full animate-pulse duration-[12s]" />
          <div className="absolute top-[10%] right-[0%] w-[70%] h-[70%] bg-indigo-500/[0.12] blur-[140px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/[0.06] blur-[180px] rounded-full" />
          <div className="absolute top-[30%] left-[20%] w-[50%] h-[50%] bg-blue-400/[0.08] blur-[120px] rounded-full" />
          
          {/* Texture */}
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </div>

        <div className="min-h-screen relative z-10">
          <header className="sticky top-0 z-50">
            <div className="mx-auto flex max-w-6xl items-center justify-end px-6 py-6">
              <MainNav />
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>

          <footer className="mt-12 border-t border-white/10 bg-black/60">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">©</span>
                <span>澳洲软件工程师</span>
              </div>

              <div className="flex items-center gap-6">
                <a className="hover:text-white" href="#">
                  使用条款
                </a>
                <a className="hover:text-white" href="#">
                  隐私政策
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
