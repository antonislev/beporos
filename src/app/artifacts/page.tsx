import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export default function ArtifactsPage() {
  const products = getAllProducts();

  return (
    <section className="px-6 md:px-10 py-24 max-w-[1200px] mx-auto">
      <div className="border-b border-[var(--color-border)] pb-5 mb-6">
        <span className="font-display text-[9px] tracking-[4px] text-[var(--color-pink)] uppercase block mb-2">
          COLLECTION 001 — FIRST TRANSMISSION
        </span>
        <h1 className="font-display text-[clamp(28px,4vw,42px)] font-bold tracking-[4px] uppercase">
          ARTIFACTS
        </h1>
      </div>

      <p className="text-sm text-[var(--color-muted)] font-light leading-relaxed max-w-[520px] mb-16">
        Each piece is a cultural passport — a wearable artifact that carries the identity,
        history, and code of Poros Island. These aren&apos;t for sale. They&apos;re for claiming.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-[900px]">
        {products.map((product) => (
          <Link key={product.id} href={`/artifacts/${product.slug}`} className="group block">
            {/* Front image */}
            <div className="aspect-square bg-[var(--color-bg-alt)] relative overflow-hidden border border-[var(--color-border)] group-hover:border-[var(--color-pink)] transition-colors">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-700" sizes="(max-width: 768px) 100vw, 45vw" />
              <span className="absolute top-4 left-4 font-display text-[9px] tracking-[2px] bg-[var(--color-pink)] text-[var(--color-text-inv)] px-3 py-1 uppercase">
                ARTIFACT
              </span>
            </div>

            {/* Info — no price */}
            <div className="mt-5">
              <h2 className="font-display text-[14px] font-bold tracking-[3px] uppercase group-hover:text-[var(--color-pink)] transition-colors">
                {product.name}
              </h2>
              <p className="text-sm text-[var(--color-muted)] font-light mt-2 leading-relaxed max-w-[380px]">
                {product.description.split('.').slice(0, 2).join('.') + '.'}
              </p>
              <span className="font-display text-[9px] tracking-[3px] text-[var(--color-pink)] mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                VIEW ARTIFACT →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}