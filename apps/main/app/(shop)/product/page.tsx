import React from "react";
import ProductGrid from "@/components/features/shop/ProductGrid";
import { getBasePath } from "@/utils/api-config";
import safeFetch from "@packages/safe-fetch/safeFetch";

import { Product } from "@/lib/types";

async function getProducts(): Promise<Product[]> {
  // Use getBasePath() to avoid double /api/v1 (NEXT_PUBLIC_API_URL already contains it)
  const baseUrl = getBasePath();
  const [data, fetchError] = await safeFetch<any>(`${baseUrl}/api/v1/products`, { cache: "no-store" });
  
  if (fetchError) {
    console.error("Failed to fetch products:", fetchError);
    return [];
  }
  
  return Array.isArray(data) ? data : (data.data || []);
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


