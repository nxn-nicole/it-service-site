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
  title: "Skill Hub",
  description: "IT learning site with introduction, courses, and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        <div className="min-h-screen bg-black text-white">
          <header className="border-b border-white/10">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <div className="text-lg font-semibold tracking-tight">
                Skill Hub
              </div>
              <MainNav />
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>

          <footer className="mt-12 border-t border-white/10 bg-black/60">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">©</span>
                <span>澳洲软体工程师</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                {[
                  "YouTube",
                  "Twitter",
                  "Facebook",
                  "LinkedIn",
                  "Instagram",
                  "TikTok",
                ].map((name) => (
                  <span
                    key={name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-medium uppercase tracking-wide transition hover:border-white/40 hover:text-white"
                    aria-label={name}
                  >
                    {name[0]}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6">
                <a className="hover:text-white" href="#">
                  Terms of Use
                </a>
                <a className="hover:text-white" href="#">
                  Privacy Policy
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
