export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-6 md:px-10 py-10 mt-10">
      <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="font-display text-[11px] tracking-[3px] font-bold">BEPOROS</span>
          <p className="text-sm text-[var(--color-muted)] mt-1">Poros Island, Saronic Gulf, Greece</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="font-display text-[10px] tracking-[2px] text-[var(--color-pink)] font-bold hover:underline">@BEPOROS</a>
          <span className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)]">© 2026</span>
          <span className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)]">MADE BY <a href="https://www.linkedin.com/in/antonislev/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-pink)] hover:underline">@ANTONISLEV</a></span>
        </div>
      </div>
    </footer>
  );
}