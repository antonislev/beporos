import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <section className="px-6 md:px-10 py-24 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-end border-b border-[var(--border)] pb-5 mb-14">
        <h1 className="font-display text-[clamp(28px,4vw,42px)] font-bold tracking-[4px] uppercase">
          SHOP
        </h1>
        <span className="font-display text-[11px] tracking-[2px] text-[var(--muted)]">
          {products.length} ITEMS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}