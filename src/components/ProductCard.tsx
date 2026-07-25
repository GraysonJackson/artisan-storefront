"use client";

import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const defaultVariant = product.variants.find(
    (v) => v.id === product.defaultVariantId
  ) || product.variants[0];
  const imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${defaultVariant.image}`;

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="border border-stone-300 overflow-hidden">
        <div className="bg-stone-100">
          <Image
            src={imageSrc}
            alt={`${product.name} in ${defaultVariant.name}`}
            width={400}
            height={400}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-serif text-lg">{product.name}</h3>
        <p className="text-stone-500 text-sm mt-1">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}