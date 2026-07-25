import { getProducts } from "@/lib/products";
import ProductDetail from "./ProductDetail";

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProducts().find((p) => p.id === params.id);
  if (!product) return null;

  return <ProductDetail product={product} />;
}
