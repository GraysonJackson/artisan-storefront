export interface ProductVariant {
  id: string;
  name: string;
  priceInCents: number;
  colorHex: string;
  available: boolean;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryLabel?: string;
  variants: ProductVariant[];
  defaultVariantId: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  productTitle: string;
  variantTitle: string;
  unitPriceInCents: number;
  quantity: number;
  imageUrl: string;
}

export interface CartStorage {
  items: CartItem[];
  subtotalInCents: number;
}
