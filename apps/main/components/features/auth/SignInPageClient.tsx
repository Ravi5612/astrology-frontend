"use client";

import React, { Suspense } from "react";
import SignInForm from "./SignInForm.component";
import TopExpertsSection from "./TopExpertsSection";
import authContent from "@/public/data/auth-content.json";
import { useLanguageStore } from "@/store/languageStore";
import { authTranslations } from "@/lib/translations/auth";

export default function SignInPageClient() {
    const { lang } = useLanguageStore();
    const t = authTranslations[lang as keyof typeof authTranslations] || authTranslations.en;
    const { signIn } = authContent;

    return (
        <section className="relative py-2 md:py-4 bg-[#FFF9F4] bg-[url('/images/white-background.png')] bg-cover bg-no-repeat overflow-hidden">
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Left Side: Branding and Astrology Info */}
                    <div className="w-full lg:w-5/12 pt-8">
                        <div className="mb-8">
                            <h3
                                className="text-3xl md:text-5xl font-extrabold leading-tight mb-4"
                                style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                <span className="text-[#301118]">{t.signIn.brandTitle}</span>{" "}
                                {t.signIn.brandTo}
                                <br />
                                <span className="text-orange">
                                    {t.signIn.brandName}
                                </span>
                            </h3>
                            <p
                                className="text-gray-600 text-base md:text-lg leading-relaxed"
                                style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                {signIn.description1}
                                <br />
                                {signIn.description2}
                            </p>
                        </div>

                        {/* Top Experts Section */}
                        <TopExpertsSection />
                    </div>

                    {/* Right Side: Sign In Form */}
                    <div className="w-full lg:w-7/12">
                        <Suspense fallback={<div className="flex items-center justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div></div>}>
                            <SignInForm />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    );
}
