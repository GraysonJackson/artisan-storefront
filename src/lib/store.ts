import { create } from "zustand";
import { CartItem, Product } from "./types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variantId: string) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, variantId) => {
    set((state) => {
      const existing = state.items.find(
        (item) => item.product.id === product.id && item.variantId === variantId
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id && item.variantId === variantId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, variantId, quantity: 1 }] };
    });
    get().openCart();
  },

  removeItem: (productId, variantId) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.product.id === productId && item.variantId === variantId)
      ),
    }));
  },

  updateQuantity: (productId, variantId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, variantId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      ),
    }));
  },

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: () =>
    get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
}));