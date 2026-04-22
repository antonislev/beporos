export default function AboutPage() {
  return (
    <section className="px-6 md:px-10 py-24 max-w-[800px] mx-auto">
      <div className="border-b border-[var(--color-border)] pb-5 mb-14">
        <h1 className="font-display text-[clamp(28px,4vw,42px)] font-bold tracking-[4px] uppercase">
          ABOUT
        </h1>
      </div>

      <div className="space-y-8 text-[var(--color-muted)] leading-relaxed font-light">
        <p className="text-lg text-[var(--color-text)] font-normal">
          BEPOROS is a streetwear label born on the island of Poros, Greece.
          By locals, for locals.
        </p>

        <p>
          The name says it: be Poros. Wear the island. Carry it with you
          wherever you go. Every design comes from the culture, the
          history, and the people of this place.
        </p>

        <p>
          We don&apos;t mass-produce. We drop limited pieces and when
          they&apos;re gone, they&apos;re gone. If you missed it, you
          missed it.
        </p>

        <p>
          Don&apos;t pollute its waters. Don&apos;t litter on its streets.
          Don&apos;t mess with Poros Island.
        </p>

        <div className="pt-8 border-t border-[var(--color-border)]">
          <h3 className="font-display text-[10px] tracking-[3px] text-[var(--color-text)] uppercase mb-4">
            CONTACT
          </h3>
          <p className="text-sm mt-2">
            <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">@beporos</a>
          </p>
        </div>
      </div>
    </section>
  );
}