"use client";

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, close, removeItem, totalPrice } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-[70] animate-[fadeIn_0.2s_ease]"
        onClick={close}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-[400px] max-w-[90vw] bg-[var(--bg)] z-[71] flex flex-col border-l border-[var(--border)] animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-[var(--border)]">
          <h2 className="font-display text-[13px] tracking-[3px] font-bold">
            YOUR CART
          </h2>
          <button
            onClick={close}
            className="text-xl font-light"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-5">
          {items.length === 0 ? (
            <p className="text-[var(--muted)] text-sm text-center mt-20">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 py-4 border-b border-[var(--border)]"
              >
                {/* Thumbnail placeholder */}
                <div
                  className="w-16 h-20 rounded-sm flex-shrink-0 flex items-center justify-center"
                  style={{ background: "var(--bg-alt)" }}
                >
                  <span className="font-display text-[8px] text-[var(--muted)] font-bold">
                    BP
                  </span>
                </div>

                <div className="flex-1">
                  <p className="font-display text-[10px] tracking-[2px] font-bold">
                    {item.product.name}
                  </p>
                  <p className="text-[11px] text-[var(--muted)] mt-1">
                    Size: {item.size} — Qty: {item.quantity}
                  </p>
                  <p className="text-[13px] mt-1">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="font-display text-[9px] tracking-[1px] text-[var(--muted)] hover:text-[var(--accent)] mt-2 transition-colors"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-7 py-6 border-t border-[var(--border)]">
            <div className="flex justify-between items-center mb-5">
              <span className="font-display text-[11px] tracking-[2px]">
                TOTAL
              </span>
              <span className="text-lg font-medium">
                {formatPrice(totalPrice())}
              </span>
            </div>
            <button className="w-full font-display text-[11px] tracking-[3px] uppercase py-4 bg-[var(--text)] text-[var(--text-inv)] hover:bg-[var(--accent)] transition-colors">
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}