import { societyPosts } from "@/lib/society";

const TAG_COLORS: Record<string, string> = {
  manifesto: "var(--color-pink)",
  announcement: "var(--color-pink)",
  event: "var(--color-blue)",
  culture: "var(--color-muted)",
  news: "var(--color-text)",
};

const TAG_EMOJI: Record<string, string> = {
  manifesto: "📌",
  announcement: "📡",
  event: "📅",
  culture: "🏛",
  news: "📰",
};

export default function SocietyPage() {
  const pinned = societyPosts.filter((p) => p.pinned);
  const rest = societyPosts.filter((p) => !p.pinned);

  return (
    <section className="px-6 md:px-10 py-24 max-w-[1200px] mx-auto">
      <div className="border-b border-[var(--color-border)] pb-5 mb-6">
        <span className="font-display text-[9px] tracking-[4px] text-[var(--color-pink)] uppercase block mb-2">
          THE HUB
        </span>
        <h1 className="font-display text-[clamp(28px,4vw,42px)] font-bold tracking-[4px] uppercase">
          SOCIETY
        </h1>
      </div>

      <p className="text-sm text-[var(--color-muted)] font-light leading-relaxed max-w-[500px] mb-14">
        News, events, culture, and transmissions from the island.
        Everything happening in the beporos world lives here.
      </p>

      {/* Pinned Posts */}
      {pinned.length > 0 && (
        <div className="mb-10">
          {pinned.map((post) => (
            <div
              key={post.id}
              className="border border-[var(--color-pink)] p-8 md:p-12 relative overflow-hidden mb-6"
            >
              <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-[var(--color-pink)] opacity-[0.05] blur-[80px] pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm">{TAG_EMOJI[post.tag] || ""}</span>
                <span
                  className="font-display text-[9px] tracking-[3px] uppercase"
                  style={{ color: TAG_COLORS[post.tag] }}
                >
                  PINNED — {post.tag}
                </span>
              </div>
              <h2 className="font-display text-[clamp(20px,3vw,28px)] font-bold tracking-[3px] uppercase mb-4">
                {post.title}
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed font-light max-w-[600px]">
                {post.excerpt}
              </p>
              <span className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)] block mt-6">
                {post.date}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Feed */}
      <div className="space-y-4">
        {rest.map((post) => (
          <div
            key={post.id}
            className="border border-[var(--color-border)] p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-8 hover:border-[var(--color-pink)] transition-colors group"
          >
            {/* Date column */}
            <div className="flex-shrink-0 md:w-[100px]">
              <span className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)]">
                {post.date}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs">{TAG_EMOJI[post.tag] || ""}</span>
                <span
                  className="font-display text-[9px] tracking-[3px] uppercase"
                  style={{ color: TAG_COLORS[post.tag] }}
                >
                  {post.tag}
                </span>
              </div>
              <h3 className="font-display text-sm md:text-base font-bold tracking-[2px] uppercase mb-2 group-hover:text-[var(--color-pink)] transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)] font-light leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16 pt-10 border-t border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-muted)] font-light mb-4">
          Follow for real-time updates
        </p>
        <a
          href="https://instagram.com/beporos"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-[11px] tracking-[3px] uppercase px-10 py-4 border border-[var(--color-pink)] text-[var(--color-pink)] hover:bg-[var(--color-pink)] hover:text-[var(--color-text-inv)] transition-all inline-block"
        >
          @BEPOROS ON INSTAGRAM
        </a>
      </div>
    </section>
  );
}