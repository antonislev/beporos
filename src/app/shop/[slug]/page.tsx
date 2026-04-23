"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <section className="px-6 py-24 text-center">
        <h1 className="font-display text-2xl tracking-[4px] mb-4">NOT FOUND</h1>
        <Link href="/shop" className="font-display text-[11px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors">
          ← BACK TO ARTIFACTS
        </Link>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-10 py-24 max-w-[1200px] mx-auto">
      <Link href="/shop" className="font-display text-[11px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors mb-12 inline-block">
        ← BACK TO ARTIFACTS
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {/* Images */}
        <div>
          <div className="aspect-[3/4] bg-[var(--color-bg-alt)] relative overflow-hidden border border-[var(--color-border)]">
            <Image src={product.images[currentImage]} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-20 h-24 relative overflow-hidden border-2 transition-colors ${currentImage === i ? "border-[var(--color-pink)]" : "border-[var(--color-border)] hover:border-[var(--color-muted)]"}`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {product.tag === "artifact" && (
            <span className="font-display text-[9px] tracking-[3px] text-[var(--color-pink)] uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-pink)] rounded-full inline-block" />
              ARTIFACT
            </span>
          )}
          <h1 className="font-display text-[clamp(20px,3vw,28px)] font-bold tracking-[3px] mb-2">
            {product.name}
          </h1>
          <p className="text-lg text-[var(--color-muted)] mb-8">
            {formatPrice(product.price)}
          </p>

          <div className="w-full h-[1px] bg-[var(--color-border)] mb-8" />

          <p className="text-sm text-[var(--color-muted)] leading-[1.8] font-light mb-10">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="mb-8">
            <span className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-3">SIZE</span>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`font-display text-[11px] tracking-[1px] px-5 py-3 border transition-all ${selectedSize === size ? "border-[var(--color-pink)] bg-[var(--color-pink)] text-[var(--color-text-inv)]" : "border-[var(--color-border)] hover:border-[var(--color-pink)]"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => { if (selectedSize) addItem(product, selectedSize); }}
            disabled={!selectedSize}
            className="font-display text-[11px] tracking-[3px] uppercase py-4 bg-[var(--color-pink)] text-[var(--color-text-inv)] hover:bg-[var(--color-pink-hover)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-auto"
          >
            {selectedSize ? "CLAIM ARTIFACT" : "SELECT A SIZE"}
          </button>

          <p className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)] text-center mt-4">
            LIMITED RUN — ONCE GONE, GONE
          </p>
        </div>
      </div>
    </section>
  );
}