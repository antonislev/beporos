export default function AboutPage() {
  return (
    <section className="px-6 md:px-10 py-24 max-w-[800px] mx-auto">
      <div className="border-b border-[var(--border)] pb-5 mb-14">
        <h1 className="font-display text-[clamp(28px,4vw,42px)] font-bold tracking-[4px] uppercase">
          ABOUT
        </h1>
      </div>

      <div className="space-y-8 text-[var(--muted)] leading-relaxed font-light">
        <p className="text-lg text-[var(--text)] font-normal">
          BEPOROS is a streetwear label and cultural society born in Athens,
          Greece.
        </p>

        <p>
          We don&apos;t follow fashion calendars. We don&apos;t do seasons. We
          design when the city speaks to us — when something on an Exarcheia
          wall, a conversation in Psyrri, or a sound from a basement bar
          demands to become a garment.
        </p>

        <p>
          Every piece is designed locally, produced in small runs, and sold
          until it&apos;s gone. We don&apos;t restock. We don&apos;t
          mass-produce. If you missed it, you missed it.
        </p>

        <p>
          The society is bigger than the clothes. It&apos;s the people who
          wear them. The streets they walk. The stories they carry.
        </p>

        <p>
          This is not a brand. This is a transmission from the streets of
          Athens.
        </p>

        <div className="pt-8 border-t border-[var(--border)]">
          <h3 className="font-display text-[10px] tracking-[3px] text-[var(--text)] uppercase mb-4">
            CONTACT
          </h3>
          <p className="text-sm">
            For inquiries, collaborations, or stockist info:
          </p>
          <p className="text-sm mt-2">
            <a
              href="mailto:contact@beporos.gr"
              className="hover:text-[var(--accent)] transition-colors"
            >
              contact@beporos.gr
            </a>
          </p>
          <p className="text-sm mt-1">
            <a
              href="https://instagram.com/beporos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
            >
              @beporos
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}