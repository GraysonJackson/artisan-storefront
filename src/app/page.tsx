"use client";

import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export default function HomePage() {
  const products = getProducts();
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartCount} onCartOpen={() => useCartStore.getState().openCart()} />
      <CartDrawer />
      <main className="flex-1 px-6 py-12">
        <h1 className="font-serif text-3xl mb-8">Handcrafted Goods</h1>
        <ProductGrid products={products} />
      </main>
    </div>
  );
}