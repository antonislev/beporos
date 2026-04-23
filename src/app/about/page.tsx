import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="px-6 md:px-10 py-24 max-w-[800px] mx-auto">
      <div className="border-b border-[var(--color-border)] pb-5 mb-14">
        <span className="font-display text-[9px] tracking-[4px] text-[var(--color-pink)] uppercase block mb-2">
          THE STORY
        </span>
        <h1 className="font-display text-[clamp(28px,4vw,42px)] font-bold tracking-[4px] uppercase">
          ABOUT
        </h1>
      </div>

      <div className="space-y-8 text-[var(--color-muted)] leading-[1.8] font-light">
        <p className="text-lg text-[var(--color-text)] font-normal">
          BEPOROS is not a brand. It&apos;s a passport to the island of Poros, Greece.
        </p>

        <p>
          The name is the mission: <span className="text-[var(--color-pink)]">be Poros</span>.
          Wear the island. Protect the island. Carry its identity wherever you go.
        </p>

        <p>
          Every piece we make is rooted in the culture, history, and people of
          Poros. The 1963 tee is a time capsule. The black tee carries the
          island&apos;s code on its back — don&apos;t pollute, don&apos;t litter, don&apos;t mess
          with Poros Island.
        </p>

        <p>
          We produce in small runs. When a piece is gone, it&apos;s gone. We don&apos;t
          restock. We don&apos;t do seasons. We drop when the island tells us to.
        </p>

        <p>
          By locals. For locals. And for anyone who&apos;s felt the pull of this
          island and wants to carry a piece of it with them.
        </p>

        <div className="pt-10 border-t border-[var(--color-border)]">
          <h3 className="font-display text-[10px] tracking-[3px] text-[var(--color-pink)] uppercase mb-6">
            CONNECT
          </h3>
          <div className="flex flex-col gap-3">
            <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[var(--color-pink)] transition-colors">@beporos on Instagram</a>
            <span className="text-sm">Poros Island, Greece</span>
          </div>
        </div>
      </div>
    </section>
  );
}