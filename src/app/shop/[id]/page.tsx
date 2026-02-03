import { getProductById, getReviewsByProductId } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProductId(params.id);

  return <ProductDetailClient product={product} reviews={reviews} />;
}
