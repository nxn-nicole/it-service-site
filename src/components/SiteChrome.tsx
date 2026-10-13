"use client";

import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import MainNav from "@/components/MainNav";
import { ScrollProgress } from "@/components/kit";

// Focused pages that are sent to people as a link and skip the site menu.
const standalonePaths = ["/join"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const standalone = standalonePaths.includes(pathname);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <div className="flex min-h-screen flex-col overflow-x-clip">
        {!standalone && <MainNav />}
        <main className="flex-1">{children}</main>
        <footer className="px-6 py-8 text-center text-sm font-bold text-brand-muted">© 马农不卷大厂</footer>
      </div>
    </MotionConfig>
  );
}
