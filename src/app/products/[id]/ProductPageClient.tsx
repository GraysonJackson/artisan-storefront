"use client";

import { getProductById } from "@/lib/products";
import ProductDetail from "./ProductDetail";

export default function ProductPageClient({ productId }: { productId: string }) {
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-tavern text-parchment flex items-center justify-center p-8 font-mono">
        Relic not found.
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
