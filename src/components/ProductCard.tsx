"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { formatCents } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import ProductVisual from "./ProductVisual";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.defaultVariantId || product.variants[0]?.id
  );
  const { addItem } = useCartStore();

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const handleSelectVariant = (variantId: string) => {
    setSelectedVariantId(variantId);
  };

  const handleAddToCart = () => {
    addItem(product, activeVariant.id);
  };

  return (
    <article
      className="product-card bg-panel border border-wood hover:border-brass rounded-[4px] overflow-hidden flex flex-col shadow-brutal transition-colors duration-150 group"
      data-id={product.id}
      data-category={product.category}
    >
      {/* Product Visual Frame */}
      <div className="product-visual-frame h-48 sm:h-56 bg-[#12100e] border-b border-wood flex items-center justify-center relative p-4">
        <span className="category-stamp absolute top-2.5 left-2.5 bg-[#3b2a1a] border border-brass-border text-brass-light font-mono text-[9px] sm:text-[10px] px-1.5 py-0.5 uppercase tracking-wide rounded-[2px] z-10">
          {product.categoryLabel || product.category}
        </span>
        <ProductVisual
          productId={product.id}
          variant={activeVariant}
          alt={`${product.name} in ${activeVariant.name}`}
        />
      </div>

      {/* Product Info */}
      <div className="product-info p-4 sm:p-5 flex flex-col flex-1">
        <h2
          className="product-title font-display text-base sm:text-lg font-bold text-parchment mb-1.5 leading-snug"
          id={`title-${product.id}`}
        >
          {product.name}
        </h2>
        <p className="product-desc text-xs sm:text-[12.5px] text-parchment-muted leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* Variant Selector */}
        <div className="variant-selector mb-4">
          <div className="variant-label font-mono text-[10px] sm:text-[11px] text-parchment-faint mb-1.5 flex justify-between">
            <span>FINISH / VARIANT:</span>
            <span
              className="active-variant-name text-brass-light font-bold"
              id={`variant-name-${product.id}`}
            >
              {activeVariant.name}
            </span>
          </div>

          <div className="variant-chips flex flex-wrap gap-1.5 sm:gap-2">
            {product.variants.map((v) => {
              const isActive = v.id === activeVariant.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleSelectVariant(v.id)}
                  className={`variant-chip font-mono text-[10px] sm:text-[11px] px-2 py-1 rounded-[2px] border flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? "border-brass bg-[#342817] text-brass-light font-bold"
                      : "border-wood bg-card text-parchment-muted hover:border-brass hover:text-parchment"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Select ${v.name} variant`}
                >
                  <span
                    className="chip-swatch w-2.5 h-2.5 rounded-[2px] border border-black inline-block shrink-0"
                    style={{ backgroundColor: v.colorHex }}
                  />
                  <span>{v.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="card-action-row flex justify-between items-center border-t border-wood pt-3.5 mt-auto">
          <div className="price-display flex flex-col">
            <span
              className="price-val font-mono text-base sm:text-lg font-bold text-brass-light leading-none"
              id={`price-${product.id}`}
            >
              {formatCents(activeVariant.priceInCents)}
            </span>
            <span className="cents-tag font-mono text-[9px] sm:text-[9.5px] text-parchment-faint mt-0.5">
              {activeVariant.priceInCents.toLocaleString()} CENTS
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="add-to-cart-btn bg-brass hover:bg-brass-light text-tavern font-mono text-xs font-bold px-3 sm:px-3.5 py-2 rounded-[2px] border border-black shadow-[2px_2px_0px_#000] active:translate-x-px active:translate-y-px transition-all cursor-pointer"
          >
            ADD TO PACK
          </button>
        </div>
      </div>
    </article>
  );
}
