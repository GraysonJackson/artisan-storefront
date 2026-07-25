"use client";

import { ShoppingCart } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

export default function Navbar({ cartCount, onCartOpen }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
      <a href="/" className="font-serif text-2xl tracking-tight">
        Atelier Handmade
      </a>
      <div className="flex items-center gap-8">
        <a href="/products" className="text-sm uppercase tracking-widest text-stone-600 hover:text-stone-900">
          Shop
        </a>
        <button onClick={onCartOpen} className="relative" aria-label="Open cart">
          <ShoppingCart size={20} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}