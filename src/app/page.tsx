"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "#", label: "SOCIETY", color: "#9a9490", bg: "", disabled: true },
  { href: "/artifacts", label: "TEES", color: "#3d6b9e", bg: "radial-gradient(circle at 50% 50%, rgba(61,107,158,0.15) 0%, transparent 70%)" },
  { href: "/drops", label: "DROPS", color: "#e8729a", bg: "radial-gradient(circle at 50% 50%, rgba(232,114,154,0.12) 0%, transparent 70%)" },
  { href: "/about", label: "ABOUT", color: "#9a9490", bg: "radial-gradient(circle at 50% 50%, rgba(154,148,144,0.1) 0%, transparent 70%)" },
];

export default function HomePage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const activeLink = LINKS.find((l) => l.label === hovered);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background glow that follows mouse on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          background: activeLink
            ? `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, ${activeLink.color}15, transparent 60%)`
            : "none",
        }}
      />

      {/* Glitch lines on hover */}
      {hovered && (
        <>
          <div className="absolute left-0 right-0 h-[1px] pointer-events-none" style={{ top: `${mousePos.y - 10}%`, background: `linear-gradient(90deg, transparent, ${activeLink?.color}30, transparent)`, animation: "glitchLine 0.3s ease infinite alternate" }} />
          <div className="absolute left-0 right-0 h-[1px] pointer-events-none" style={{ top: `${mousePos.y + 10}%`, background: `linear-gradient(90deg, transparent, ${activeLink?.color}20, transparent)`, animation: "glitchLine 0.5s ease infinite alternate-reverse" }} />
        </>
      )}

      {/* Logo */}
      <div className={`relative w-[220px] h-[72px] md:w-[300px] md:h-[98px] mb-4 transition-all duration-500 ${hovered ? "scale-95 opacity-60" : "scale-100 opacity-100"}`}>
        <Image src="/images/brand/logo.png" alt="Poros Island" fill className="object-contain" sizes="300px" priority />
      </div>

      <p className={`font-display text-[10px] tracking-[4px] text-[var(--color-muted)] uppercase mb-14 transition-all duration-500 ${hovered ? "opacity-30 tracking-[8px]" : "opacity-100"}`}>
        By locals, for locals
      </p>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-3 w-full max-w-[320px] relative z-10">
        {LINKS.map((link) => 
          link.disabled ? (
            <div
              key={link.label}
              className="w-full text-center font-display text-[14px] tracking-[4px] uppercase py-5 border border-[var(--color-border)] font-bold relative overflow-hidden opacity-40 cursor-not-allowed"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="block font-display text-[9px] tracking-[2px] text-[var(--color-muted)] mt-1">COMING SOON</span>
            </div>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.label)}
              onMouseLeave={() => setHovered(null)}
              className="w-full text-center font-display text-[14px] tracking-[4px] uppercase py-5 border border-[var(--color-border)] font-bold relative overflow-hidden group transition-all duration-300"
              style={{
                borderColor: hovered === link.label ? link.color : undefined,
                color: hovered === link.label ? link.color : undefined,
              }}
            >
              <span
                className="absolute inset-0 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                style={{ background: `${link.color}10` }}
              />
              <span
                className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 scale-y-0 group-hover:scale-y-100"
                style={{ background: link.color }}
              />
              <span className="relative z-10">{link.label}</span>
            </Link>
          )
        )}
      </div>

      {/* IG */}
      <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className={`mt-12 font-display text-[10px] tracking-[3px] text-[var(--color-pink)] font-bold hover:underline transition-all duration-500 ${hovered ? "opacity-40" : "opacity-100"}`}>@BEPOROS</a>

      {/* Location */}
      <span className={`absolute bottom-8 font-display text-[9px] tracking-[2px] text-[var(--color-muted)] transition-all duration-500 ${hovered ? "opacity-20" : "opacity-60"}`}>
        POROS ISLAND — SARONIC GULF — GREECE
      </span>
    </section>
  );
}