"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
    >
      <div className="w-full aspect-[3/4] bg-[var(--color-bg-alt)] relative overflow-hidden border border-[var(--color-border)] group-hover:border-[var(--color-pink)] transition-colors">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 font-display text-[9px] tracking-[2px] bg-[var(--color-pink)] text-[var(--color-text-inv)] px-3 py-1 uppercase">
            {product.tag === "artifact" ? "ARTIFACT" : product.tag}
          </span>
        )}
      </div>
      <div className="pt-4 flex justify-between items-start">
        <div>
          <h3 className="font-display text-[12px] font-bold tracking-[2px] mb-1 group-hover:text-[var(--color-pink)] transition-colors">
            {product.name}
          </h3>
          <span className="text-[11px] text-[var(--color-muted)]">
            {product.category.toUpperCase()} — {formatPrice(product.price)}
          </span>
        </div>
        <span className="font-display text-[9px] tracking-[2px] text-[var(--color-pink)] opacity-0 group-hover:opacity-100 transition-opacity mt-1">
          VIEW →
        </span>
      </div>
    </Link>
  );
}