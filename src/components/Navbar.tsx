"use client";

import Link from "next/link";
import { formatCents } from "@/lib/products";
import { useCartStore } from "@/lib/store";

interface NavbarProps {
  onCartOpen: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const { items, subtotalInCents, isOpen } = useCartStore();
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-panel border-b-2 border-wood sticky top-0 z-40">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 text-parchment group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-brass-border flex items-center justify-center text-tavern font-extrabold font-display text-base sm:text-lg rounded-sm shadow-[2px_2px_0px_#000] group-hover:bg-brass transition-colors">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-xl font-extrabold tracking-wider text-brass-light leading-tight">
              SIDEQUEST SUPPLY
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-parchment-muted tracking-widest uppercase hidden xs:inline">
              Tabletop accessories
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={onCartOpen}
            id="open-cart-btn"
            aria-label="View shopping cart"
            aria-expanded={isOpen}
            aria-controls="cart-drawer-overlay"
            className="bg-card hover:bg-hover border border-brass text-brass-light px-3 sm:px-4 py-2 rounded-[3px] flex items-center gap-2 sm:gap-2.5 font-mono text-xs font-bold cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.5)] transition-all active:translate-x-px active:translate-y-px"
          >
            <span className="hidden sm:inline">CART</span>
            <span className="sm:hidden text-sm">Cart</span>
            <span
              id="header-cart-count"
              className="bg-brass text-tavern px-1.5 py-0.5 rounded-[2px] text-[11px] font-bold min-w-[20px] text-center"
            >
              {totalCount}
            </span>
            <span id="header-cart-total" className="text-brass-light font-mono text-xs">
              {formatCents(subtotalInCents)}
            </span>
          </button>
        </div>
      </div>

      {/* Simulated Notice Banner */}
      <div className="bg-[#e7eee8] border-b border-brass-border px-4 py-1.5 text-center font-mono text-[10px] sm:text-[11.5px] text-brass-light tracking-wide flex justify-center items-center gap-2 overflow-hidden">
        <span className="truncate">
          A fictional shop for tabletop sessions. No payments or deliveries.
        </span>
      </div>
    </header>
  );
}
