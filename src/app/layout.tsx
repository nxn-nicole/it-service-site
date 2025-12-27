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
        </div>
      </body>
    </html>
  );
}
