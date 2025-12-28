"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Introduction" },
  { href: "/courses", label: "Courses" },
  { href: "/projects", label: "Projects" },
  { href: "/feedback", label: "Feedback" },
  { href: "/contact", label: "Contact" },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4 md:gap-6">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-white/10 text-white shadow-sm"
                : "text-white/70 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
