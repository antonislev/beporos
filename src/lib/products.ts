import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "poros-island-black",
    slug: "poros-island-black",
    name: "POROS ISLAND TEE — BLACK",
    price: 35,
    images: [
      "/images/products/poros-island-black-front.jpg",
      "/images/products/poros-island-black-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Heavyweight 240gsm cotton tee. Oversized fit. Pink neon Poros Island script on chest. Back print: Don't pollute waters of / Don't litter in / Don't mess with Poros Island. By locals, for locals.",
    category: "tee",
    tag: "new",
    inStock: true,
  },
  {
    id: "1963",
    slug: "1963",
    name: "1963 TEE — WHITE",
    price: 35,
    images: [
      "/images/products/1963-front.jpg",
      "/images/products/1963-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Heavyweight 240gsm cotton tee. Oversized fit. Vintage 1963 Poros photography on front. Back print: Be a lover, be Poros. A tribute to the island's golden era.",
    category: "tee",
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}