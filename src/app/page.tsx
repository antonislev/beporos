import Link from "next/link";
import { products } from "@/lib/products";
import { getUpcomingDrop } from "@/lib/drops";
import ProductCard from "@/components/shop/ProductCard";

export default function HomePage() {
  const upcomingDrop = getUpcomingDrop();

  return (
    <>
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
        {/* Subtle radial background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[120px]" />
        </div>

        <span
          className="font-display text-[11px] tracking-[6px] text-[var(--muted)] uppercase mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Athens Street Society
        </span>

        <h1
          className="font-display text-[clamp(48px,10vw,120px)] font-bold tracking-[clamp(8px,2vw,20px)] uppercase leading-none mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          BEPOROS
        </h1>

        <p
          className="text-base text-[var(--muted)] max-w-[420px] leading-relaxed font-light mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          Local designs. No seasons. No rules. Born on the streets of Athens,
          made for the ones who walk them.
        </p>

        <Link
          href="/shop"
          className="font-display text-[11px] tracking-[3px] uppercase px-12 py-4 border border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--text-inv)] transition-all opacity-0 animate-fade-up"
          style={{ animationDelay: "0.8s" }}
        >
          ENTER SHOP
        </Link>

        <span
          className="absolute bottom-8 font-display text-[10px] tracking-[3px] text-[var(--muted)] opacity-0 animate-fade-up"
          style={{ animationDelay: "1s" }}
        >
          SCROLL
        </span>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="px-6 md:px-10 py-24 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end border-b border-[var(--border)] pb-5 mb-14">
          <h2 className="font-display text-[clamp(24px,4vw,36px)] font-bold tracking-[4px] uppercase">
            SHOP
          </h2>
          <Link
            href="/shop"
            className="font-display text-[11px] tracking-[2px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            VIEW ALL →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* UPCOMING DROP TEASER */}
      {upcomingDrop && (
        <section className="px-6 md:px-10 py-24 bg-[var(--text)] text-[var(--text-inv)]">
          <div className="max-w-[1200px] mx-auto text-center">
            <span className="font-display text-[10px] tracking-[4px] text-[var(--muted)] uppercase block mb-6">
              NEXT DROP
            </span>
            <h2 className="font-display text-[clamp(28px,5vw,48px)] font-bold tracking-[4px] uppercase mb-6">
              {upcomingDrop.title}
            </h2>
            <p className="text-[var(--muted)] max-w-[500px] mx-auto leading-relaxed mb-10 font-light">
              {upcomingDrop.description}
            </p>
            <Link
              href="/drops"
              className="font-display text-[11px] tracking-[3px] uppercase px-12 py-4 border border-[var(--text-inv)] hover:bg-[var(--text-inv)] hover:text-[var(--text)] transition-all inline-block"
            >
              SEE DROPS
            </Link>
          </div>
        </section>
      )}

      {/* SOCIETY TEASER */}
      <section className="px-6 md:px-10 py-24 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end border-b border-[var(--border)] pb-5 mb-14">
          <h2 className="font-display text-[clamp(24px,4vw,36px)] font-bold tracking-[4px] uppercase">
            SOCIETY
          </h2>
          <Link
            href="/society"
            className="font-display text-[11px] tracking-[2px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            READ MORE →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-[var(--bg-alt)] p-10 flex flex-col justify-end min-h-[300px]">
            <span className="font-display text-[9px] tracking-[3px] text-[var(--accent)] uppercase mb-3">
              MANIFESTO
            </span>
            <h3 className="font-display text-xl font-bold tracking-[2px] uppercase mb-3">
              WHY WE DON&apos;T DO SEASONS
            </h3>
            <p className="text-sm text-[var(--muted)] font-light leading-relaxed">
              Fashion calendars are built for corporations. We drop when
              something is ready. When the streets say it&apos;s time.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="bg-[var(--bg-alt)] p-8 flex-1 flex flex-col justify-end">
              <span className="font-display text-[9px] tracking-[3px] text-[var(--accent)] uppercase mb-2">
                CULTURE
              </span>
              <h3 className="font-display text-sm font-bold tracking-[2px] uppercase">
                ATHENS AFTER DARK
              </h3>
            </div>
            <div className="bg-[var(--bg-alt)] p-8 flex-1 flex flex-col justify-end">
              <span className="font-display text-[9px] tracking-[3px] text-[var(--accent)] uppercase mb-2">
                COMMUNITY
              </span>
              <h3 className="font-display text-sm font-bold tracking-[2px] uppercase">
                THE FIRST 100
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}