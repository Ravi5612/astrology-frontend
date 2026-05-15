"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLanguageStore } from "@repo/store";
import { homeTranslations } from "../../../lib/translations/home";

const Featured4Cards = () => {
  const { lang } = useLanguageStore();
  const t = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;

  const cards = [
    {
      href: "/our-experts",
      icon: "/images/icon1.png",
      alt: "Live Chat",
      title: t.featuredCards.liveChat.title,
      desc: t.featuredCards.liveChat.desc,
    },
    {
      href: "/our-experts",
      icon: "/images/icon2.png",
      alt: "Speak",
      title: t.featuredCards.speak.title,
      desc: t.featuredCards.speak.desc,
    },
    {
      href: "/buy-products",
      icon: "/images/icon3.png",
      alt: "Store",
      title: t.featuredCards.store.title,
      desc: t.featuredCards.store.desc,
    },
    {
      href: "/online-puja",
      icon: "/images/icon4.png",
      alt: "Pooja",
      title: t.featuredCards.pooja.title,
      desc: t.featuredCards.pooja.desc,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 mt-2">
      {
        cards.map((card) => (
          <Link key={card.href + card.title} href={card.href} className="no-underline">
            {/* card-hero → bg-[#301118], rounded-[20px], min-h-[250px], border, padding, hover, transition */}
            <div
              className="
              m-[13px] text-center min-h-[250px] rounded-[20px] p-[14px]
              bg-[#301118] border border-[#fd9d69]
              flex flex-col items-center justify-center
              transition-all duration-200 ease-in-out
              hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]
              cursor-pointer
            "
            >
              {/* card-hero img → width 77px, margin 11px 0 */}
              <Image
                src={card.icon}
                alt={card.alt}
                width={77}
                height={77}
                className="my-[11px]"
              />
              {/* card-hero h5 → color #fff, 20px, fw-600 */}
              <h5 className="text-white text-[20px] font-semibold mt-2">
                {card.title}
              </h5>
              {/* color-light → text-white, card-hero p → 16px */}
              <p className="text-white text-[16px] mb-0">
                {card.desc}
              </p>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default Featured4Cards;
