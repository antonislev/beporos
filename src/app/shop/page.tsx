import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";

export default function ShopPage() {
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

      <p className="text-sm text-[var(--color-muted)] font-light leading-relaxed max-w-[500px] mb-14">
        These aren&apos;t just clothes. Each piece is a passport to the island — a
        wearable artifact that carries the identity, history, and code of Poros.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[800px]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}