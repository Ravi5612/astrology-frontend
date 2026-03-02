import React from "react";
import ProductGrid from "@/components/features/shop/ProductGrid";
import { getBasePath } from "@/utils/api-config";

import { Product } from "@/lib/types";

async function getProducts(): Promise<Product[]> {
  // Use getBasePath() to avoid double /api/v1 (NEXT_PUBLIC_API_URL already contains it)
  const baseUrl = getBasePath();
  try {
    const res = await fetch(`${baseUrl}/api/v1/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch {
    return [];
  }
}

const ProductPage = async () => {
  const products = await getProducts();

  return (
    <>
      <ProductGrid products={products} />
    </>
  );
};

export default ProductPage;


