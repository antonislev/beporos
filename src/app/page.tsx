import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/society", label: "SOCIETY" },
  { href: "/artifacts", label: "TEES" },
  { href: "/drops", label: "DROPS" },
  { href: "/about", label: "ABOUT" },
];

export default function HomePage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Logo */}
      <div className="relative w-[220px] h-[72px] md:w-[300px] md:h-[98px] mb-4">
        <Image src="/images/brand/logo.png" alt="Poros Island" fill className="object-contain" sizes="300px" priority />
      </div>

      <p className="font-display text-[10px] tracking-[4px] text-[var(--color-muted)] uppercase mb-14">
        By locals, for locals
      </p>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-4 w-full max-w-[280px]">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="w-full text-center font-display text-[13px] tracking-[3px] uppercase py-4 border border-[var(--color-border)] hover:border-[var(--color-pink)] hover:text-[var(--color-pink)] transition-all font-bold"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* IG */}
      
      <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="mt-12 font-display text-[10px] tracking-[3px] text-[var(--color-pink)] font-bold hover:underline">@BEPOROS</a>

      {/* Location */}
      <span className="absolute bottom-8 font-display text-[9px] tracking-[2px] text-[var(--color-muted)]">
        POROS ISLAND — SARONIC GULF — GREECE
      </span>
    </section>
  );
}