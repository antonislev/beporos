import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-6 md:px-10 py-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-display text-[11px] tracking-[4px] text-[var(--color-pink)] mb-4">
              BEPOROS
            </h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[280px] font-light">
              By locals, for locals. Poros Island, Greece.
            </p>
          </div>

          <div>
            <h4 className="font-display text-[10px] tracking-[3px] text-[var(--color-muted)] mb-4">NAVIGATE</h4>
            <div className="flex flex-col gap-3">
              {[{href: "/shop", label: "Artifacts"}, {href: "/drops", label: "Drops"}, {href: "/society", label: "Society"}, {href: "/about", label: "About"}].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors font-light">{link.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-[10px] tracking-[3px] text-[var(--color-muted)] mb-4">CONNECT</h4>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors font-light">Instagram</a>
              <span className="text-sm text-[var(--color-muted)] font-light">Poros Island, Greece</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)]">
            © 2026 BEPOROS — DON&apos;T MESS WITH POROS ISLAND
          </span>
        </div>
      </div>
    </footer>
  );
}