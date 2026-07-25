"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getProductById, getProducts } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.defaultVariantId || product?.variants[0]?.id
  );
  const { addItem } = useCartStore();

  if (!product) {
    return <div>Product not found</div>;
  }

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  ) || product.variants[0];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-stone-100">
          <Image
            src={selectedVariant.image}
            alt={`${product.name} in ${selectedVariant.name}`}
            width={800}
            height={800}
            className="w-full h-auto"
            unoptimized
          />
        </div>
        <div>
          <h1 className="font-serif text-3xl mb-4">{product.name}</h1>
          <p className="text-stone-600 mb-6">${product.price.toFixed(2)}</p>
          <p className="mb-8">{product.description}</p>

          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-widest text-stone-600 mb-3">
              Color Options
            </h2>
            <div className="flex gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedVariantId === variant.id
                      ? "border-stone-900"
                      : "border-stone-200"
                  }`}
                  style={{ backgroundColor: variant.colorHex }}
                  aria-label={`Select ${variant.name}`}
                />
              ))}
            </div>
          </div>

<button
  onClick={() => {
    if (!selectedVariantId) return;
    addItem(product, selectedVariantId);
  }}
  className="w-full bg-stone-900 text-white py-3 px-6 hover:bg-stone-800 transition-colors"
>
  Add to Cart
</button>
        </div>
      </div>
    </div>
  );
}