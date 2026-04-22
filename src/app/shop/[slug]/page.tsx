"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!product) {
    return (
      <section className="px-6 py-24 text-center">
        <h1 className="font-display text-2xl tracking-[4px] mb-4">
          PRODUCT NOT FOUND
        </h1>
        <Link
          href="/shop"
          className="font-display text-[11px] tracking-[2px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
        >
          ← BACK TO SHOP
        </Link>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-10 py-24 max-w-[1200px] mx-auto">
      <Link
        href="/shop"
        className="font-display text-[11px] tracking-[2px] text-[var(--muted)] hover:text-[var(--text)] transition-colors mb-12 inline-block"
      >
        ← BACK TO SHOP
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {/* Image */}
        <div className="aspect-[3/4] bg-[var(--bg-alt)] flex items-center justify-center">
          <span className="font-display text-[64px] font-bold text-[var(--border)] tracking-[6px] select-none">
            BP
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="font-display text-[10px] tracking-[3px] text-[var(--muted)] uppercase mb-3">
            {product.category}
          </span>
          <h1 className="font-display text-[clamp(22px,3vw,32px)] font-bold tracking-[3px] mb-2">
            {product.name}
          </h1>
          <p className="text-lg text-[var(--muted)] mb-8">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed font-light mb-10">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="mb-8">
            <span className="font-display text-[10px] tracking-[2px] text-[var(--muted)] block mb-3">
              SIZE
            </span>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`font-display text-[11px] tracking-[1px] px-5 py-3 border transition-all ${
                    selectedSize === size
                      ? "border-[var(--text)] bg-[var(--text)] text-[var(--text-inv)]"
                      : "border-[var(--border)] hover:border-[var(--text)]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => {
              if (selectedSize) addItem(product, selectedSize);
            }}
            disabled={!selectedSize}
            className="font-display text-[11px] tracking-[3px] uppercase py-4 bg-[var(--text)] text-[var(--text-inv)] hover:bg-[var(--accent)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[var(--text)] mt-auto"
          >
            {selectedSize ? "ADD TO CART" : "SELECT A SIZE"}
          </button>
        </div>
      </div>
    </section>
  );
}