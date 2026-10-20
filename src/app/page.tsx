"use client";

import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import CatalogSection from "@/components/CatalogSection";
import { getProducts } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export default function HomePage() {
  const products = getProducts();
  const { openCart } = useCartStore();

  return (
    <div className="min-h-screen flex flex-col bg-tavern text-parchment">
      <Navbar onCartOpen={openCart} />
      <CartDrawer />

      <main className="shop-container max-w-[1360px] w-full mx-auto my-6 sm:my-8 px-4 sm:px-8 flex-1" id="top">
        {/* Intro Banner Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between border-b border-wood pb-4 gap-2">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-brass-light tracking-wide">
              Adventurer&apos;s Armory
            </h1>
            <p className="font-sans text-xs sm:text-sm text-parchment-muted mt-1">
              Hand-milled hardwood vaults, combat-grade full-grain leather, solid oak screens, and balanced metal polyhedrals.
            </p>
          </div>
          <div className="font-mono text-[11px] text-parchment-faint">
            ALL SETTLEMENTS CALCULATED IN EXACT INTEGER CENTS
          </div>
        </div>

        {/* Catalog Section with Filter, Search, and Sort */}
        <CatalogSection initialProducts={products} />
      </main>

      {/* Tavern Footer */}
      <footer className="bg-panel border-t-2 border-wood py-8 px-4 sm:px-8 text-center text-xs font-mono text-parchment-faint mt-auto">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-brass-light font-display font-bold">
            <span>⚔</span> SIDEQUEST SUPPLY CO.
          </div>
          <div>
            Demo Storefront Demonstration // Zero Card Charges // Pure Client-Side State
          </div>
          <div>
            LocalStorage: <code className="text-brass-light">sidequest-supply.cart.v1</code>
          </div>
        </div>
      </footer>
    </div>
  );
}
