import productsData from "@/data/products.json";
import { Product } from "./types";

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getProductById(id: string): Product | undefined {
  return productsData.find((p) => p.id === id) as Product | undefined;
}

export function getProductsByCategory(category: string): Product[] {
  return productsData.filter((p) => p.category === category) as Product[];
}

export function getCategories(): string[] {
  const categories = new Set(productsData.map((p) => p.category));
  return Array.from(categories);
}