import React from 'react';
import Image from 'next/image';

// We mock trending articles data
const TRENDING_ARTICLES = [
  { title: 'What is Your Moon Sign and Why It Matters?', image: '/horoscope_img/ARIES_04bdeca59e.svg' },
  { title: 'How Planetary Transits Affect Your Life?', image: '/horoscope_img/TAURUS_198b4c97e9.svg' },
  { title: 'Top 5 Remedies for a Better Life', image: '/horoscope_img/GEMINI_9d35540bb9.svg' }
];

export default function ZodiacDetailsSidebar({ signData }: { signData: any }) {
  return (
    <div className="space-y-6">
      
      {/* Zodiac Details Card */}
      <div 
        className="rounded-3xl p-6 md:p-8 border border-[#F0E6DD] shadow-sm relative overflow-hidden bg-white"
        style={{
          backgroundImage: "url('/images/back-image.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <h3 className="text-xl font-bold text-[#3D1A0B] mb-6 flex items-center gap-3">
          <i className="fa-solid fa-star-of-life text-[#F26500]"></i> 
          Zodiac Details
        </h3>
        
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#E8D5C0] flex items-center justify-center shrink-0">
              <i className="fa-solid fa-globe text-[#F26500]"></i>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-0.5">Ruling Planet</p>
              <p className="text-sm font-bold text-[#3D1A0B]">Mars</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#E8D5C0] flex items-center justify-center shrink-0">
              <i className="fa-solid fa-fire text-[#F26500]"></i>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-0.5">Element</p>
              <p className="text-sm font-bold text-[#3D1A0B]">Fire</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#E8D5C0] flex items-center justify-center shrink-0">
              <i className="fa-solid fa-circle-notch text-[#F26500]"></i>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-0.5">Quality</p>
              <p className="text-sm font-bold text-[#3D1A0B]">Cardinal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#E8D5C0] flex items-center justify-center shrink-0">
              <Image src={signData.image} alt={signData.title} width={20} height={20} className="object-contain" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-0.5">Symbol</p>
              <p className="text-sm font-bold text-[#3D1A0B]">The Ram</p>
            </div>
          </div>
        </div>
      </div>

      {/* Traits Card */}
      <div 
        className="rounded-3xl p-6 md:p-8 border border-[#F0E6DD] shadow-sm relative overflow-hidden bg-white"
        style={{
          backgroundImage: "url('/images/back-image.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <h3 className="text-xl font-bold text-[#3D1A0B] mb-6">
          {signData.title} Traits
        </h3>
        
        {/* Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Confident', 'Energetic', 'Courageous', 'Enthusiastic', 'Leader', 'Independent'].map(trait => (
            <span key={trait} className="bg-white border border-[#E8D5C0] text-slate-600 px-3 py-1.5 rounded-full text-xs font-semibold">
              {trait}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-sm font-bold text-[#3D1A0B] mb-1">Strengths</p>
          <p className="text-sm text-slate-600">Brave, Determined, Honest, Passionate</p>
        </div>

        <div>
          <p className="text-sm font-bold text-[#3D1A0B] mb-1">Weaknesses</p>
          <p className="text-sm text-slate-600">Impatient, Impulsive, Short-tempered</p>
        </div>
      </div>

      {/* Trending Articles Card */}
      <div 
        className="rounded-3xl p-6 md:p-8 border border-[#F0E6DD] shadow-sm relative overflow-hidden bg-white"
        style={{
          backgroundImage: "url('/images/back-image.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <h3 className="text-xl font-bold text-[#3D1A0B] mb-6 flex items-center gap-3">
          <i className="fa-solid fa-fire text-[#F26500]"></i> 
          Trending Articles
        </h3>
        
        <div className="space-y-4">
          {TRENDING_ARTICLES.map((article, idx) => (
            <div key={idx} className="flex gap-4 items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0">
                <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-sm font-bold text-[#3D1A0B] group-hover:text-[#F26500] transition-colors leading-snug">
                {article.title}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
