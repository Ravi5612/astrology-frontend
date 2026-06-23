"use client";
import React from "react";
import { ZodiacSignsData } from "@/components/features/services/homePagaData";
import NextLink from "next/link";
import { useLanguageStore } from "@repo/store";
import { homeTranslations } from "../../../lib/translations/home";
import { 
  TbZodiacAries, TbZodiacTaurus, TbZodiacGemini, TbZodiacCancer, 
  TbZodiacLeo, TbZodiacVirgo, TbZodiacLibra, TbZodiacScorpio, 
  TbZodiacSagittarius, TbZodiacCapricorn, TbZodiacAquarius, TbZodiacPisces 
} from "react-icons/tb";

const Link = NextLink as any;

interface ChooseYourZodiacProps {
  selectedSignId?: number;
  onSelectSign?: (sign: any) => void;
  isDark?: boolean;
}

const ZodiacIcon = ({ title, className }: { title: string, className?: string }) => {
  switch (title.toLowerCase()) {
    case 'aries': return <TbZodiacAries className={className} strokeWidth={1.5} />;
    case 'taurus': return <TbZodiacTaurus className={className} strokeWidth={1.5} />;
    case 'gemini': return <TbZodiacGemini className={className} strokeWidth={1.5} />;
    case 'cancer': return <TbZodiacCancer className={className} strokeWidth={1.5} />;
    case 'leo': return <TbZodiacLeo className={className} strokeWidth={1.5} />;
    case 'virgo': return <TbZodiacVirgo className={className} strokeWidth={1.5} />;
    case 'libra': return <TbZodiacLibra className={className} strokeWidth={1.5} />;
    case 'scorpio': return <TbZodiacScorpio className={className} strokeWidth={1.5} />;
    case 'sagittarius': return <TbZodiacSagittarius className={className} strokeWidth={1.5} />;
    case 'capricorn': return <TbZodiacCapricorn className={className} strokeWidth={1.5} />;
    case 'aquarius': return <TbZodiacAquarius className={className} strokeWidth={1.5} />;
    case 'pisces': return <TbZodiacPisces className={className} strokeWidth={1.5} />;
    default: return <TbZodiacAries className={className} strokeWidth={1.5} />;
  }
};

const ChooseYourZodiac: React.FC<ChooseYourZodiacProps> = ({ selectedSignId, onSelectSign, isDark = false }) => {
  const { lang } = useLanguageStore();
  const tHome = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;

  return (
    <section 
      className={`pt-6 md:pt-10 pb-10 md:pb-16 relative ${isDark ? "bg-fixed bg-cover bg-center text-white" : "bg-[#FAF8F5] text-[#2D1B15]"}`}
      style={isDark ? { backgroundImage: "url('/images/cosmic/media__1782217293850.jpg')" } : {}}
    >
      {isDark && (
        <div className="absolute inset-0 bg-[#3B1C0A]/85 backdrop-blur-[2px] z-0"></div>
      )}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="text-[#FF6B00]">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V2M12 22V20M4 12H2M22 12H20M17.6569 6.34315L19.0711 4.92893M6.34315 17.6569L4.92893 19.0711M17.6569 17.6569L19.0711 19.0711M6.34315 6.34315L4.92893 4.92893" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="4" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2"/>
               </svg>
            </div>
            <h2 className={`text-[20px] md:text-3xl font-black ${isDark ? "text-white" : "text-[#2D1B15]"}`}>
              Choose Your Zodiac Sign
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-5">
          {ZodiacSignsData.map((sign) => {
            const isSelected = selectedSignId === sign.id;
            
            const cardContent = (
              <div
                className={`flex flex-col items-center justify-center pt-6 pb-5 px-2 rounded-xl transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#FF6B00] border border-[#FF6B00] shadow-lg scale-[1.02]"
                    : "border border-orange-200/50 bg-white hover:bg-slate-50 hover:border-orange-300/50 hover:-translate-y-1 hover:shadow-md"
                }`}
              >
                <div className={`w-16 h-16 mb-4 relative flex items-center justify-center rounded-full border transition-colors ${isSelected ? "border-white" : "border-[#FF6B00]"}`}>
                  <div className={`absolute top-1 right-2 w-1 h-1 rounded-full z-10 ${isSelected ? "bg-white" : "bg-[#FF6B00]"}`}></div>
                  <div className={`absolute bottom-1 left-2 w-1 h-1 rounded-full z-10 ${isSelected ? "bg-white" : "bg-[#FF6B00]"}`}></div>
                  <div className={`absolute top-4 left-0 w-[2px] h-[2px] rounded-full z-10 ${isSelected ? "bg-white" : "bg-[#FF6B00]"}`}></div>
                  
                  <ZodiacIcon title={sign.title} className={`w-10 h-10 transition-colors ${isSelected ? "text-white" : "text-[#FF6B00]"}`} />
                </div>
                <div className="text-center space-y-0.5">
                  <h3 className={`text-[14px] font-bold transition-colors ${isSelected ? "text-white" : "text-[#2D1B15]"}`}>
                    {sign.title}
                  </h3>
                  <p className={`text-[12px] transition-colors ${isSelected ? "text-white/90" : "text-slate-500"}`}>
                    ({sign.title})
                  </p>
                </div>
                <p className={`text-[10px] font-medium mt-2 text-center transition-colors ${isSelected ? "text-white/80" : "text-slate-400"}`}>
                  {sign.date}
                </p>
              </div>
            );

            if (onSelectSign) {
              return (
                <div key={sign.id} onClick={() => onSelectSign(sign)}>
                  {cardContent}
                </div>
              );
            }

            return (
              <Link
                href={`/horoscope/${sign.title.toLowerCase()}`}
                key={sign.id}
                className="block no-underline"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChooseYourZodiac;
