import type { CartItem, Product } from './types';
export function normalizeCartItems(catalog: Product[], input: unknown): CartItem[] {
  if (!Array.isArray(input)) return [];
  const result: CartItem[] = [];
  for (const raw of input.slice(0, 100)) {
    if (!raw || typeof raw !== 'object') continue;
    const product = catalog.find(p => p.id === raw.productId);
    const variant = product?.variants.find(v => v.id === raw.variantId);
    if (!product || !variant || !variant.available || !Number.isInteger(raw.quantity) || raw.quantity < 1 || raw.quantity > 99) continue;
    const existing = result.find(i => i.productId === product.id && i.variantId === variant.id);
    if (existing) { existing.quantity = Math.min(99, existing.quantity + raw.quantity); continue; }
    result.push({productId:product.id,variantId:variant.id,quantity:raw.quantity,productTitle:product.name,variantTitle:variant.name,unitPriceInCents:variant.priceInCents,imageUrl:variant.image});
  }
  return result;
}
export function subtotal(items: CartItem[]): number { return items.reduce((sum,item)=>sum+item.quantity*item.unitPriceInCents,0); }
