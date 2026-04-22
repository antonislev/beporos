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
    <div className="fixed inset-0 z-[60] bg-[var(--bg)] flex flex-col items-center justify-center gap-10">
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-2xl font-light"
        aria-label="Close menu"
      >
        ✕
      </button>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="font-display text-sm tracking-[3px] uppercase hover:text-[var(--accent)] transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}