"use client";

import React, { Suspense } from "react";
import SignUpForm from "./SignUpForm.component";
import TopExpertsSection from "./TopExpertsSection";
import authContent from "@/data/auth-content.json";
import { useLanguageStore } from "@repo/store";
import { authTranslations } from "@/lib/translations/auth";

export default function RegisterPageClient() {
    const { lang } = useLanguageStore();
    const t = authTranslations[lang as keyof typeof authTranslations] || authTranslations.en;
    const { signUp } = authContent;

    return (
        <section className="relative py-2 md:py-4 bg-[#FFF9F4] bg-[url('/images/white-background.png')] bg-cover bg-no-repeat overflow-hidden">
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row gap-12 items-start">

                    {/* Left Section: branding and info */}
                    <div className="w-full lg:w-5/12 pt-8">
                        <div className="mb-8">
                            <h3
                                className="text-[28px] md:text-5xl font-extrabold leading-tight mb-4"
                                style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                <span className="text-[#301118]">{t.signUp.title}</span>{" "}
                                {t.signIn.brandTo} <br />
                                <span className="text-orange">
                                    {t.signIn.brandName}
                                </span>
                            </h3>
                            <p
                                className="text-gray-600 text-base md:text-lg leading-relaxed"
                                style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                {signUp.description}
                            </p>
                            <p
                                className="text-gray-500 mt-4 font-medium"
                                style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                {t.signUp.subtitle}
                            </p>
                        </div>

                        {/* Top Experts */}
                        <TopExpertsSection />
                    </div>

                    {/* Right Section: Form */}
                    <div className="w-full lg:w-7/12">
                        <Suspense fallback={<div className="flex items-center justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div></div>}>
                            <SignUpForm />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    );
}
