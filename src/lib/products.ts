import productsData from "@/data/products.json";
import { Product } from "./types";

export const BASE_PATH = "/artisan-storefront";

export function withBasePath(path: string): string {
  if (!path) return "";
  if (path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getProductById(id: string): Product | undefined {
  return (productsData as Product[]).find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return productsData as Product[];
  return (productsData as Product[]).filter((p) => p.category === category);
}

export function getCategories(): { id: string; label: string }[] {
  return [
    { id: "all", label: "All Relics" },
    { id: "storage", label: "Dice Vaults" },
    { id: "mats", label: "Battle Mats" },
    { id: "gm", label: "GM Screens" },
    { id: "dice", label: "Solid Metal" },
  ];
}
