"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ProductVisual from "@/components/ProductVisual";
import { formatCents } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/types";

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.defaultVariantId || product.variants[0]?.id
  );
  const { addItem, openCart } = useCartStore();

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  return (
    <div className="min-h-screen flex flex-col bg-tavern text-parchment">
      <Navbar onCartOpen={openCart} />
      <CartDrawer />

      <main className="max-w-[1100px] w-full mx-auto my-8 sm:my-12 px-4 sm:px-8 flex-1">
        {/* Breadcrumb */}
        <div className="mb-6 font-mono text-xs text-parchment-muted flex items-center gap-2">
          <Link href="/" className="hover:text-brass-light underline">
            &larr; Return to Armory
          </Link>
          <span>/</span>
          <span className="text-brass-light">{product.name}</span>
        </div>

        <div className="bg-panel border border-wood rounded-[4px] p-6 sm:p-10 shadow-brutal grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Visual container */}
          <div className="bg-[#12100e] border border-wood rounded-[3px] p-8 flex items-center justify-center relative min-h-[300px]">
            <span className="category-stamp absolute top-3 left-3 bg-[#3b2a1a] border border-brass-border text-brass-light font-mono text-[10px] px-2 py-0.5 uppercase tracking-wide rounded-[2px]">
              {product.categoryLabel || product.category}
            </span>
            <ProductVisual
              productId={product.id}
              variant={selectedVariant}
              alt={`${product.name} in ${selectedVariant.name}`}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-parchment mb-2 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-2xl font-bold text-brass-light">
                  {formatCents(selectedVariant.priceInCents)}
                </span>
                <span className="font-mono text-xs text-parchment-faint">
                  {selectedVariant.priceInCents.toLocaleString()} CENTS
                </span>
              </div>
              <p className="text-parchment-muted text-sm sm:text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Variant selection */}
              <div className="mb-8">
                <div className="font-mono text-xs text-parchment-faint mb-2 flex justify-between">
                  <span>SELECT FINISH:</span>
                  <span className="text-brass-light font-bold">{selectedVariant.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariantId === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`font-mono text-xs px-3 py-1.5 rounded-[2px] border flex items-center gap-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-brass bg-[#342817] text-brass-light font-bold"
                            : "border-wood bg-card text-parchment-muted hover:border-brass hover:text-parchment"
                        }`}
                        aria-pressed={isSelected}
                        aria-label={`Select ${variant.name}`}
                      >
                        <span
                          className="w-3 h-3 rounded-[2px] border border-black inline-block shrink-0"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                        <span>{variant.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (!selectedVariantId) return;
                addItem(product, selectedVariantId);
              }}
              className="w-full bg-brass hover:bg-brass-light text-tavern font-mono text-sm font-bold py-3 px-6 rounded-[2px] border border-black shadow-[2px_2px_0px_#000] active:translate-x-px active:translate-y-px transition-all cursor-pointer"
            >
              ADD TO PACK
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
