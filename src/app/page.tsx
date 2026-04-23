import Link from "next/link";
import Image from "next/image";
import { societyPosts } from "@/lib/society";

const TAG_STYLES: Record<string, { color: string; label: string }> = {
  manifesto: { color: "var(--color-pink)", label: "MANIFESTO" },
  announcement: { color: "var(--color-pink)", label: "ANNOUNCEMENT" },
  event: { color: "var(--color-blue)", label: "EVENT" },
  culture: { color: "var(--color-text)", label: "CULTURE" },
  news: { color: "var(--color-text)", label: "NEWS" },
};

export default function HomePage() {
  const pinned = societyPosts.filter((p) => p.pinned);
  const events = societyPosts.filter((p) => p.tag === "event");
  const rest = societyPosts.filter((p) => !p.pinned && p.tag !== "event");

  return (
    <>
      {/* HEADER */}
      <section className="px-6 md:px-10 pt-24 pb-10 max-w-[1000px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="relative w-[180px] h-[58px] md:w-[240px] md:h-[78px] mb-4">
              <Image src="/images/brand/logo.png" alt="Poros Island" fill className="object-contain object-left" sizes="240px" priority />
            </div>
            <p className="text-[15px] text-[var(--color-muted)] leading-relaxed max-w-[380px]">
              Poros Island, Saronic Gulf, Greece.
              <br />By locals, for locals. Est. summer 2024.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/artifacts" className="font-display text-[11px] tracking-[2px] uppercase px-5 py-3 border border-[var(--color-border)] hover:border-[var(--color-pink)] hover:text-[var(--color-pink)] transition-all">
              TEES
            </Link>
            <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="font-display text-[11px] tracking-[2px] uppercase px-5 py-3 bg-[var(--color-pink)] text-[var(--color-text-inv)] hover:bg-[var(--color-pink-hover)] transition-all">
              @BEPOROS
            </a>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="py-3 border-y border-[var(--color-border)] overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "scroll 30s linear infinite" }}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className="font-display text-[10px] tracking-[3px] text-[var(--color-muted)] uppercase flex-shrink-0">
              LOVE BAY ✦ KANALI ✦ RUSSIAN BAY ✦ GEROLIMANI ✦ ASKELI ✦ CLOCK TOWER ✦ LIGHTHOUSE ✦
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 md:px-10">

        {/* PINNED */}
        {pinned.map((post) => (
          <div key={post.id} className="border-l-2 border-[var(--color-pink)] pl-6 md:pl-8 py-8 mt-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-display text-[10px] tracking-[3px] text-[var(--color-pink)] uppercase font-bold">
                📌 {TAG_STYLES[post.tag]?.label}
              </span>
            </div>
            <h2 className="font-display text-[clamp(20px,3vw,28px)] font-bold tracking-[2px] uppercase mb-3">
              {post.title}
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed max-w-[600px]">
              {post.excerpt}
            </p>
          </div>
        ))}

        {/* EVENTS */}
        {events.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-[12px] tracking-[3px] text-[var(--color-blue)] uppercase font-bold mb-6">
              UPCOMING
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <div key={event.id} className="border border-[var(--color-border)] p-5 md:p-6 hover:border-[var(--color-blue)] transition-colors">
                  <span className="font-display text-[10px] tracking-[2px] text-[var(--color-blue)] uppercase font-bold block mb-2">
                    {event.date}
                  </span>
                  <h3 className="font-display text-[14px] font-bold tracking-[1px] uppercase mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {event.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FEED */}
        <div className="mt-14 mb-10">
          <h2 className="font-display text-[12px] tracking-[3px] text-[var(--color-muted)] uppercase font-bold mb-6">
            FEED
          </h2>
          <div className="space-y-2">
            {rest.map((post) => (
              <div key={post.id} className="border-b border-[var(--color-border)] py-5 flex flex-col md:flex-row md:items-start gap-2 md:gap-6 group hover:border-[var(--color-pink)] transition-colors">
                <div className="flex items-center gap-3 flex-shrink-0 md:w-[200px]">
                  <span className="font-display text-[10px] tracking-[1px] text-[var(--color-muted)]">
                    {post.date}
                  </span>
                  <span className="font-display text-[10px] tracking-[2px] uppercase font-bold" style={{ color: TAG_STYLES[post.tag]?.color }}>
                    {TAG_STYLES[post.tag]?.label}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[13px] font-bold tracking-[1px] uppercase mb-1 group-hover:text-[var(--color-pink)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TEES TEASER */}
        <div className="border-t border-[var(--color-border)] py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-display text-[clamp(18px,2.5vw,24px)] font-bold tracking-[2px] uppercase">
              SUMMER 2 TEES
            </h2>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              New designs. Drop date coming.
            </p>
          </div>
          <Link href="/artifacts" className="font-display text-[11px] tracking-[2px] uppercase px-8 py-3 bg-[var(--color-pink)] text-[var(--color-text-inv)] hover:bg-[var(--color-pink-hover)] transition-all text-center">
            SEE TEES →
          </Link>
        </div>

      </div>
    </>
  );
}