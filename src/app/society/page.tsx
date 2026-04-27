"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  body?: string;
  tag: string;
  date: string;
  pinned?: boolean;
  imageUrl?: string;
  videoUrl?: string;
}

const TAG_CONFIG: Record<string, { color: string; label: string; bg: string }> = {
  event: { color: "#3d6b9e", label: "EVENT", bg: "linear-gradient(135deg, #1a3a5c, #2d5a8e)" },
  nightlife: { color: "#a855f7", label: "NIGHTLIFE", bg: "linear-gradient(135deg, #2d1b4e, #5b21b6)" },
  "island-life": { color: "#22c55e", label: "ISLAND LIFE", bg: "linear-gradient(135deg, #0a3d1f, #166534)" },
  "local-spot": { color: "#f59e0b", label: "LOCAL SPOT", bg: "linear-gradient(135deg, #451a03, #92400e)" },
  food: { color: "#ef4444", label: "FOOD", bg: "linear-gradient(135deg, #450a0a, #991b1b)" },
  people: { color: "#e8729a", label: "PEOPLE", bg: "linear-gradient(135deg, #4a1028, #9d174d)" },
  announcement: { color: "#e8729a", label: "ANNOUNCEMENT", bg: "linear-gradient(135deg, #2a0a1a, #7c1d4e)" },
  culture: { color: "#94a3b8", label: "CULTURE", bg: "linear-gradient(135deg, #1e293b, #334155)" },
  manifesto: { color: "#e8729a", label: "MANIFESTO", bg: "linear-gradient(135deg, #2a0a1a, #7c1d4e)" },
  news: { color: "#94a3b8", label: "NEWS", bg: "linear-gradient(135deg, #1e293b, #334155)" },
};

const CATEGORIES = ["all", "event", "nightlife", "island-life", "local-spot", "food", "people", "announcement", "culture"];

