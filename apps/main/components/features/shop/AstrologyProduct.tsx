import React from "react";
import NextImage from "next/image";
import Link from "next/link";
import { getProducts } from "../../../libs/api-products";
import ProductSection from "./ProductSection";

const Image = NextImage as any;
const LinkComponent = Link as any;

const AstrologyProduct = async () => {
  const products = await getProducts();

  // Fallback if no products
  const productList = products || [];

  return (
    <section className="!bg-[#edeef1] py-10 md:py-16">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="bg-white p-5 md:p-6 rounded-[3px] shadow-[0_4px_9px_0_rgba(0,0,0,0.08)]">
          <ProductSection products={productList} />
          {/* <!-- View All Button --> */}
          <div className="mt-8 mb-3 flex justify-center">
            <LinkComponent href="/product" className="bg-orange hover:opacity-90 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 w-fit no-underline">
              View All Products
            </LinkComponent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AstrologyProduct;


