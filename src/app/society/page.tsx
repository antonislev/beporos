import { societyPosts } from "@/lib/society";

export default function SocietyPage() {
  return (
    <section className="px-6 md:px-10 py-24 max-w-[1200px] mx-auto">
      <div className="border-b border-[var(--color-border)] pb-5 mb-14">
        <h1 className="font-display text-[clamp(28px,4vw,42px)] font-bold tracking-[4px] uppercase">
          SOCIETY
        </h1>
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature post — first item large */}
        {societyPosts[0] && (
          <div className="md:col-span-2 bg-[var(--color-text)] text-[var(--color-text-inv)] p-10 md:p-16 flex flex-col justify-end min-h-[400px]">
            <span className="font-display text-[9px] tracking-[3px] text-[var(--color-accent)] uppercase mb-4">
              {societyPosts[0].tag}
            </span>
            <h2 className="font-display text-[clamp(22px,3vw,32px)] font-bold tracking-[3px] uppercase mb-4">
              {societyPosts[0].title}
            </h2>
            <p className="text-[var(--color-muted)] max-w-[600px] leading-relaxed font-light">
              {societyPosts[0].excerpt}
            </p>
          </div>
        )}

        {/* Remaining posts */}
        {societyPosts.slice(1).map((post) => (
          <div
            key={post.id}
            className="bg-[var(--color-bg-alt)] p-8 md:p-10 flex flex-col justify-end min-h-[260px]"
          >
            <span className="font-display text-[9px] tracking-[3px] text-[var(--color-accent)] uppercase mb-3">
              {post.tag}
            </span>
            <h3 className="font-display text-lg font-bold tracking-[2px] uppercase mb-3">
              {post.title}
            </h3>
            <p className="text-sm text-[var(--color-muted)] font-light leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}