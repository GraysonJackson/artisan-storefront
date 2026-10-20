"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import { getCategories } from "@/lib/products";
import ProductCard from "./ProductCard";

interface CatalogSectionProps {
  initialProducts: Product[];
}

export default function CatalogSection({ initialProducts }: CatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("featured");

  const categories = getCategories();

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...initialProducts];

    // Category filter
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Live search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q)) ||
          p.variants.some((v) => v.name.toLowerCase().includes(q))
      );
    }

    // Sort control
    if (sortOption === "price-asc") {
      list.sort((a, b) => {
        const minA = Math.min(...a.variants.map((v) => v.priceInCents));
        const minB = Math.min(...b.variants.map((v) => v.priceInCents));
        return minA - minB;
      });
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => {
        const maxA = Math.max(...a.variants.map((v) => v.priceInCents));
        const maxB = Math.max(...b.variants.map((v) => v.priceInCents));
        return maxB - maxA;
      });
    } else if (sortOption === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [initialProducts, activeCategory, searchQuery, sortOption]);

  return (
    <section className="w-full">
      {/* Catalog Controls Bar */}
      <div className="catalog-controls bg-panel border border-wood rounded-[4px] p-3 sm:p-4 mb-6 shadow-brutal flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        {/* Category Tabs */}
        <div
          className="category-tabs flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none"
          role="group"
          aria-label="Filter products by category"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}

                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat.id)}
                data-category={cat.id}
                className={`tab-btn font-mono text-xs px-3 py-1.5 rounded-[2px] border transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-brass text-tavern font-bold border-brass"
                    : "bg-card text-parchment-muted border-wood hover:text-parchment hover:border-brass-border"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Group */}
        <div className="filter-search-group flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            id="product-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search accessories..."
            aria-label="Search accessories"
            className="search-box bg-tavern border border-wood text-parchment font-sans text-xs sm:text-sm px-3 py-1.5 rounded-[2px] w-full sm:w-56 focus:outline-none focus:border-brass placeholder:text-parchment-faint"
          />

          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            aria-label="Sort accessories"
            className="sort-select bg-tavern border border-wood text-parchment font-mono text-xs px-2.5 py-2 rounded-[2px] cursor-pointer focus:outline-none focus:border-brass"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="bg-panel border border-wood rounded-[4px] p-12 text-center my-8">
          <p className="font-mono text-parchment-muted text-sm">
            No accessories found matching your criteria.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
              setSortOption("featured");
            }}
            className="mt-4 font-mono text-xs text-brass-light underline hover:text-brass"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div
          className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          id="products-grid"
        >
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
