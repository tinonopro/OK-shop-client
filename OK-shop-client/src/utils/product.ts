import type { Product } from "../types.ts";

export type SortOrder = "asc" | "desc";

export type ProductFilter = {
  keyword?: string;
  category?: string;
  maxPrice?: number;
  sort?: SortOrder;
};

export function getCategories(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.category))];
}

export function filterProducts(products: Product[], filter: ProductFilter = {}): Product[] {
  const { keyword = "", category, maxPrice, sort } = filter;
  const kw = keyword.trim().toLocaleLowerCase("vi");

  const result = products.filter((p) => {
    const matchKeyword =
      !kw ||
      p.name.toLocaleLowerCase("vi").includes(kw) ||
      p.category.toLocaleLowerCase("vi").includes(kw);
    const matchCategory = !category || category === "Tất cả" || p.category === category;
    const matchPrice = maxPrice === undefined || p.price <= maxPrice;
    return matchKeyword && matchCategory && matchPrice;
  });

  if (sort === "asc") return [...result].sort((a, b) => a.price - b.price);
  if (sort === "desc") return [...result].sort((a, b) => b.price - a.price);
  return result;
}

export function searchByPriceRange(products: Product[], min: number, max: number): Product[] {
  return products.filter((p) => p.price >= min && p.price <= max);
}

export function groupByCategory(products: Product[]): Record<string, number> {
  return products.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1;
    return acc;
  }, {});
}

export type PriceOption = {
  id: string;
  label: string;
  min: number;
  max: number;
};

export const PRICE_OPTIONS: PriceOption[] = [
  { id: "all", label: "Tất cả mức giá", min: 0, max: Number.POSITIVE_INFINITY },
  { id: "under200", label: "Dưới 200.000 đ", min: 0, max: 199999 },
  { id: "200to400", label: "200.000 đ – 400.000 đ", min: 200000, max: 400000 },
  { id: "over400", label: "Trên 400.000 đ", min: 400001, max: Number.POSITIVE_INFINITY },
];
