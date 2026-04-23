import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "poros-island-black",
    slug: "poros-island-black",
    name: "POROS ISLAND — BLACK",
    price: 0,
    images: [
      "/images/products/poros-island-black-front.jpg",
      "/images/products/poros-island-black-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "The activist tee. Don't pollute its waters. Don't litter on its land. Don't mess with Poros Island. Pink neon script on black heavyweight cotton. Oversized fit.",
    category: "tee",
    tag: "new",
    inStock: true,
  },
  {
    id: "1963",
    slug: "1963",
    name: "1963",
    price: 0,
    images: [
      "/images/products/1963-front.jpg",
      "/images/products/1963-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Poros before the marina, before the tourists. 1963. Vintage island photography on front. Be a lover, be Poros on the back. White heavyweight cotton. Oversized fit.",
    category: "tee",
    tag: "new",
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}