import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "poros-island-black",
    slug: "poros-island-black",
    name: "ACTIVIST TSHIRT",
    price: 0,
    images: [
      "/images/products/poros-island-black-front.jpg",
      "/images/products/poros-island-black-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Protect the island at all costs . Don't pollute its waters. Don't litter on its land. Don't mess with Poros Island. Pink neon script on black heavyweight 100% greek cotton. Oversized/boxy fit.",
    category: "tee",
    tag: "new",
    inStock: true,
  },
  {
    id: "1963",
    slug: "1963",
    name: "1963 TSHIRT",
    price: 0,
    images: [
      "/images/products/1963-front.jpg",
      "/images/products/1963-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Poros was always the place to find your summer love.Just dont let your bf/gf find out.Graphic print white heavyweight 100% greek cotton. Oversized/boxy fit.",
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