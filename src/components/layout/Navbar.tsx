"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/shop", label: "SHOP" },
  { href: "/drops", label: "DROPS" },
  { href: "/society", label: "SOCIETY" },
  { href: "/about", label: "ABOUT" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const toggleCart = useCartStore((s) => s.toggle);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-[var(--bg)] border-b border-[var(--border)]">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg md:text-xl font-bold tracking-[4px] uppercase"
        >
          BEPOROS
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-[11px] tracking-[2px] uppercase text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleCart}
            className="relative font-display text-[11px] tracking-[2px] uppercase"
          >
            CART
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 w-4 h-4 bg-[var(--accent)] text-white text-[9px] rounded-full flex items-center justify-center font-body">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile: Cart + Burger */}
        <div className="flex md:hidden items-center gap-5">
          <button
            onClick={toggleCart}
            className="relative font-display text-[11px] tracking-[2px] uppercase"
          >
            CART
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 w-4 h-4 bg-[var(--accent)] text-white text-[9px] rounded-full flex items-center justify-center font-body">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col gap-[5px] p-1"
            aria-label="Open menu"
          >
            <span className="block w-[22px] h-[1.5px] bg-[var(--text)]" />
            <span className="block w-[22px] h-[1.5px] bg-[var(--text)]" />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}