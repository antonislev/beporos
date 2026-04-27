"use client";

import { useState, useEffect } from "react";

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

const TAGS = [
  { value: "event", label: "📅 EVENT" },
  { value: "nightlife", label: "🌙 NIGHTLIFE" },
  { value: "island-life", label: "🌊 ISLAND LIFE" },
  { value: "local-spot", label: "📍 LOCAL SPOT" },
  { value: "food", label: "🍴 FOOD" },
  { value: "people", label: "👤 PEOPLE" },
  { value: "announcement", label: "📡 ANNOUNCEMENT" },
  { value: "culture", label: "🏛 CULTURE" },
];

export default function NewPostPage() {
  const [adminKey, setAdminKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"new" | "manage">("new");
  const [posts, setPosts] = useState<Post[]>([]);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [pinned, setPinned] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/society");
      const data = await res.json();
      setPosts((data.posts || []).reverse());
    } catch {}
  };

  useEffect(() => {
    if (authed) fetchPosts();
  }, [authed]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setExcerpt("");
    setBody("");
    setTag("");
    setPinned(false);
    setImageUrl("");
    setVideoUrl("");
    setStatus("idle");
  };

  const loadPost = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setBody(post.body || "");
    setTag(post.tag);
    setPinned(post.pinned || false);
    setImageUrl(post.imageUrl || "");
    setVideoUrl(post.videoUrl || "");
    setTab("new");
    setStatus("idle");
  };

  const handleSubmit = async () => {
    if (!title || !excerpt || !tag) return;
    setStatus("sending");

    const method = editingId ? "PUT" : "POST";
    const payload: any = { title, excerpt, body, tag, pinned, imageUrl, videoUrl };
    if (editingId) payload.id = editingId;

    try {
      const res = await fetch(`/api/society?key=${adminKey}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("sent");
        resetForm();
        fetchPosts();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;

    try {
      await fetch(`/api/society?key=${adminKey}&id=${id}`, { method: "DELETE" });
      fetchPosts();
    } catch {}
  };

  if (!authed) {
    return (
      <section className="px-6 py-24 max-w-[400px] mx-auto">
        <h1 className="font-display text-xl font-bold tracking-[2px] uppercase mb-6">SOCIETY ADMIN</h1>
        <input type="password" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} placeholder="Admin key" className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-pink)] transition-colors mb-4 placeholder:text-[var(--color-muted)]" />
        <button onClick={() => { if (adminKey) setAuthed(true); }} className="w-full font-display text-[11px] tracking-[2px] uppercase py-3 bg-[var(--color-pink)] text-[var(--color-text-inv)] font-bold">ENTER</button>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-10 py-24 max-w-[700px] mx-auto">
      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-[var(--color-border)] pb-4">
        <button onClick={() => { setTab("new"); resetForm(); }} className={`font-display text-[12px] tracking-[2px] uppercase font-bold transition-colors ${tab === "new" ? "text-[var(--color-pink)]" : "text-[var(--color-muted)] hover:text-[var(--color-pink)]"}`}>
          {editingId ? "EDITING POST" : "NEW POST"}
        </button>
        <button onClick={() => { setTab("manage"); fetchPosts(); }} className={`font-display text-[12px] tracking-[2px] uppercase font-bold transition-colors ${tab === "manage" ? "text-[var(--color-pink)]" : "text-[var(--color-muted)] hover:text-[var(--color-pink)]"}`}>
          MANAGE ({posts.length})
        </button>
      </div>

      {/* MANAGE TAB */}
      {tab === "manage" && (
        <div className="space-y-3">
          {posts.length === 0 && <p className="text-[var(--color-muted)] text-sm">No posts yet.</p>}
          {posts.map((post) => (
            <div key={post.id} className="border border-[var(--color-border)] p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)]">{post.date}</span>
                  <span className="font-display text-[9px] tracking-[2px] text-[var(--color-pink)] uppercase">{post.tag}</span>
                  {post.pinned && <span className="font-display text-[9px] tracking-[2px] text-[var(--color-pink)]">📌</span>}
                </div>
                <p className="font-display text-[12px] font-bold tracking-[1px] uppercase truncate">{post.title}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => loadPost(post)} className="font-display text-[10px] tracking-[2px] px-4 py-2 border border-[var(--color-border)] hover:border-[var(--color-pink)] hover:text-[var(--color-pink)] transition-all font-bold">EDIT</button>
                <button onClick={() => handleDelete(post.id)} className="font-display text-[10px] tracking-[2px] px-4 py-2 border border-[var(--color-border)] hover:border-red-500 hover:text-red-500 transition-all font-bold">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NEW / EDIT TAB */}
      {tab === "new" && (
        <>
          {status === "sent" && (
            <div className="border border-[var(--color-pink)] p-5 mb-8 text-center">
              <p className="font-display text-[14px] font-bold tracking-[2px] uppercase text-[var(--color-pink)]">{editingId ? "UPDATED ✓" : "POSTED ✓"}</p>
              <button onClick={resetForm} className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] mt-2 hover:text-[var(--color-pink)]">WRITE ANOTHER</button>
            </div>
          )}

          {status !== "sent" && (
            <div className="space-y-5">
              {editingId && (
                <div className="flex items-center justify-between bg-[var(--color-bg-alt)] p-3 border border-[var(--color-border)]">
                  <span className="font-display text-[10px] tracking-[2px] text-[var(--color-pink)] font-bold">EDITING EXISTING POST</span>
                  <button onClick={resetForm} className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)]">CANCEL</button>
                </div>
              )}

              {/* Category */}
              <div>
                <label className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-3 font-bold">CATEGORY</label>
                <div className="flex gap-2 flex-wrap">
                  {TAGS.map((t) => (
                    <button key={t.value} onClick={() => setTag(t.value)} className={`font-display text-[10px] tracking-[1px] px-4 py-2 border transition-all ${tag === t.value ? "border-[var(--color-pink)] text-[var(--color-pink)]" : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-pink)]"}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-2 font-bold">TITLE</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-pink)] transition-colors placeholder:text-[var(--color-muted)]" />
              </div>

              {/* Image URL */}
              <div>
                <label className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-2 font-bold">IMAGE URL <span className="text-[var(--color-muted)]">(OPTIONAL)</span></label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://... paste image link" className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-pink)] transition-colors placeholder:text-[var(--color-muted)]" />
                {imageUrl && (
                  <div className="mt-3 border border-[var(--color-border)] p-2">
                    <p className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)] mb-2 font-bold">PREVIEW</p>
                    <img src={imageUrl} alt="Preview" className="w-full max-h-[200px] object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}
              </div>

              {/* Video URL */}
              <div>
                <label className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-2 font-bold">VIDEO URL <span className="text-[var(--color-muted)]">(OPTIONAL)</span></label>
                <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-pink)] transition-colors placeholder:text-[var(--color-muted)]" />
              </div>

              {/* Excerpt */}
              <div>
                <label className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-2 font-bold">SHORT DESCRIPTION</label>
                <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="1-2 sentences for the feed" rows={3} className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-pink)] transition-colors resize-none placeholder:text-[var(--color-muted)]" />
              </div>

              {/* Body */}
              <div>
                <label className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-2 font-bold">FULL STORY <span className="text-[var(--color-muted)]">(OPTIONAL)</span></label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="The full post" rows={10} className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-pink)] transition-colors resize-none placeholder:text-[var(--color-muted)]" />
              </div>

              {/* Pin */}
              <div className="flex items-center gap-3">
                <button onClick={() => setPinned(!pinned)} className={`w-5 h-5 border transition-all flex items-center justify-center ${pinned ? "border-[var(--color-pink)] bg-[var(--color-pink)]" : "border-[var(--color-border)]"}`}>
                  {pinned && <span className="text-[var(--color-text-inv)] text-xs">✓</span>}
                </button>
                <span className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] font-bold">PIN TO TOP</span>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!title || !excerpt || !tag || status === "sending"}
                className="w-full font-display text-[11px] tracking-[2px] uppercase py-4 bg-[var(--color-pink)] text-[var(--color-text-inv)] hover:bg-[var(--color-pink-hover)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-bold"
              >
                {status === "sending" ? "SAVING..." : editingId ? "UPDATE POST" : "PUBLISH"}
              </button>

              {status === "error" && (
                <p className="text-sm text-red-500 text-center">Something went wrong. Try again.</p>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}