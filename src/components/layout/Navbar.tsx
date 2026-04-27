"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/society", label: "SOCIETY" },
  { href: "/artifacts", label: "TEES" },
  { href: "/drops", label: "DROPS" },
  { href: "/about", label: "ABOUT" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
        <Link href="/" className="relative w-[90px] h-[30px] md:w-[110px] md:h-[36px]">
          <Image src="/images/brand/logo.png" alt="beporos" fill className="object-contain object-left" sizes="110px" priority />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="font-display text-[11px] tracking-[2px] uppercase text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors font-bold">
              {link.label}
            </Link>
          ))}
          <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="font-display text-[10px] tracking-[2px] text-[var(--color-pink)] font-bold">
            IG
          </a>
        </div>

        <button onClick={() => setMobileOpen(true)} className="flex md:hidden flex-col gap-[5px] p-1" aria-label="Menu">
          <span className="block w-[22px] h-[1.5px] bg-[var(--color-text)]" />
          <span className="block w-[22px] h-[1.5px] bg-[var(--color-text)]" />
        </button>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
    </>
  );
}