"use client";

import { 
  MapPin, 
  Phone, 
  ShieldCheck, 
  ExternalLink, 
  Store as StoreIcon,
  Star
} from "lucide-react";
import { Store } from "@/lib/types/shop";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";

import "swiper/css";

interface StoreCardProps {
  store: Store;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <Link 
      href={`/stores/${store.id}`}
      className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full font-outfit"
    >
      {/* Main Shop Header Image */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        {store.image ? (
          <img 
            src={store.image} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt={store.name} 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
            <StoreIcon className="w-12 h-12 text-orange-200" />
          </div>
        )}

        {/* Rating Badge Overlay */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center gap-1.5 border border-white/20">
            <Star className="w-3.5 h-3.5 text-orange fill-orange" />
            <span className="text-[12px] font-black text-slate-900 leading-none">{store.rating}</span>
            <span className="text-[9px] font-bold text-slate-400 leading-none">({store.reviewCount})</span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
           <h2 className="text-white font-bold text-xl drop-shadow-md truncate">{store.name}</h2>
           <div className="flex items-center text-orange-200 text-[10px] font-black uppercase tracking-widest mt-1">
              <MapPin className="w-3 h-3 mr-1 text-orange" />
              {store.city}
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        {/* Store Intro */}
        <div className="space-y-4">
           <div className="flex items-center justify-between">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">About Store</span>
             {store.isTrusted && (
                <div className="flex items-center text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                   <ShieldCheck className="w-3.5 h-3.5" />
                   <span className="text-[9px] font-black ml-1 uppercase tracking-tighter">Verified</span>
                </div>
             )}
           </div>
           
           <div className="flex items-start space-x-3 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-orange shrink-0 mt-0.5" />
              <p className="line-clamp-2 text-xs font-bold leading-relaxed">{store.address}, {store.pincode}</p>
           </div>
           
           <div className="flex items-center space-x-3 text-xs text-gray-600">
              <Phone className="w-4 h-4 text-orange shrink-0" />
              <p className="font-mono font-bold">{store.phone}</p>
           </div>
        </div>

        {/* Popular Products */}
        <div className="space-y-3">
           <div className="flex items-center justify-between">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Popular Products</span>
             <div className="w-3.5 h-3.5 bg-gray-100 rounded-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
             </div>
           </div>
           
           <div className="relative">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={8}
                slidesPerView={3}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                className="rounded-xl overflow-hidden pointer-events-none"
              >
                {store.popularProducts?.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="h-16 bg-gray-50 rounded-lg overflow-hidden relative border border-gray-100 shadow-sm">
                            <img src={img} className="w-full h-full object-cover" alt="Product" />
                        </div>
                    </SwiperSlide>
                )) || (
                    [1, 2, 3].map((i) => (
                        <SwiperSlide key={i}>
                            <div className="h-16 bg-gray-50 rounded-lg animate-pulse" />
                        </SwiperSlide>
                    ))
                )}
              </Swiper>
           </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <div className="w-full py-3.5 bg-orange-600 text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/10 active:scale-95 text-center">
            Visit Full Store <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};
