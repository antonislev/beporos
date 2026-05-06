export default function AboutPage() {
  return (
    <section className="px-6 md:px-10 py-24 max-w-[700px] mx-auto">
      <div className="mb-10">
        <h1 className="font-display text-[clamp(28px,4vw,38px)] font-bold tracking-[3px] uppercase">
          ABOUT
        </h1>
      </div>

      <div className="space-y-6 text-[var(--color-muted)] leading-[1.8]">
        <p className="text-[var(--color-text)] text-lg font-medium">
          Poros Island is a streetwear brand from Poros, a small island in the Saronic Gulf near Athens. Population about 4,000.
        </p>

        <p>
          We were born and raised here. This is not a tourist brand. It is not resort wear. It is not Santorini sunsets on a tote bag.
        </p>

        <p>
          Summer 2025 we made the MAP tees — the island silhouette with all the local spots labeled. Love Bay, Kanali, Russian Bay, The View. Names tourists don&apos;t know. Gave out every one through Instagram DMs and in-person on the island. No website, no ads, no platform.
        </p>

        <p>
          Summer 2026 is two new tees: the activist tee (Protect the sea) and the 1963 tee (Poros as a love story). Limited units each. Same approach — drop it, give it on the island and through DMs.
        </p>

        <p>
          The brand is a badge of belonging. If you&apos;re from Poros, you get it. If you summer here every year, you get it. If you don&apos;t know the island — come find out.
        </p>

        <div className="pt-8 border-t border-[var(--color-border)]">
          <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="text-[var(--color-pink)] hover:underline">@beporos</a>
          <p className="text-sm mt-2">Poros Island, Saronic Gulf, Greece</p>
        </div>
      </div>
    </section>
  );
}