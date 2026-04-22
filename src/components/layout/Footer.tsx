import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-6 md:px-10 py-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-display text-lg font-bold tracking-[4px] mb-4">
              BEPOROS
            </h3>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[280px]">
              Athens street society. Local designs, no seasons, no rules.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-[10px] tracking-[3px] text-[var(--color-muted)] mb-4">
              MENU
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/shop", label: "Shop" },
                { href: "/drops", label: "Drops" },
                { href: "/society", label: "Society" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-[var(--color-accent)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display text-[10px] tracking-[3px] text-[var(--color-muted)] mb-4">
              INFO
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/beporos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-[var(--color-accent)] transition-colors"
              >
                Instagram
              </a>
              <span className="text-sm text-[var(--color-muted)]">
                contact@beporos.gr
              </span>
              <span className="text-sm text-[var(--color-muted)]">
                Athens, Greece
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)]">
            © 2026 BEPOROS
          </span>
          <div className="flex gap-6">
            <Link
              href="/shipping"
              className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              SHIPPING
            </Link>
            <Link
              href="/terms"
              className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              TERMS
            </Link>
            <Link
              href="/privacy"
              className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              PRIVACY
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}