import { Metadata } from "next";
import React from "react";
import HeroSection from "./HeroSection";
import StatsBar from "./StatsBar";
import MissionSection from "./MissionSection";
import ValuesSection from "./ValuesSection";
import StorySection from "./StorySection";
import AstrologerListWrapper from "@/components/features/astrologers/AstrologerListWrapper";
import ServicesSection from "./ServicesSection";
import CTABanner from "./CTABanner";

export const metadata: Metadata = {
  title: "About Us | Astrology in Bharat",
  description:
    "Learn about Astrology in Bharat — India's trusted astrology platform offering accurate guidance through verified astrologers using authentic Indian astrology systems.",
};

export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <MissionSection />
      <ValuesSection />
      <StorySection />
      <AstrologerListWrapper searchParams={{}} layout="slider" title="Trusted Astrologers" />
      <ServicesSection />
      <CTABanner />
    </main>
  );
}
