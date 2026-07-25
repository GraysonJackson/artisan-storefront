"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const products = getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={0} onCartOpen={() => setIsCartOpen(true)} />
      <main className="flex-1 px-6 py-12">
        <h1 className="font-serif text-3xl mb-8">Handcrafted Goods</h1>
        <ProductGrid products={products} />
      </main>
    </div>
  );
}