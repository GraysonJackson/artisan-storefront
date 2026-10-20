"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ReceiptModal from "@/components/ReceiptModal";
import { formatCents } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { CartItem } from "@/lib/types";

export default function CheckoutPage() {
  const { items, subtotalInCents, clearCart, openCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [receiptSnapshot, setReceiptSnapshot] = useState<{
    items: CartItem[];
    totalInCents: number;
  }>({ items: [], totalInCents: 0 });

  const handleSimulatedCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setReceiptSnapshot({
      items: [...items],
      totalInCents: subtotalInCents,
    });
    clearCart();
    setIsSubmitting(false);
    setReceiptOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-tavern text-parchment">
      <Navbar onCartOpen={openCart} />
      <CartDrawer />

      <main className="max-w-2xl w-full mx-auto my-8 sm:my-12 px-4 sm:px-6 flex-1">
        <div className="mb-6 font-mono text-xs text-parchment-muted flex items-center gap-2">
          <Link href="/" className="hover:text-brass-light underline">
            &larr; Return to shop
          </Link>
          <span>/</span>
          <span className="text-brass-light">Simulated Checkout</span>
        </div>

        <div className="bg-panel border border-wood rounded-[4px] p-6 sm:p-8 shadow-brutal">
          <div className="border-b border-wood pb-4 mb-6">
            <h1 className="font-display text-2xl font-bold text-brass-light">
              Review your demo order
            </h1>
            <p className="text-xs font-mono text-parchment-muted mt-1">
              No real payment details are collected.
            </p>
          </div>

          {items.length === 0 && !receiptOpen ? (
            <div className="text-center py-12">
              <p className="text-parchment-faint font-mono text-sm mb-4">
                Your cart is empty.
              </p>
              <Link
                href="/"
                className="font-mono text-xs text-brass-light hover:text-brass underline"
              >
                Browse accessories &rarr;
              </Link>
            </div>
          ) : (
            <div>
              {/* Order summary table */}
              <div className="mb-6 bg-card border border-wood p-4 rounded-[3px]">
                <h2 className="font-mono text-xs text-brass-light font-bold uppercase tracking-wider mb-3">
                  Order summary ({items.length} items)
                </h2>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="flex justify-between items-center text-xs font-mono py-1 border-b border-wood/50 last:border-0"
                    >
                      <div className="text-parchment">
                        {item.productTitle}{" "}
                        <span className="text-parchment-faint">({item.variantTitle})</span>{" "}
                        <span className="text-brass-light">&times; {item.quantity}</span>
                      </div>
                      <div className="font-bold text-brass-light">
                        {formatCents(item.unitPriceInCents * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 mt-3 border-t border-wood font-mono text-sm">
                  <span className="text-parchment font-bold">Total:</span>
                  <span className="text-base font-bold text-brass-light">
                    {formatCents(subtotalInCents)}
                  </span>
                </div>
                <div className="text-right text-[10px] font-mono text-parchment-faint mt-1">
                  Demo total in cents: {subtotalInCents.toLocaleString()} cents
                </div>
              </div>

              {/* Simulation Notice */}
              <div className="bg-[#e7eee8] border border-brass-border p-3.5 rounded-[3px] mb-6 text-center font-mono text-xs text-brass-light">
                Clicking confirm executes a simulated checkout: no real payment details are required or collected.
              </div>

              <form onSubmit={handleSimulatedCheckout} className="space-y-4"><label className="block">Name <input name="name" required defaultValue="Example Player" className="border border-wood p-2 w-full"/></label><label className="block">Demo email <input name="email" type="email" required defaultValue="player@example.com" className="border border-wood p-2 w-full"/></label><p>Free demo delivery. Nothing is shipped and no email is sent.</p>
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full bg-brass hover:bg-brass-light text-tavern font-mono text-sm font-bold py-3.5 px-6 rounded-[2px] border border-black shadow-[2px_2px_0px_#000] active:translate-x-px active:translate-y-px transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Completing..." : `Complete demo order (${formatCents(subtotalInCents)})`}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <ReceiptModal
        isOpen={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        receiptItems={receiptSnapshot.items}
        receiptTotalInCents={receiptSnapshot.totalInCents}
      />
    </div>
  );
}
