"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug } from "@/lib/products";
import OrderForm from "@/components/OrderForm";

export default function ArtifactPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const [currentImage, setCurrentImage] = useState(0);
  const [formOpen, setFormOpen] = useState(false);

  if (!product) {
    return (
      <section className="px-6 py-24 text-center">
        <h1 className="font-display text-2xl tracking-[3px] mb-4">NOT FOUND</h1>
        <Link href="/artifacts" className="text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors text-sm">← Back</Link>
      </section>
    );
  }

  return (
    <>
      <section className="px-6 md:px-10 py-24 max-w-[1000px] mx-auto">
        <Link href="/artifacts" className="font-display text-[11px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors mb-10 inline-block">← BACK</Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
          <div>
            <div className="aspect-[4/5] bg-[var(--color-bg-alt)] relative overflow-hidden border border-[var(--color-border)]">
              <Image src={product.images[currentImage]} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setCurrentImage(i)} className={`w-16 h-20 relative overflow-hidden border-2 transition-colors ${currentImage === i ? "border-[var(--color-pink)]" : "border-[var(--color-border)]"}`}>
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[2px] uppercase mb-4">{product.name}</h1>
            <div className="w-full h-[1px] bg-[var(--color-border)] mb-5" />
            <p className="text-[var(--color-muted)] leading-[1.8] mb-8">{product.description}</p>

            <div className="mb-6">
              <span className="font-display text-[10px] tracking-[2px] text-[var(--color-muted)] block mb-3 font-bold">SIZES</span>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <span key={size} className="font-display text-[11px] px-4 py-2 border border-[var(--color-border)] text-[var(--color-muted)]">{size}</span>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <button onClick={() => setFormOpen(true)} className="w-full font-display text-[11px] tracking-[2px] uppercase py-4 bg-[var(--color-pink)] text-[var(--color-text-inv)] hover:bg-[var(--color-pink-hover)] transition-colors font-bold">
                GRAB ONE
              </button>
              <p className="font-display text-[10px] tracking-[1px] text-[var(--color-muted)] text-center">100 units. No restock.</p>
            </div>
          </div>
        </div>
      </section>

      <OrderForm isOpen={formOpen} onClose={() => setFormOpen(false)} productId={product.id} productName={product.name} sizes={product.sizes} />
    </>
  );
}