"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

const TAG_CONFIG: Record<string, { color: string; label: string }> = {
  event: { color: "#3d6b9e", label: "EVENT" },
  nightlife: { color: "#a855f7", label: "NIGHTLIFE" },
  "island-life": { color: "#22c55e", label: "ISLAND LIFE" },
  "local-spot": { color: "#f59e0b", label: "LOCAL SPOT" },
  food: { color: "#ef4444", label: "FOOD" },
  people: { color: "#e8729a", label: "PEOPLE" },
  announcement: { color: "#e8729a", label: "ANNOUNCEMENT" },
  culture: { color: "#94a3b8", label: "CULTURE" },
  manifesto: { color: "#e8729a", label: "MANIFESTO" },
  news: { color: "#94a3b8", label: "NEWS" },
};

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/society")
      .then((res) => res.json())
      .then((data) => {
        const found = (data.posts || []).find((p: Post) => p.id === id);
        setPost(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="px-6 py-24 max-w-[800px] mx-auto">
        <p className="text-[var(--color-muted)] text-center">Loading...</p>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="px-6 py-24 max-w-[800px] mx-auto text-center">
        <h1 className="font-display text-2xl tracking-[3px] font-bold mb-4">POST NOT FOUND</h1>
        <Link href="/society" className="font-display text-[11px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors">← BACK TO SOCIETY</Link>
      </section>
    );
  }

  const config = TAG_CONFIG[post.tag] || TAG_CONFIG.culture;

  return (
    <article className="max-w-[900px] mx-auto px-6 md:px-10 py-20">
      {/* Back */}
      <Link href="/society" className="font-display text-[11px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors inline-block mb-10">
        ← BACK TO SOCIETY
      </Link>

      {/* Hero image */}
      {post.imageUrl && (
        <div className="w-full aspect-[16/9] relative overflow-hidden mb-8">
          <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Video */}
      {post.videoUrl && !post.imageUrl && (
        <div className="w-full mb-8">
          {getYouTubeId(post.videoUrl) ? (
            <div className="aspect-video">
              <iframe src={`https://www.youtube.com/embed/${getYouTubeId(post.videoUrl)}`} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          ) : (
            <a href={post.videoUrl} target="_blank" rel="noopener noreferrer" className="block bg-[var(--color-bg-alt)] p-8 text-center font-display text-[11px] tracking-[2px] text-[var(--color-pink)] hover:underline font-bold">▶ WATCH VIDEO</a>
          )}
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-4 mb-6">
        <span className="font-display text-[10px] tracking-[3px] uppercase font-bold" style={{ color: config.color }}>{config.label}</span>
        <span className="w-1 h-1 rounded-full bg-[var(--color-muted)]" />
        <span className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)]">{post.date}</span>
        {post.pinned && (
          <>
            <span className="w-1 h-1 rounded-full bg-[var(--color-muted)]" />
            <span className="font-display text-[10px] tracking-[2px] text-[var(--color-pink)]">📌 PINNED</span>
          </>
        )}
      </div>

      {/* Title */}
      <h1 className="font-display text-[clamp(26px,4vw,42px)] font-bold tracking-[2px] uppercase leading-tight mb-6">
        {post.title}
      </h1>

      {/* Divider */}
      <div className="w-16 h-[2px] mb-8" style={{ background: config.color }} />

      {/* Excerpt as lead */}
      <p className="text-[18px] leading-[1.8] mb-8 text-[var(--color-text)]">
        {post.excerpt}
      </p>

      {/* Full body */}
      {post.body && (
        <div className="text-[var(--color-muted)] text-[16px] leading-[2] whitespace-pre-line">
          {post.body}
        </div>
      )}

      {/* Video below content if both image and video */}
      {post.videoUrl && post.imageUrl && (
        <div className="mt-10">
          {getYouTubeId(post.videoUrl) ? (
            <div className="aspect-video">
              <iframe src={`https://www.youtube.com/embed/${getYouTubeId(post.videoUrl)}`} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          ) : (
            <a href={post.videoUrl} target="_blank" rel="noopener noreferrer" className="block bg-[var(--color-bg-alt)] p-8 text-center font-display text-[11px] tracking-[2px] text-[var(--color-pink)] hover:underline font-bold">▶ WATCH VIDEO</a>
          )}
        </div>
      )}

      {/* Share / bottom CTA */}
      <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Link href="/society" className="font-display text-[11px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors">← MORE FROM SOCIETY</Link>
        <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="font-display text-[10px] tracking-[2px] text-[var(--color-pink)] font-bold hover:underline">FOLLOW @BEPOROS</a>
      </div>
    </article>
  );
}