export default function SocietyPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/society")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const allPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const pinned = allPosts.filter((p) => p.pinned);
  const filtered = allPosts
    .filter((p) => !p.pinned)
    .filter((p) => filter === "all" || p.tag === filter);

  const hero = pinned[0] || filtered[0];
  const rest = filtered.filter((p) => p.id !== hero?.id);

  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-10 py-20">
      {/* Masthead */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold tracking-[2px] uppercase leading-none">SOCIETY</h1>
          <p className="text-[var(--color-muted)] text-sm mt-2">Culture, events & island life from Poros</p>
        </div>
        <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="font-display text-[10px] tracking-[2px] text-[var(--color-pink)] font-bold">@BEPOROS</a>
      </div>

      {/* Category Bar */}
      <div className="flex gap-1 flex-wrap mb-10 pb-4 border-b border-[var(--color-border)] overflow-x-auto">
        {CATEGORIES.map((cat) => {
          const config = TAG_CONFIG[cat];
          return (
            <button key={cat} onClick={() => setFilter(cat)} className={`font-display text-[10px] tracking-[2px] uppercase px-4 py-2 transition-all font-bold whitespace-nowrap ${filter === cat ? "bg-[var(--color-pink)] text-[var(--color-text-inv)]" : "text-[var(--color-muted)] hover:text-[var(--color-pink)]"}`}>
              {cat === "all" ? "ALL" : config?.label || cat}
            </button>
          );
        })}
      </div>

      {loading ? (
        <p className="text-[var(--color-muted)] text-center py-20">Loading...</p>
      ) : posts.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-display text-[20px] tracking-[3px] uppercase font-bold mb-3">COMING SOON</p>
          <p className="text-[var(--color-muted)]">The society hub is being built. Follow <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="text-[var(--color-pink)] hover:underline">@beporos</a> for updates.</p>
        </div>
      ) : (
        <>
          {/* HERO POST */}
          {hero && (
            <Link href={`/society/${hero.id}`} className="block mb-10 group">
              <div className="w-full relative overflow-hidden">
                {hero.imageUrl ? (
                  <div className="relative">
                    <img src={hero.imageUrl} alt="" className="w-full aspect-[4/3] md:aspect-[21/9] object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                      <span className="font-display text-[10px] tracking-[3px] uppercase font-bold mb-3" style={{ color: TAG_CONFIG[hero.tag]?.color }}>{TAG_CONFIG[hero.tag]?.label}</span>
                      <h2 className="font-display text-[clamp(22px,4vw,40px)] font-bold tracking-[1px] uppercase leading-tight text-white max-w-[700px] group-hover:text-[var(--color-pink)] transition-colors">{hero.title}</h2>
                      <p className="text-white/60 mt-3 max-w-[500px] text-sm leading-relaxed">{hero.excerpt}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <span className="text-white/30 font-display text-[10px] tracking-[2px]">{hero.date}</span>
                        <span className="font-display text-[10px] tracking-[2px] text-[var(--color-pink)] opacity-0 group-hover:opacity-100 transition-opacity">READ →</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] md:aspect-[21/9] relative overflow-hidden" style={{ background: TAG_CONFIG[hero.tag]?.bg || TAG_CONFIG.culture.bg }}>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                      <span className="font-display text-[10px] tracking-[3px] uppercase font-bold mb-3" style={{ color: TAG_CONFIG[hero.tag]?.color }}>{TAG_CONFIG[hero.tag]?.label}</span>
                      <h2 className="font-display text-[clamp(22px,4vw,40px)] font-bold tracking-[1px] uppercase leading-tight text-white max-w-[700px] group-hover:text-[var(--color-pink)] transition-colors">{hero.title}</h2>
                      <p className="text-white/60 mt-3 max-w-[500px] text-sm leading-relaxed">{hero.excerpt}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <span className="text-white/30 font-display text-[10px] tracking-[2px]">{hero.date}</span>
                        <span className="font-display text-[10px] tracking-[2px] text-[var(--color-pink)] opacity-0 group-hover:opacity-100 transition-opacity">READ →</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          )}

          {/* EDITORIAL GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => {
              const config = TAG_CONFIG[post.tag] || TAG_CONFIG.culture;
              return (
                <Link key={post.id} href={`/society/${post.id}`} className="group block">
                  {/* Card media */}
                  {post.imageUrl ? (
                    <div className="relative overflow-hidden">
                      <img src={post.imageUrl} alt="" className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <span className="font-display text-[9px] tracking-[3px] uppercase font-bold text-white/80">{config.label}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] relative overflow-hidden" style={{ background: config.bg }}>
                      <div className="absolute inset-0 flex flex-col justify-end p-5">
                        <span className="font-display text-[9px] tracking-[3px] uppercase font-bold text-white/70">{config.label}</span>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  )}

                  {/* Card content */}
                  <div className="pt-4 pb-5">
                    {post.imageUrl && (
                      <span className="font-display text-[9px] tracking-[3px] uppercase font-bold mb-2 block" style={{ color: config.color }}>{config.label}</span>
                    )}
                    <h3 className="font-display text-[14px] font-bold tracking-[1px] uppercase leading-snug group-hover:text-[var(--color-pink)] transition-colors">{post.title}</h3>
                    <p className="text-sm text-[var(--color-muted)] mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)]">{post.date}</span>
                      <span className="font-display text-[9px] tracking-[2px] text-[var(--color-pink)] opacity-0 group-hover:opacity-100 transition-opacity">READ →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* Bottom */}
      <div className="text-center mt-20 pt-8 border-t border-[var(--color-border)]">
        <p className="text-[var(--color-muted)] text-sm mb-4">Real-time updates on the island</p>
        <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="font-display text-[11px] tracking-[2px] uppercase px-8 py-3 bg-[var(--color-pink)] text-[var(--color-text-inv)] hover:bg-[var(--color-pink-hover)] transition-all inline-block font-bold">FOLLOW @BEPOROS</a>
      </div>
    </section>
  );
}