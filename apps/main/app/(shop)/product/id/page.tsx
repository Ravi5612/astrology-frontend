"use client";

import React, { useState, useEffect } from "react";
import Gallery from "./Gallery";
import ProductInfo from "./ProductInfo";
import FloatingBar from "./FloatingBar";
import Specifications from "./Specifications";
import FAQ from "./FAQ";
import Reviews from "./Reviews";
import ShopByPurpose from "./ShopByPurpose";
import Features from "./Features";

const Page = () => {
  const [isSticky, setIsSticky] = useState(false);

  const product = {
    title: "Crystal Healing Bracelet",
    tagline: "Unleash your inner calm and prosperity",
    price: 349,
    originalPrice: 799,
    description:
      "Our Celestial Healing Bracelet is meticulously crafted with natural crystals known for their profound energy-enhancing properties. This elegant piece is more than just an accessory; it's a conduit for positive energy, promoting balance, wellness, and abundance in your life. Each crystal is hand-selected and charged through ancient Vedic rituals to ensure maximum potency. Wear it daily to align your chakras and elevate your spiritual journey.",
    images: [
      "/images/product-5.jpg",
      "/images/product-4.jpg",
      "/images/product-3.jpg",
      "/images/product-1.webp",
      "/images/product-2.webp",
    ],
    details: [
      {
        title: "Material",
        text: "Natural Amethyst, Rose Quartz, and Clear Quartz beads.",
      },
      {
        title: "Craftsmanship",
        text: "Hand-strung on a durable, stretchable cord with gold-plated accents.",
      },
      {
        title: "Care Instructions",
        text: "To preserve its energy and luster, avoid prolonged contact with water and harsh chemicals. Clean with a soft, dry cloth.",
      },
      {
        title: "Dimensions",
        text: "Adjustable size, fits most wrist sizes (16-20 cm).",
      },
    ],
    keyPoints: [
      "100% Natural & Authentic",
      "Energy charged by Vedic rituals",
      "Certified quality",
      "Free delivery across India",
    ],
    faqs: [
      {
        q: "Is it real crystal?",
        a: "Yes, all our crystals are 100% natural and certified.",
      },
      {
        q: "How long will it take to see results?",
        a: "It depends on personal energy alignment; usually weeks.",
      },
      {
        q: "Can I wear it daily?",
        a: "Yes, you can wear it every day for best effects.",
      },
    ],
    reviewStats: [
      { stars: 5, count: 64083 },
      { stars: 4, count: 20219 },
      { stars: 3, count: 5300 },
      { stars: 2, count: 2009 },
      { stars: 1, count: 4201 },
    ],
    totalRatings: 95812,
    avgRating: 4.4,
  };

  useEffect(() => {
    const handleScroll = () => {
      const topOffset = window.scrollY;
      const productInfo = document.getElementById("product-info-section");
      if (productInfo) {
        const infoBottom =
          productInfo.getBoundingClientRect().bottom + window.scrollY;
        if (topOffset > infoBottom - 100 && topOffset < infoBottom + 500) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div>
        <div className="container py-5">
          <div className="row g-5">
            <Gallery images={product.images} />
            <ProductInfo product={product} />
          </div>

          <FloatingBar
            isSticky={isSticky}
            title={product.title}
            price={product.price}
          />

          <hr className="my-5" />

          <Specifications details={product.details} />

          <hr className="my-5" />

          <FAQ faqs={product.faqs} />

          <hr className="my-5" />

          <Reviews
            avgRating={product.avgRating}
            totalRatings={product.totalRatings}
            reviewStats={product.reviewStats}
          />

          <hr className="my-5" />

          <ShopByPurpose />

          <Features />
        </div>
      </div>
    </>
  );
};

export default Page;
