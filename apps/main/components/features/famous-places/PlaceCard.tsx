import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchPlaceImages } from "@/libs/serp-api";
import { Place } from "@/lib/types";
import { useLanguageStore } from "../../../store/languageStore";
import { famousPlacesTranslations } from "../../../lib/famous-places-translations";

interface PlaceCardProps {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const { lang } = useLanguageStore();
  const t = famousPlacesTranslations[lang as keyof typeof famousPlacesTranslations] || famousPlacesTranslations.en;

  const [realImage, setRealImage] = useState<string | null>(null);

  const NO_IMAGE_URL = "/images/image-not-found.png";

  useEffect(() => {
    const loadImage = async () => {
      if (!place?.title) return;
      // Prioritize thumbnails, but fetch real exterior photo if possible
      try {
        const images = await fetchPlaceImages(place.title);
        if (images && images.length > 0) {
          setRealImage(images[0] || null);
        }
      } catch (err) {
        console.error("Failed to load real image", err);
      }
    };
    loadImage();
  }, [place.title]);

  const displayImage: string = realImage || place.thumbnailUrl || NO_IMAGE_URL;

  return (
    <Link
      href={`/famous-places/${place.slug}`}
      className="group no-underline text-inherit"
    >
      <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange/20 transition-all duration-500 flex flex-col h-full shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(255,107,0,0.12)] hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          <Image
            src={displayImage}
            alt={place.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/60 via-transparent to-transparent opacity-60"></div>

          {/* Category Tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-brown text-[10px] font-bold uppercase tracking-wider shadow-sm">
              {place.category || t.card.sacredSite}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center text-orange">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(place.rating || 4)
                      ? "fill-current"
                      : "text-gray-200 fill-current"
                      }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[11px] font-bold text-gray-400">
                {place.ratingCount || "100+"} {t.card.reviews}
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-brown leading-tight mb-3 group-hover:text-orange transition-colors line-clamp-2">
              {place.title}
            </h3>

            <div className="flex items-start gap-2 text-gray-500">
              <i className="fa-solid fa-location-dot mt-1 text-orange/60 text-xs"></i>
              <p className="text-sm leading-relaxed line-clamp-2 italic">
                {place.address || t.card.noAddress}
              </p>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[11px] font-bold text-orange uppercase tracking-widest">
              {t.card.viewDetails}
            </span>
            <div className="w-8 h-8 rounded-full bg-orange/5 flex items-center justify-center group-hover:bg-orange group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;


