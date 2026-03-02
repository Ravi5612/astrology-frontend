import React from "react";

export interface JewelrySet {
    name: string;
    items: string[];
    icon: React.ReactNode;
}

export interface ResultData {
    dahej: number;
    formattedDahej: string;
    age: number;
    jobTier: number;
    itemTier: string;
    breakdown: {
        name: number;
        job: number;
        age: number;
        salary: number;
    };
    includedItems: {
        car: string;
        jewelry: JewelrySet;
        land: string;
    };
    message: string;
}

export interface ProgressBarProps {
    label: string;
    value: number;
    max?: number;
}

export interface IncludedItemCardProps {
    icon: React.ReactNode;
    title: string;
    items: string[];
    description?: string;
}

// Breakup Patchup Calculator
export interface BreakupPatchupResult {
    patchup: number;
    breakup: number;
    advice: string;
}

// Life Path Calculator
export type LifePathNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;

export interface LifePathResult {
    lifePath: LifePathNumber;
    title: string;
    message: string;
}

// Love Compatibility Calculator
export interface LoveCompatibilityResult {
    love: number;
    trust: number;
    romance: number;
    communication: number;
    message: string;
}

export interface CalculatorProgressBarProps {
    label: string;
    value: number;
}
