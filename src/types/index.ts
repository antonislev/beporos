export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
  description: string;
  category: "tee" | "hoodie" | "jacket" | "accessory";
  tag?: "limited" | "sold-out" | "new" | "artifact";
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Drop {
  id: string;
  slug: string;
  title: string;
  date: string;
  status: "upcoming" | "live" | "past";
  description: string;
  pieces: number;
  image?: string;
}

export interface SocietyPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body?: string;
  tag: "event" | "nightlife" | "island-life" | "local-spot" | "food" | "people" | "announcement" | "culture" | "manifesto" | "news";
  date: string;
  pinned?: boolean;
  image?: string;
}