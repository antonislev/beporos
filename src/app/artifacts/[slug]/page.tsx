"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug } from "@/lib/products";

export default function ArtifactPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <section className="px-6 py-24 text-center">
        <h1 className="font-display text-2xl tracking-[4px] mb-4">NOT FOUND</h1>
        <Link href="/artifacts" className="font-display text-[11px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors">← BACK</Link>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-10 py-24 max-w-[1200px] mx-auto">
      <Link href="/artifacts" className="font-display text-[11px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors mb-12 inline-block">
        ← BACK TO ARTIFACTS
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {/* Images */}
        <div>
          <div className="aspect-square bg-[var(--color-bg-alt)] relative overflow-hidden border border-[var(--color-border)]">
            <Image src={product.images[currentImage]} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setCurrentImage(i)} className={`w-20 h-20 relative overflow-hidden border-2 transition-colors ${currentImage === i ? "border-[var(--color-pink)]" : "border-[var(--color-border)] hover:border-[var(--color-muted)]"}`}>
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details — no price, no cart */}
        <div className="flex flex-col">
          <span className="font-display text-[9px] tracking-[3px] text-[var(--color-pink)] uppercase mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--color-pink)] rounded-full inline-block" />
            ARTIFACT — COLLECTION 001
          </span>

          <h1 className="font-display text-[clamp(22px,3.5vw,32px)] font-bold tracking-[3px] uppercase mb-6">
            {product.name}
          </h1>

          <div className="w-full h-[1px] bg-[var(--color-border)] mb-6" />

          <p className="text-[15px] text-[var(--color-muted)] leading-[1.9] font-light mb-10">
            {product.description}
          </p>

          <div className="border border-[var(--color-border)] p-6 mb-6">
            <span className="font-display text-[10px] tracking-[3px] text-[var(--color-muted)] block mb-2">AVAILABLE SIZES</span>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <span key={size} className="font-display text-[11px] tracking-[1px] px-4 py-2 border border-[var(--color-border)] text-[var(--color-muted)]">
                  {size}
                </span>
              ))}
            </div>
          </div>

          <a
            href="https://instagram.com/beporos"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-[11px] tracking-[3px] uppercase py-4 bg-[var(--color-pink)] text-[var(--color-text-inv)] hover:bg-[var(--color-pink-hover)] transition-colors text-center mt-auto"
          >
            DM TO CLAIM → @BEPOROS
          </a>

          <p className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)] text-center mt-4">
            LIMITED RUN — ONCE GONE, GONE
          </p>
        </div>
      </div>
    </section>
  );
}