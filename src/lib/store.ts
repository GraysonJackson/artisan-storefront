import { create } from 'zustand';
import type { CartItem, Product } from './types';
import { getProducts } from './products';
import { normalizeCartItems, subtotal } from './cart-model';
export const STORAGE_KEY='sidequest-supply.cart.v1';
export const DEFAULT_ITEMS: CartItem[]=[];
function save(items:CartItem[]){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,items:items.map(({productId,variantId,quantity})=>({productId,variantId,quantity}))}));}catch{/* Cart remains usable in memory when storage is unavailable. */}}
interface CartState {items:CartItem[];subtotalInCents:number;isOpen:boolean;isHydrated:boolean;initFromStorage:()=>void;addItem:(p:Product,v:string)=>void;removeItem:(p:string,v:string)=>void;updateQuantity:(p:string,v:string,n:number)=>void;clearCart:()=>void;toggleCart:()=>void;openCart:()=>void;closeCart:()=>void;totalItems:()=>number;}
export const useCartStore=create<CartState>((set,get)=>{
  function update(input:unknown){const items=normalizeCartItems(getProducts(),input);save(items);set({items,subtotalInCents:subtotal(items)});}
  return {items:[],subtotalInCents:0,isOpen:false,isHydrated:false,
    initFromStorage:()=>{if(get().isHydrated)return;let items:CartItem[]=[];try{const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');items=normalizeCartItems(getProducts(),raw?.items);}catch{}set({items,subtotalInCents:subtotal(items),isHydrated:true});},
    addItem:(product,variantId)=>{const variant=product.variants.find(v=>v.id===variantId);if(!variant?.available)return;const items=get().items;const match=items.find(i=>i.productId===product.id&&i.variantId===variantId);update(match?items.map(i=>i===match?{...i,quantity:Math.min(99,i.quantity+1)}:i):[...items,{productId:product.id,variantId,quantity:1}]);set({isOpen:true});},
    removeItem:(p,v)=>update(get().items.filter(i=>!(i.productId===p&&i.variantId===v))),
    updateQuantity:(p,v,n)=>{if(!Number.isInteger(n)||n<0||n>99)return;if(n===0){get().removeItem(p,v);return;}update(get().items.map(i=>i.productId===p&&i.variantId===v?{...i,quantity:n}:i));},
    clearCart:()=>update([]),toggleCart:()=>set({isOpen:!get().isOpen}),openCart:()=>set({isOpen:true}),closeCart:()=>set({isOpen:false}),totalItems:()=>get().items.reduce((n,i)=>n+i.quantity,0)};
});
