import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "ghost-protocol",
    slug: "ghost-protocol",
    name: "GHOST PROTOCOL",
    price: 35,
    images: ["/images/products/ghost-protocol-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Heavyweight 240gsm cotton tee. Oversized fit. Screen-printed front & back graphics. Made in Athens.",
    category: "tee",
    tag: "new",
    inStock: true,
  },
  {
    id: "concrete-hymn",
    slug: "concrete-hymn",
    name: "CONCRETE HYMN",
    price: 65,
    images: ["/images/products/concrete-hymn-1.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "380gsm brushed fleece hoodie. Dropped shoulders, kangaroo pocket. Embroidered chest logo.",
    category: "hoodie",
    inStock: true,
  },
  {
    id: "signal-lost",
    slug: "signal-lost",
    name: "SIGNAL LOST",
    price: 30,
    images: ["/images/products/signal-lost-1.jpg"],
    sizes: ["M", "L", "XL"],
    description:
      "200gsm garment-dyed tee. Relaxed cut. Distressed print. Limited run — once gone, gone.",
    category: "tee",
    tag: "limited",
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}