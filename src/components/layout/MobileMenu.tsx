"use client";

import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-[var(--color-bg)] flex flex-col items-center justify-center gap-10">
      <button onClick={onClose} className="absolute top-5 right-6 font-display text-[11px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors" aria-label="Close menu">
        CLOSE
      </button>
      {links.map((link) => (
        <Link key={link.href} href={link.href} onClick={onClose} className="font-display text-lg tracking-[4px] uppercase hover:text-[var(--color-pink)] transition-colors">
          {link.label}
        </Link>
      ))}
      <div className="w-[40px] h-[1px] bg-[var(--color-border)] mt-4" />
      <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="font-display text-[10px] tracking-[3px] text-[var(--color-pink)]">
        @BEPOROS
      </a>
    </div>
  );
}