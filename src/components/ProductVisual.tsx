import type { ProductVariant } from '@/lib/types';
export default function ProductVisual({variant,alt}:{productId:string;variant:ProductVariant;alt:string}){return <img src={variant.image} alt={alt} width={900} height={675} className="w-full h-full object-cover" loading="lazy"/>;}
