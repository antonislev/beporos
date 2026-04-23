import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export default function ArtifactsPage() {
  const products = getAllProducts();

  return (
    <section className="px-6 md:px-10 py-24 max-w-[1000px] mx-auto">
      <div className="mb-6">
        <span className="font-display text-[10px] tracking-[3px] text-[var(--color-pink)] uppercase font-bold block mb-2">
          SUMMER 2 — 2026
        </span>
        <h1 className="font-display text-[clamp(28px,4vw,38px)] font-bold tracking-[3px] uppercase">
          TEES
        </h1>
      </div>

      <p className="text-[var(--color-muted)] leading-relaxed max-w-[480px] mb-14">
        2 designs. No restock. DM
        {" "}<a href="https://instagram.com/beporos" target="_blank" rel="noopener noreferrer" className="text-[var(--color-pink)] hover:underline">@beporos</a>{" "}
        to grab one or find us on the island this summer.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {products.map((product) => (
          <Link key={product.id} href={`/artifacts/${product.slug}`} className="group block">
            <div className="aspect-[4/5] bg-[var(--color-bg-alt)] relative overflow-hidden border border-[var(--color-border)] group-hover:border-[var(--color-pink)] transition-colors">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-700" sizes="(max-width: 768px) 100vw, 45vw" />
            </div>
            <div className="mt-4">
              <h2 className="font-display text-[14px] font-bold tracking-[2px] uppercase group-hover:text-[var(--color-pink)] transition-colors">
                {product.name}
              </h2>
              <p className="text-sm text-[var(--color-muted)] mt-1">
                {product.description.split('.')[0]}.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}