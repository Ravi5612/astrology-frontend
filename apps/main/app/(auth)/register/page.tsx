import React, { Suspense } from "react";
import SignUpForm from "@/components/features/auth/SignUpForm";
import TopExpertsSection from "@/components/features/auth/TopExpertsSection";
import { Metadata } from "next";
import authContent from "@/public/data/auth-content.json";
// dummy comment 

export const metadata: Metadata = {
  title: "Sign Up - Astrology Bharat",
  description: "Create your free account and start your cosmic journey today.",
};

export default function RegisterPage() {
  const { signUp } = authContent;

  return (
    <section className="relative py-2 md:py-4 bg-[#FFF9F4] bg-[url('/images/white-background.png')] bg-cover bg-no-repeat overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left Section: branding and info */}
          <div className="w-full lg:w-5/12 pt-8">
            <div className="mb-8">
              <h3 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                <span className="text-[#301118]">Sign Up</span>{" "}
                to <br />
                <span className="text-orange">
                  Astrology Bharat
                </span>
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {signUp.description}
              </p>
              <p className="text-gray-500 mt-4 font-medium">
                Join us and unlock personalized astrology insights.
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
