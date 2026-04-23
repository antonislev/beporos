import Link from "next/link";
import Image from "next/image";
import { societyPosts } from "@/lib/society";

const TAG_COLORS: Record<string, string> = {
  manifesto: "var(--color-pink)",
  announcement: "var(--color-pink)",
  event: "var(--color-blue)",
  culture: "var(--color-text)",
  news: "var(--color-text)",
  recap: "var(--color-muted)",
};

export default function HomePage() {
  const pinned = societyPosts.filter((p) => p.pinned);
  const feed = societyPosts.filter((p) => !p.pinned);
  const events = societyPosts.filter((p) => p.tag === "event");

  return (
    <>
      {/* HERO — compact, culture-forward */}
      <section className="px-6 md:px-10 pt-28 pb-16 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="relative w-[200px] h-[65px] md:w-[280px] md:h-[90px] mb-5">
              <Image src="/images/brand/logo.png" alt="Poros Island" fill className="object-contain object-left" sizes="280px" priority />
            </div>
            <p className="text-sm text-[var(--color-muted)] font-light leading-relaxed max-w-[400px]">
              Culture, events, and transmissions from Poros Island.
              By locals, for locals.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/artifacts" className="font-display text-[10px] tracking-[3px] uppercase px-6 py-3 border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-pink)] hover:text-[var(--color-pink)] transition-all">
              ARTIFACTS
            </Link>
            <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="font-display text-[10px] tracking-[3px] uppercase px-6 py-3 bg-[var(--color-pink)] text-[var(--color-text-inv)] hover:bg-[var(--color-pink-hover)] transition-all">
              @BEPOROS
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-4 border-y border-[var(--color-border)] overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap" style={{ animation: "scroll 25s linear infinite" }}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className="font-display text-[10px] tracking-[4px] text-[var(--color-muted)] uppercase flex-shrink-0">
              DON&apos;T POLLUTE ✦ DON&apos;T LITTER ✦ DON&apos;T MESS WITH POROS ✦
            </span>
          ))}
        </div>
      </div>

      {/* PINNED / FEATURED */}
      <section className="px-6 md:px-10 py-16 max-w-[1200px] mx-auto">
        {pinned.map((post) => (
          <div key={post.id} className="border border-[var(--color-pink)] p-8 md:p-14 relative overflow-hidden mb-6 group">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[var(--color-pink)] opacity-[0.04] blur-[100px] pointer-events-none" />
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 bg-[var(--color-pink)] rounded-full" />
              <span className="font-display text-[9px] tracking-[3px] text-[var(--color-pink)] uppercase">
                PINNED — {post.tag}
              </span>
              <span className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)] ml-auto">
                {post.date}
              </span>
            </div>
            <h2 className="font-display text-[clamp(22px,3.5vw,32px)] font-bold tracking-[3px] uppercase mb-4">
              {post.title}
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed font-light max-w-[650px] text-[15px]">
              {post.excerpt}
            </p>
          </div>
        ))}
      </section>

      {/* UPCOMING EVENTS */}
      {events.length > 0 && (
        <section className="px-6 md:px-10 py-12 max-w-[1200px] mx-auto">
          <h2 className="font-display text-[11px] tracking-[4px] text-[var(--color-blue)] uppercase mb-8">
            UPCOMING EVENTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <div key={event.id} className="border border-[var(--color-border)] p-6 md:p-8 hover:border-[var(--color-blue)] transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-display text-[9px] tracking-[3px] text-[var(--color-blue)] uppercase">
                    EVENT
                  </span>
                  <span className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)]">
                    {event.date}
                  </span>
                </div>
                <h3 className="font-display text-base md:text-lg font-bold tracking-[2px] uppercase mb-2 group-hover:text-[var(--color-blue)] transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] font-light leading-relaxed">
                  {event.excerpt}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEED */}
      <section className="px-6 md:px-10 py-12 max-w-[1200px] mx-auto">
        <h2 className="font-display text-[11px] tracking-[4px] text-[var(--color-muted)] uppercase mb-8">
          TRANSMISSIONS
        </h2>
        <div className="space-y-3">
          {feed.filter(p => p.tag !== "event").map((post) => (
            <div key={post.id} className="border border-[var(--color-border)] p-5 md:p-7 hover:border-[var(--color-pink)] transition-colors group flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
              <div className="flex items-center gap-4 flex-shrink-0 md:w-[160px]">
                <span className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)]">
                  {post.date}
                </span>
                <span className="font-display text-[9px] tracking-[3px] uppercase" style={{ color: TAG_COLORS[post.tag] || "var(--color-muted)" }}>
                  {post.tag}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-[13px] font-bold tracking-[2px] uppercase mb-1 group-hover:text-[var(--color-pink)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] font-light leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARTIFACTS TEASER */}
      <section className="px-6 md:px-10 py-16 max-w-[1200px] mx-auto border-t border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="font-display text-[9px] tracking-[4px] text-[var(--color-pink)] uppercase block mb-2">
              COLLECTION 001
            </span>
            <h2 className="font-display text-[clamp(20px,3vw,28px)] font-bold tracking-[3px] uppercase">
              WEARABLE ARTIFACTS
            </h2>
            <p className="text-sm text-[var(--color-muted)] font-light mt-2">
              Not merch. Cultural passports to the island.
            </p>
          </div>
          <Link href="/artifacts" className="font-display text-[11px] tracking-[3px] uppercase px-10 py-4 bg-[var(--color-pink)] text-[var(--color-text-inv)] hover:bg-[var(--color-pink-hover)] transition-all inline-block text-center">
            VIEW ARTIFACTS →
          </Link>
        </div>
      </section>
    </>
  );
}