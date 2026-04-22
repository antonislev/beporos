import { create } from "zustand";
import { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  addItem: (product, size) => {
    const items = get().items;
    const existing = items.find(
      (i) => i.product.id === product.id && i.size === size
    );
    if (existing) {
      set({
        items: items.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      set({ items: [...items, { product, size, quantity: 1 }] });
    }
    set({ isOpen: true });
  },
  removeItem: (productId, size) => {
    set({
      items: get().items.filter(
        (i) => !(i.product.id === productId && i.size === size)
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
}));