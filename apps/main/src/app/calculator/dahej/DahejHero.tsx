"use client";

import React from "react";
import { GiGoldBar, GiDiamonds, GiStarShuriken } from "react-icons/gi";
import { DahejHeroProps } from "@/lib/types";

const DahejHero: React.FC<DahejHeroProps> = ({ lang, toggleLang, t }) => {
    return (
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#301118] via-[#4a1c26] to-[#301118] text-white overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-500 opacity-[0.05] rounded-full blur-[100px] animate-pulse-soft"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary opacity-[0.03] rounded-full blur-[100px] animate-pulse-soft"></div>

                <div className="absolute top-[18%] right-[10%] opacity-10 animate-float">
                    <GiGoldBar size={180} className="text-white" />
                </div>
                <div className="absolute bottom-[15%] left-[8%] opacity-5 animate-spin-slow">
                    <GiDiamonds size={250} className="text-white font-thin" />
                </div>
                <div
                    className="absolute top-[45%] left-[15%] opacity-10 animate-float"
                    style={{ animationDelay: "2s" }}
                >
                    <GiStarShuriken size={80} className="text-orange-500" />
                </div>
            </div>

            <div className="container relative z-10 px-6">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <span className="inline-block bg-orange-500 text-[#301118] px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-[4px] mb-8">
                        {t.hero.badge}
                    </span>

                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-none overflow-visible py-2">
                        {t.hero.titleMain}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500">
                            {t.hero.titleAccent}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-orange-100/60 leading-relaxed font-light italic mb-12">
                        {t.hero.paragraph}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DahejHero;
