import React from "react";
import { ZodiacSignsData } from "@/components/features/services/homePagaData";
import NextLink from "next/link";
import NextImage from "next/image";

const Link = NextLink as any;
const Image = NextImage as any;

const ChooseYourZodiac = () => {
  return (
    <section
      className="py-10 md:py-16 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/white-background.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="bg-white p-5 md:p-6 rounded-[3px] shadow-[0_4px_9px_0_rgba(0,0,0,0.08)]">
          <h2 className="text-[32px] font-semibold mb-[35px] relative pb-[15px] text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#a9a9a92b] after:w-full">
            <span className="relative after:content-[''] after:bg-orange after:w-full after:h-[2px] after:absolute after:left-0 after:bottom-[-15px]">
              Choose Your Zodiac Sign
            </span>
          </h2>
          <p className="text-center text-[#1a1a1a] mb-8 text-base font-medium">
            Discover Your Daily, Monthly and Yearly Horoscope
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {ZodiacSignsData.map((sign) => (
              <Link
                href={`/horoscope/${sign.title.toLowerCase()}`}
                key={sign.id}
                className="block h-full group no-underline"
              >
                <div
                  className="bg-white overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.1)] text-center p-4 rounded-[10px] transition-all duration-300 ease-in-out text-[#1a1a1a] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] h-full flex flex-col items-center justify-center cursor-pointer border border-[#daa23e40] hover:border-orange"
                >
                  <div className="relative w-24 h-24 mb-3">
                    <Image
                      src={sign.image}
                      alt={sign.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-orange transition-colors">
                    {sign.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">{sign.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourZodiac;


