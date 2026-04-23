"use client";

import { useState } from "react";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  sizes: string[];
}

export default function OrderForm({ isOpen, onClose, productId, productName, sizes }: OrderFormProps) {
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name || !instagram || !size) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, instagram, size, quantity, productId, productName }),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[80] backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-[81] flex items-center justify-center px-4">
        <div className="bg-[var(--color-bg)] border border-[var(--color-border)] w-full max-w-[420px] p-8 relative">

          <button onClick={onClose} className="absolute top-4 right-5 font-display text-[11px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors">CLOSE</button>

          {status === "sent" ? (
            <div className="text-center py-8">
              <h3 className="font-display text-[18px] font-bold tracking-[2px] uppercase mb-3">GOT IT ✓</h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">We&apos;ll DM you on Instagram to confirm. Keep an eye on <span className="text-[var(--color-pink)]">@{instagram.replace("@", "")}</span></p>
              <button onClick={onClose} className="mt-6 font-display text-[11px] tracking-[2px] uppercase px-8 py-3 border border-[var(--color-border)] hover:border-[var(--color-pink)] hover:text-[var(--color-pink)] transition-all">CLOSE</button>
            </div>
          ) : (
            <>
              <h3 className="font-display text-[16px] font-bold tracking-[2px] uppercase mb-1">GRAB ONE</h3>
              <p className="text-sm text-[var(--color-muted)] mb-6">{productName}</p>

              {/* Name */}
              <div className="mb-4">
                <label className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-2 font-bold">YOUR NAME</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-pink)] transition-colors placeholder:text-[var(--color-muted)]/50" />
              </div>

              {/* Instagram */}
              <div className="mb-4">
                <label className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-2 font-bold">YOUR INSTAGRAM</label>
                <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@yourhandle" className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-pink)] transition-colors placeholder:text-[var(--color-muted)]/50" />
              </div>

              {/* Size */}
              <div className="mb-4">
                <label className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-2 font-bold">SIZE</label>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button key={s} onClick={() => setSize(s)} className={`font-display text-[11px] px-4 py-2 border transition-all ${size === s ? "border-[var(--color-pink)] bg-[var(--color-pink)] text-[var(--color-text-inv)]" : "border-[var(--color-border)] hover:border-[var(--color-pink)]"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-2 font-bold">QUANTITY</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-pink)] transition-colors">−</button>
                  <span className="font-display text-[14px] w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(5, quantity + 1))} className="w-8 h-8 border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-pink)] transition-colors">+</button>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!name || !instagram || !size || status === "sending"}
                className="w-full font-display text-[11px] tracking-[2px] uppercase py-4 bg-[var(--color-pink)] text-[var(--color-text-inv)] hover:bg-[var(--color-pink-hover)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-bold"
              >
                {status === "sending" ? "SENDING..." : "SUBMIT"}
              </button>

              {status === "error" && (
                <p className="text-sm text-red-500 text-center mt-3">Something went wrong. Try again.</p>
              )}

              <p className="font-display text-[9px] tracking-[1px] text-[var(--color-muted)] text-center mt-4">We&apos;ll DM you on IG to confirm and arrange pickup/delivery.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}