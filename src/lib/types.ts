export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  variants: ProductVariant[];
  defaultVariantId: string;
}

export interface CartItem {
  product: Product;
  variantId: string;
  quantity: number;
}