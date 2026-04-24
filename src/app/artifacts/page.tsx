"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export default function ArtifactsPage() {
  const products = getAllProducts();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="px-6 md:px-10 py-24 max-w-[1100px] mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--color-pink)] opacity-[0.04] blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="mb-6 relative">
        <span className="font-display text-[80px] md:text-[120px] font-bold tracking-tight uppercase text-[var(--color-border)] absolute -top-8 -left-2 select-none pointer-events-none leading-none opacity-40">
          TEES
        </span>
        <div className="relative pt-14">
          <span className="font-display text-[10px] tracking-[3px] text-[var(--color-pink)] uppercase font-bold block mb-2">
            SS2026
          </span>
          <h1 className="font-display text-[clamp(28px,4vw,38px)] font-bold tracking-[3px] uppercase">
            COLLECTION 001
          </h1>
        </div>
      </div>

      <p className="text-[var(--color-muted)] leading-relaxed max-w-[480px] mb-16">
        2 designs. No restock. DM{" "}
        <a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="text-[var(--color-pink)] hover:underline">@beporos</a>{" "}
        or grab one through the site.
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={`/artifacts/${product.slug}`}
            className="group block relative"
            onMouseEnter={() => setHovered(product.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Card */}
            <div className="relative overflow-hidden border border-[var(--color-border)] group-hover:border-[var(--color-pink)] transition-all duration-500">
              {/* Diagonal stripe overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(232,114,154,0.04) 8px, rgba(232,114,154,0.04) 9px)" }} />

              {/* Corner tag */}
              <div className="absolute top-0 right-0 z-20 bg-[var(--color-pink)] text-[var(--color-text-inv)] font-display text-[9px] tracking-[2px] px-4 py-2 uppercase font-bold translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                {index === 0 ? "PROTECT THE SEA" : "BE A LOVER"}
              </div>

              {/* Number overlay */}
              <span className="absolute bottom-4 right-4 z-20 font-display text-[72px] font-bold text-[var(--color-pink)] opacity-0 group-hover:opacity-20 transition-all duration-500 leading-none select-none">
                0{index + 1}
              </span>

              {/* Image */}
              <div className="aspect-[4/5] relative">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-[1.05]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Bottom bar - slides up */}
              <div className="absolute bottom-0 left-0 right-0 bg-[var(--color-bg)]/90 backdrop-blur-sm p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 border-t border-[var(--color-pink)]">
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{product.description.split('.')[0]}.</p>
                <span className="font-display text-[10px] tracking-[3px] text-[var(--color-pink)] uppercase font-bold mt-2 inline-block">VIEW & GRAB →</span>
              </div>
            </div>

            {/* Info below */}
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h2 className="font-display text-[15px] font-bold tracking-[2px] uppercase group-hover:text-[var(--color-pink)] transition-colors duration-300">
                  {product.name}
                </h2>
                <span className="text-[12px] text-[var(--color-muted)] mt-1 block">
                  NO RESTOCK
                </span>
              </div>
              <span className={`font-display text-[10px] tracking-[2px] text-[var(--color-pink)] font-bold mt-1 transition-all duration-300 ${hovered === product.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom ticker */}
      <div className="mt-20 py-4 border-y border-[var(--color-border)] overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "scroll 20s linear infinite" }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className="font-display text-[10px] tracking-[3px] text-[var(--color-muted)] uppercase flex-shrink-0">
             ✦ NO RESTOCK ✦ BY LOCALS FOR LOCALS ✦ POROS ISLAND ✦
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}