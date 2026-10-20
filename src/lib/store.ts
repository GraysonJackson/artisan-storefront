import { create } from "zustand";
import { CartItem, CartStorage, Product } from "./types";

export const STORAGE_KEY = "sidequest-supply.cart.v1";

export const DEFAULT_ITEMS: CartItem[] = [
  {
    productId: "dice-vault",
    variantId: "walnut",
    productTitle: "Hardwood Dice Vault",
    variantTitle: "Black Walnut",
    unitPriceInCents: 6400,
    quantity: 1,
    imageUrl: "/artisan-storefront/images/dice-vault-walnut.svg",
  },
  {
    productId: "battle-mat",
    variantId: "cognac",
    productTitle: "Full-Grain Leather Mat",
    variantTitle: "Cognac Tan",
    unitPriceInCents: 8500,
    quantity: 1,
    imageUrl: "/artisan-storefront/images/battle-mat-cognac.svg",
  },
];

function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPriceInCents * item.quantity, 0);
}

function persistStorage(items: CartItem[]): number {
  const subtotalInCents = calcSubtotal(items);
  if (typeof window !== "undefined") {
    try {
      const payload: CartStorage = {
        items,
        subtotalInCents,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to write cart to localStorage:", err);
    }
  }
  return subtotalInCents;
}

function readStorage(): { items: CartItem[]; subtotalInCents: number } {
  if (typeof window === "undefined") {
    return { items: DEFAULT_ITEMS, subtotalInCents: calcSubtotal(DEFAULT_ITEMS) };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw) as Partial<CartStorage>;
      if (Array.isArray(parsed.items)) {
        return {
          items: parsed.items,
          subtotalInCents: calcSubtotal(parsed.items),
        };
      }
    }
  } catch (err) {
    console.error("Failed to parse cart from localStorage:", err);
  }
  persistStorage(DEFAULT_ITEMS);
  return { items: DEFAULT_ITEMS, subtotalInCents: calcSubtotal(DEFAULT_ITEMS) };
}

interface CartState {
  items: CartItem[];
  subtotalInCents: number;
  isOpen: boolean;
  isHydrated: boolean;
  addItem: (product: Product, variantId: string) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  initFromStorage: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: DEFAULT_ITEMS,
  subtotalInCents: calcSubtotal(DEFAULT_ITEMS),
  isOpen: false,
  isHydrated: false,

  initFromStorage: () => {
    if (get().isHydrated) return;
    const { items, subtotalInCents } = readStorage();
    set({ items, subtotalInCents, isHydrated: true });
  },

  addItem: (product, variantId) => {
    const variant = product.variants.find((v) => v.id === variantId) || product.variants[0];
    const currentItems = get().items;
    const existingIndex = currentItems.findIndex(
      (item) => item.productId === product.id && item.variantId === variant.id
    );

    let nextItems: CartItem[];
    if (existingIndex >= 0) {
      nextItems = currentItems.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      nextItems = [
        ...currentItems,
        {
          productId: product.id,
          variantId: variant.id,
          productTitle: product.name,
          variantTitle: variant.name,
          unitPriceInCents: variant.priceInCents,
          quantity: 1,
          imageUrl: variant.image,
        },
      ];
    }

    const subtotalInCents = persistStorage(nextItems);
    set({ items: nextItems, subtotalInCents, isOpen: true });
  },

  removeItem: (productId, variantId) => {
    const nextItems = get().items.filter(
      (item) => !(item.productId === productId && item.variantId === variantId)
    );
    const subtotalInCents = persistStorage(nextItems);
    set({ items: nextItems, subtotalInCents });
  },

  updateQuantity: (productId, variantId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, variantId);
      return;
    }
    const nextItems = get().items.map((item) =>
      item.productId === productId && item.variantId === variantId
        ? { ...item, quantity }
        : item
    );
    const subtotalInCents = persistStorage(nextItems);
    set({ items: nextItems, subtotalInCents });
  },

  clearCart: () => {
    persistStorage([]);
    set({ items: [], subtotalInCents: 0 });
  },

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
