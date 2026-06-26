"use client";

import React from "react";
import { GiGoldBar, GiDiamonds, GiStarShuriken } from "react-icons/gi";
import { DahejHeroProps } from "@/lib/types";

import CalculatorHero from "@/components/calculators-charts/common/hero";

const DahejHero: React.FC<DahejHeroProps> = ({ lang, toggleLang, t }) => {
    return (
        <CalculatorHero
            badgeText={t.hero.badge || "DAHEJ"}
            titleMain={t.hero.titleMain}
            titleAccent={t.hero.titleAccent}
            paragraph={t.hero.paragraph}
        />
    );
};

export default DahejHero;
