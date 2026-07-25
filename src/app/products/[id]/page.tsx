import { getProducts } from "@/lib/products";
import ProductPageClient from "./ProductPageClient";

export function generateStaticParams() {
  return getProducts().map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductPageClient productId={params.id} />;
}