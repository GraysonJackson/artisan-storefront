"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  <div
    className="fixed inset-0 bg-black/30 z-40"
    onClick={closeCart}
  />
</motion.div>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
                <h2 className="font-serif text-xl">Your Cart</h2>
                <button onClick={closeCart} aria-label="Close cart">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <p className="text-stone-500 text-sm">Your cart is empty.</p>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => {
                      const variant = item.product.variants.find(
                        (v) => v.id === item.variantId
                      );
                      return (
                        <li
                          key={`${item.product.id}-${item.variantId}`}
                          className="flex gap-4 border-b border-stone-100 pb-4"
                        >
                          <div className="w-16 h-16 bg-stone-100 border border-stone-200 flex-shrink-0">
                            <div
                              className="w-full h-full"
                              style={{ backgroundColor: variant?.colorHex || "#ccc" }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-serif text-sm">{item.product.name}</p>
                            <p className="text-xs text-stone-500">{variant?.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.variantId, item.quantity - 1)
                                }
                                className="text-stone-400 hover:text-stone-700"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-xs">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.variantId, item.quantity + 1)
                                }
                                className="text-stone-400 hover:text-stone-700"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-stone-200 px-6 py-4">
                  <div className="flex justify-between mb-4">
                    <span className="text-sm text-stone-600">Total</span>
                    <span className="font-serif">${totalPrice().toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-[#5a3e2b] text-white py-3 text-sm uppercase tracking-widest hover:bg-[#4a3222] transition-colors">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}