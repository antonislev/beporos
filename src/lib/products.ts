import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "poros-island-black",
    slug: "poros-island-black",
    name: "POROS ISLAND — BLACK",
    price: 35,
    images: [
      "/images/products/poros-island-black-front.jpg",
      "/images/products/poros-island-black-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "The statement piece. Pink neon Poros Island script on chest. The back carries the island's code: Don't pollute its waters. Don't litter on its land. Don't mess with Poros Island. Heavyweight 240gsm. Oversized cut. This isn't a t-shirt — it's your passport.",
    category: "tee",
    tag: "artifact",
    inStock: true,
  },
  {
    id: "1963",
    slug: "1963",
    name: "1963",
    price: 35,
    images: [
      "/images/products/1963-front.jpg",
      "/images/products/1963-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A time capsule on cotton. 1963 — the golden era of Poros, captured in a single frame. Vintage island photography on front. The back whispers: Be a lover, be Poros. Heavyweight 240gsm. Oversized cut. Wear the history.",
    category: "tee",
    tag: "artifact",
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}