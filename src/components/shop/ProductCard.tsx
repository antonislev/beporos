"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block transition-transform hover:-translate-y-1"
    >
      {/* Image placeholder */}
      <div className="w-full aspect-[3/4] bg-[var(--bg-alt)] rounded-sm flex items-center justify-center relative overflow-hidden">
        <span className="font-display text-[48px] font-bold text-[var(--border)] tracking-[4px] select-none group-hover:scale-105 transition-transform">
          BP
        </span>

        {product.tag && (
          <span className="absolute top-3 left-3 font-display text-[9px] tracking-[2px] bg-[var(--accent)] text-white px-[10px] py-1 uppercase">
            {product.tag}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="pt-4">
        <h3 className="font-display text-[12px] font-bold tracking-[2px] mb-1">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--muted)]">
            {formatPrice(product.price)}
          </span>
          <span className="font-display text-[9px] tracking-[2px] text-[var(--muted)] uppercase">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
}