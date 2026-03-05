"use client";

import React from "react";
import { Button } from "@repo/ui";
import NextImage from "next/image";
import { useAuthStore } from "@/store/useAuthStore"; // Changed import
import { useCartStore } from "@/store/useCartStore"; // Changed import
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useLanguageStore } from "../../../store/languageStore";
import { homeTranslations } from "../../../lib/translations/home";

import { getProductImageUrl } from "@/utils/image-utils";
import { Product } from "@/lib/types";

const Image = NextImage as any;

interface ProductCardProps {
    product: Product;
    className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
    const { lang } = useLanguageStore();
    const t = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;
    const imageUrl = getProductImageUrl(product);

    const originalPrice = Number(product.originalPrice) || 0;
    const price = Number(product.price) || 0;
    const percentageOff = Number(product.percentageOff) || 0;

    // Hooks
    const { isInWishlist } = useWishlistStore();
    const { isClientAuthenticated } = useAuthStore();
    const { toggleLike } = useWishlist();
    const { addToCart: addToCartOpt, isAdding } = useCart();
    const [isBuyLoading, setIsBuyLoading] = React.useState(false);
    const router = useRouter();

    const productId = Number(product.id || product._id);
    const isLiked = productId ? isInWishlist(productId) : false;

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isClientAuthenticated) {
            toast.error("Please login first to use wishlist", {
                onClick: () => router.push("/sign-in"),
                autoClose: 3000,
                style: { cursor: 'pointer' }
            });
            return;
        }

        toggleLike({ id: productId, type: "product", isLiked });
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isClientAuthenticated) {
            toast.error("Please login first to buy products", {
                onClick: () => router.push("/sign-in"),
                autoClose: 3000,
                style: { cursor: 'pointer' }
            });
            return;
        }

        addToCartOpt({ productId: Number(product.id || product._id), quantity: 1 });
    };

    return (
        <div className={`group relative bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 ${className || ""}`}>
            {/* 🔥 Top Header: Offer Tag (Left) & Heart Icon (Right) */}
            {percentageOff > 0 && (
                <div className="absolute top-3 left-3 z-10">
                    <div className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 animate-pulse">
                        <i className="fa-solid fa-tag text-[10px]"></i>
                        {percentageOff}% {t.products.off}
                    </div>
                </div>
            )}

            <button
                onClick={handleLike}
                className={`absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full transition-colors shadow-sm w-9 h-9 flex items-center justify-center ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            >
                <i className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart text-lg`}></i>
            </button>

            {/* 🖼️ Image Area with Glow */}
            <div className="relative w-full aspect-square bg-[#f9f9f9] flex items-center justify-center overflow-hidden shrink-0">
                <div className="absolute w-32 h-32 bg-orange/10 rounded-full blur-3xl opacity-60"></div>
                <div className="relative w-full h-full">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500 mix-blend-normal"
                    />
                </div>
            </div>

            {/* 📄 Content Area */}
            <div className="p-3 flex flex-col gap-2 flex-grow">
                <div>
                    <div className="flex justify-between items-start mb-0.5">
                        <h3 className="text-lg font-bold text-[#111827] line-clamp-1" title={product.name}>
                            {product.name}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-400 text-xs font-medium bg-yellow-50 px-1.5 py-0.5 rounded">
                            <i className="fa-solid fa-star text-[10px]"></i>
                            <span className="text-gray-600">4.8</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                {/* 💰 Price Section */}
                <div className="flex items-end gap-2 mt-auto pt-2">
                    <span className="text-2xl font-bold text-orange">
                        ₹{price}
                    </span>
                    {originalPrice > price && (
                        <span className="text-base text-gray-400 line-through mb-1 ml-3">
                            ₹{originalPrice}
                        </span>
                    )}
                </div>

                {/* 🔘 Action Buttons */}
                <div className="flex gap-2 mt-2">
                    <Button
                        variant="outline"
                        size="md"
                        onClick={handleAddToCart}
                        className="flex-1 !rounded-full border-orange text-orange hover:bg-orange/5 h-10 text-[13px] px-3 font-semibold"
                    >
                        {t.products.addToCart}
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsBuyLoading(true);
                            const id = product.id || product._id;
                            // Store in sessionStorage for a clean URL
                            sessionStorage.setItem('buyNowItem', JSON.stringify({ productId: id, quantity: 1 }));
                            router.push(`/checkout?type=order`);
                        }}
                        loading={isBuyLoading}
                        className="flex-1 rounded-full h-10 text-[13px] px-3 font-semibold !bg-orange hover:!opacity-90"
                    >
                        {t.products.buyNow}
                    </Button>
                </div>
            </div>
        </div>
    );
};


