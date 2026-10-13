"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "简介" },
  { href: "/courses", label: "咨询" },
  { href: "/#journey", label: "我的背景" },
];

const blotzLink = { href: "/blotz", label: "AI 实战项目" };

export default function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 md:px-6 md:pt-4">
      <nav className="mx-auto flex max-w-[min(1320px,90vw)] items-center justify-between rounded-full border-2 border-brand-ink bg-white px-4 py-2 shadow-[0_4px_0_0_var(--color-brand-ink)] md:px-5">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-base font-black">
          <span className="h-3 w-3 rounded-full border-2 border-brand-ink bg-brand-lime" />
          马农不卷大厂
        </Link>

        {/* Wide screens: links in a row */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-1.5 text-[15px] font-black transition-colors ${
                pathname === link.href ? "bg-brand-lime-soft" : "hover:bg-brand-ink/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={blotzLink.href}
            className={`ml-2 rounded-full border-2 border-brand-ink px-4 py-1.5 text-[15px] font-black transition-transform hover:-translate-y-0.5 ${
              pathname.startsWith(blotzLink.href) ? "bg-brand-ink text-white" : "bg-brand-lime"
            }`}
          >
            {blotzLink.label}
          </Link>
        </div>

        {/* Phones: a menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="菜单"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-brand-ink bg-brand-lime md:hidden"
        >
          {open ? <X className="h-5 w-5" strokeWidth={3} /> : <Menu className="h-5 w-5" strokeWidth={3} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 flex max-w-[min(1320px,90vw)] origin-top flex-col gap-1 rounded-3xl border-2 border-brand-ink bg-white p-3 shadow-[0_4px_0_0_var(--color-brand-ink)] md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-lg font-black ${
                  pathname === link.href ? "bg-brand-lime-soft" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={blotzLink.href}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-2xl border-2 border-brand-ink bg-brand-lime px-4 py-3 text-center text-lg font-black"
            >
              {blotzLink.label}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
