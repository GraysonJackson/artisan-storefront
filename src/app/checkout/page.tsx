"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate Stripe checkout
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Checkout</h1>
        <p className="text-stone-500 mb-6">Your cart is empty.</p>
        <a href="/" className="text-sm uppercase tracking-widest underline">
          Continue Shopping
        </a>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Order Confirmed</h1>
        <p className="text-stone-500 mb-6">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        <a href="/" className="text-sm uppercase tracking-widest underline">
          Back to Shop
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl mb-8">Checkout</h1>

      <div className="mb-8 border border-stone-200 p-4">
        <h2 className="text-sm uppercase tracking-widest mb-4">Order Summary</h2>
        {items.map((item) => {
          const variant = item.product.variants.find(
            (v) => v.id === item.variantId
          );
          return (
            <div key={item.variantId} className="flex justify-between py-2 border-b border-stone-100 last:border-0">
              <span>
                {item.product.name}
                {variant && <span className="text-stone-400 ml-1">/ {variant.name}</span>}
                <span className="text-stone-400 ml-1">× {item.quantity}</span>
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          );
        })}
        <div className="flex justify-between pt-4 mt-2 border-t border-stone-200 font-medium">
          <span>Total</span>
          <span>${totalPrice().toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm uppercase tracking-widest mb-2">Email</label>
          <input
            type="email"
            required
            className="w-full border border-stone-300 px-4 py-3 bg-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm uppercase tracking-widest mb-2">Card Number</label>
          <input
            type="text"
            required
            maxLength={19}
            className="w-full border border-stone-300 px-4 py-3 bg-white"
            placeholder="4242 4242 4242 4242"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm uppercase tracking-widest mb-2">Expiry</label>
            <input
              type="text"
              required
              maxLength={5}
              className="w-full border border-stone-300 px-4 py-3 bg-white"
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label className="block text-sm uppercase tracking-widest mb-2">CVC</label>
            <input
              type="text"
              required
              maxLength={4}
              className="w-full border border-stone-300 px-4 py-3 bg-white"
              placeholder="123"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-stone-900 text-white py-3 px-6 hover:bg-stone-800 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : `Pay $${totalPrice().toFixed(2)}`}
        </button>
        <p className="text-xs text-stone-400 text-center">
          Test mode — no real charges will be made.
        </p>
      </form>
    </div>
  );
}