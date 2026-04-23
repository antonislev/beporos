"use client";

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, close, removeItem, totalPrice } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[70]" onClick={close} />

      <div className="fixed top-0 right-0 bottom-0 w-[400px] max-w-[90vw] bg-[var(--color-bg)] z-[71] flex flex-col border-l border-[var(--color-border)] animate-slide-in-right">
        <div className="flex items-center justify-between px-7 py-6 border-b border-[var(--color-border)]">
          <h2 className="font-display text-[13px] tracking-[3px] font-bold">YOUR CART</h2>
          <button onClick={close} className="font-display text-[11px] tracking-[2px] text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors" aria-label="Close cart">CLOSE</button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-5">
          {items.length === 0 ? (
            <p className="text-[var(--color-muted)] text-sm text-center mt-20 font-light">No artifacts claimed yet.</p>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4 py-4 border-b border-[var(--color-border)]">
                <div className="w-16 h-20 flex-shrink-0 flex items-center justify-center bg-[var(--color-bg-alt)] border border-[var(--color-border)]">
                  <span className="font-display text-[8px] text-[var(--color-muted)] font-bold">BP</span>
                </div>
                <div className="flex-1">
                  <p className="font-display text-[10px] tracking-[2px] font-bold">{item.product.name}</p>
                  <p className="text-[11px] text-[var(--color-muted)] mt-1">Size: {item.size} — Qty: {item.quantity}</p>
                  <p className="text-[13px] mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                  <button onClick={() => removeItem(item.product.id, item.size)} className="font-display text-[9px] tracking-[1px] text-[var(--color-muted)] hover:text-[var(--color-pink)] mt-2 transition-colors">REMOVE</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-7 py-6 border-t border-[var(--color-border)]">
            <div className="flex justify-between items-center mb-5">
              <span className="font-display text-[11px] tracking-[2px]">TOTAL</span>
              <span className="text-lg font-medium">{formatPrice(totalPrice())}</span>
            </div>
            <button className="w-full font-display text-[11px] tracking-[3px] uppercase py-4 bg-[var(--color-pink)] text-[var(--color-text-inv)] hover:bg-[var(--color-pink-hover)] transition-colors">
              CLAIM ARTIFACTS
            </button>
          </div>
        )}
      </div>
    </>
  );
}