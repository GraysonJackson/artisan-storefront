"use client";

import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/lib/store";
import { formatCents } from "@/lib/products";
import { CartItem } from "@/lib/types";
import ReceiptModal from "./ReceiptModal";

export default function CartDrawer() {
  const {
    items,
    subtotalInCents,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    initFromStorage,
  } = useCartStore();

  const [receiptOpen, setReceiptOpen] = useState(false);
  const [receiptSnapshot, setReceiptSnapshot] = useState<{
    items: CartItem[];
    totalInCents: number;
  }>({ items: [], totalInCents: 0 });

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Initialize from localStorage on client mount
  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  // WAI-ARIA Focus management and ESC key dismiss
  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeCart();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [isOpen, closeCart]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    // Snapshot items and total for demo receipt
    setReceiptSnapshot({
      items: [...items],
      totalInCents: subtotalInCents,
    });
    // Immediately clear cart (updates localStorage as required)
    clearCart();
    closeCart();
    setReceiptOpen(true);
  };

  return (
    <>
      {/* WAI-ARIA Accessible Cart Drawer Overlay */}
      <aside
        className={`cart-overlay fixed inset-0 w-screen h-screen bg-black/75 z-[100] justify-end ${
          isOpen ? "flex" : "hidden"
        }`}
        id="cart-drawer-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
        aria-hidden={!isOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeCart();
        }}
      >
        <div
          ref={drawerRef}
          className="cart-drawer w-full sm:w-[440px] h-full bg-panel border-l-2 border-brass-border flex flex-col shadow-[-6px_0_24px_rgba(0,0,0,0.8)] relative"
        >
          {/* Header */}
          <div className="cart-header p-5 sm:px-6 sm:py-5 border-b border-wood flex justify-between items-center">
            <h2
              className="cart-title font-display text-lg sm:text-xl font-bold text-brass-light"
              id="cart-heading"
            >
              ADVENTURER&apos;S PACK (<span id="drawer-item-count">{totalCount}</span>)
            </h2>
            <button
              ref={closeBtnRef}
              onClick={closeCart}
              id="close-cart-btn"
              aria-label="Close cart"
              className="close-cart-btn text-parchment-muted hover:text-parchment text-2xl cursor-pointer p-1 transition-colors leading-none"
            >
              &times;
            </button>
          </div>

          {/* Cart Items List */}
          <div
            className="cart-items-list flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4"
            id="cart-items-container"
          >
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-parchment-faint font-mono text-sm">
                  Your pack is currently empty.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="cart-item-row flex gap-3 bg-card border border-wood p-3 rounded-[3px]"
                >
                  <div className="cart-item-thumb w-12 h-12 bg-tavern border border-wood flex items-center justify-center rounded-[2px] shrink-0 p-1">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  <div className="cart-item-details flex-1 min-w-0">
                    <div className="item-title text-xs sm:text-sm font-bold text-parchment truncate">
                      {item.productTitle}
                    </div>
                    <div className="item-variant font-mono text-[11px] text-brass-light mt-0.5">
                      Variant: {item.variantTitle}
                    </div>

                    <div className="item-pricing flex justify-between items-center mt-2 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              item.quantity - 1
                            )
                          }
                          aria-label={`Decrease quantity of ${item.productTitle}`}
                          className="w-6 h-6 bg-tavern hover:bg-hover border border-wood text-parchment rounded-[2px] flex items-center justify-center cursor-pointer transition-colors"
                        >
                          -
                        </button>
                        <span className="text-parchment min-w-[16px] text-center font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              item.quantity + 1
                            )
                          }
                          aria-label={`Increase quantity of ${item.productTitle}`}
                          className="w-6 h-6 bg-tavern hover:bg-hover border border-wood text-parchment rounded-[2px] flex items-center justify-center cursor-pointer transition-colors"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.variantId)}
                          aria-label={`Remove ${item.productTitle} from pack`}
                          className="text-parchment-faint hover:text-red-400 text-[10px] underline ml-2 cursor-pointer"
                        >
                          remove
                        </button>
                      </div>
                      <span className="text-brass-light font-bold">
                        {formatCents(item.unitPriceInCents * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="cart-footer border-t border-wood p-5 sm:p-6 bg-card">
            <div className="subtotal-row flex justify-between items-center font-mono text-sm mb-2">
              <span className="text-parchment-muted text-xs sm:text-sm">
                SUBTOTAL (INTEGER CENTS):
              </span>
              <span
                className="subtotal-val text-base sm:text-lg font-bold text-brass-light"
                id="drawer-subtotal-val"
              >
                {formatCents(subtotalInCents)}
              </span>
            </div>
            <p className="font-mono text-[10px] text-parchment-faint mb-3 text-center">
              Exact integer-cents calculation:{" "}
              <span id="drawer-cents-exact" className="text-brass-light">
                {subtotalInCents.toLocaleString()} cents
              </span>
              .
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={items.length === 0}
              id="checkout-trigger-btn"
              className="checkout-now-btn w-full bg-brass hover:bg-brass-light disabled:opacity-50 disabled:cursor-not-allowed text-tavern border border-black p-3 font-mono text-xs sm:text-sm font-bold cursor-pointer rounded-[2px] shadow-[2px_2px_0px_#000] active:translate-x-px active:translate-y-px transition-all"
            >
              PROCEED TO SIMULATED CHECKOUT
            </button>
          </div>
        </div>
      </aside>

      {/* Checkout Completion Demo Receipt Modal */}
      <ReceiptModal
        isOpen={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        receiptItems={receiptSnapshot.items}
        receiptTotalInCents={receiptSnapshot.totalInCents}
      />
    </>
  );
}
