import Image from "next/image";
import Link from "next/link";
import React from "react";

const cards = [
  {
    href: "/our-astrologers",
    icon: "/images/icon1.png",
    alt: "Live Chat",
    title: "Live Chat Support",
    desc: "Get instant answers from expert astrologers through live chat sessions.",
  },
  {
    href: "/our-astrologers",
    icon: "/images/icon2.png",
    alt: "Speak",
    title: "Speak with Astrologer",
    desc: "Connect via phone call for personal guidance on your life questions.",
  },
  {
    href: "/buy-products",
    icon: "/images/icon3.png",
    alt: "Store",
    title: "Astrology Product Store",
    desc: "Shop gemstones, yantras, and spiritual items recommended by experts.",
  },
  {
    href: "/online-puja",
    icon: "/images/icon4.png",
    alt: "Pooja",
    title: "Book A Pooja",
    desc: "Book religious ceremonies & rituals performed by experienced priests.",
  },
];

const Featured4Cards = () => {
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
