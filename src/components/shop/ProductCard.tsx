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
      className="group block transition-transform hover:-translate-y-1"
    >
      <div className="w-full aspect-[3/4] bg-[var(--color-bg-alt)] rounded-sm relative overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 font-display text-[9px] tracking-[2px] bg-[var(--color-accent)] text-[var(--color-text-inv)] px-[10px] py-1 uppercase">
            {product.tag}
          </span>
        )}
      </div>
      <div className="pt-4">
        <h3 className="font-display text-[12px] font-bold tracking-[2px] mb-1">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--color-muted)]">
            {formatPrice(product.price)}
          </span>
          <span className="font-display text-[9px] tracking-[2px] text-[var(--color-muted)] uppercase">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
}