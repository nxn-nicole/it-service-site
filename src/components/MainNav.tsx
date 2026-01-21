"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "简介" },
  { href: "/courses", label: "服务" },
  { href: "/#journey", label: "项目历程" },
  { href: "/contact", label: "联系" },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-10 px-10 py-4 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      {links.map((link) => {
        // Fix: Simplified active logic to avoid multiple active items
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative text-base font-bold transition-all duration-300 ${
              isActive 
                ? "text-white" 
                : "text-white/40 hover:text-white/80"
            }`}
          >
            <span className="relative z-10 tracking-widest">{link.label}</span>
            {isActive && (
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-white/80 to-transparent shadow-[0_0_15px_white]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
