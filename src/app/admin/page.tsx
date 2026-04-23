"use client";

import { useState, useEffect } from "react";

interface Order {
  id: string;
  name: string;
  instagram: string;
  size: string;
  quantity: number;
  productName: string;
  date: string;
  status: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?key=${key}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
        setAuthed(true);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  };

  if (!authed) {
    return (
      <section className="px-6 py-24 max-w-[400px] mx-auto">
        <h1 className="font-display text-xl font-bold tracking-[2px] uppercase mb-6">ADMIN</h1>
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Enter key" className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-pink)] transition-colors mb-4 placeholder:text-[var(--color-muted)]/50" />
        <button onClick={fetchOrders} className="w-full font-display text-[11px] tracking-[2px] uppercase py-3 bg-[var(--color-pink)] text-[var(--color-text-inv)] font-bold">{loading ? "LOADING..." : "VIEW ORDERS"}</button>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-10 py-24 max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-xl font-bold tracking-[2px] uppercase">ORDERS ({orders.length})</h1>
        <button onClick={fetchOrders} className="font-display text-[10px] tracking-[2px] text-[var(--color-pink)] font-bold">REFRESH</button>
      </div>

      {orders.length === 0 ? (
        <p className="text-[var(--color-muted)]">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {[...orders].reverse().map((order) => (
            <div key={order.id} className="border border-[var(--color-border)] p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <div className="flex-1">
                <span className="font-display text-[13px] font-bold">{order.name}</span>
                <a href={`https://instagram.com/${order.instagram}`} target="_blank" rel="noopener noreferrer" className="ml-3 text-[var(--color-pink)] text-sm hover:underline">@{order.instagram}</a>
              </div>
              <span className="font-display text-[11px] tracking-[1px] text-[var(--color-muted)]">{order.productName}</span>
              <span className="font-display text-[11px] tracking-[1px]">Size: {order.size}</span>
              <span className="font-display text-[11px] tracking-[1px]">Qty: {order.quantity}</span>
              <span className="font-display text-[10px] tracking-[1px] text-[var(--color-muted)]">{new Date(order.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}