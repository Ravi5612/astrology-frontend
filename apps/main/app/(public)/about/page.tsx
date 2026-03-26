import { Metadata } from "next";
import React from "react";
import HeroSection from "./HeroSection";
import StatsBar from "./StatsBar";
import MissionSection from "./MissionSection";
import ValuesSection from "./ValuesSection";
import StorySection from "./StorySection";
import ExpertSection from "./ExpertSection";
import ServicesSection from "./ServicesSection";
import CTABanner from "./CTABanner";

export const metadata: Metadata = {
  title: "About Us | Astrology in Bharat",
  description:
    "Learn about Astrology in Bharat — India's trusted astrology platform offering accurate guidance through verified astrologers using authentic Indian astrology systems.",
};

const stats = [
  { value: "1,00,000+", label: "Happy Users" },
  { value: "500+", label: "Verified Astrologers" },
  { value: "10+", label: "Astrology Services" },
  { value: "4.8★", label: "Average Rating" },
];

const values = [
  {
    icon: "fa-solid fa-shield-halved",
    title: "Trust & Authenticity",
    desc: "Every astrologer on our platform is verified and follows authentic Indian astrology traditions — Vedic, KP, Lal Kitab, and more.",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
  },
  {
    icon: "fa-solid fa-user-shield",
    title: "Privacy First",
    desc: "Your personal data and consultations are 100% confidential. We never share your birth details or session data with anyone.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
  },
  {
    icon: "fa-solid fa-star",
    title: "Quality Guidance",
    desc: "We handpick astrologers based on experience, accuracy, and user feedback — ensuring you always receive the best guidance.",
    color: "#eab308",
    bg: "rgba(234,179,8,0.08)",
  },
  {
    icon: "fa-solid fa-hand-holding-heart",
    title: "Accessible to All",
    desc: "Whether you're in a metro city or a small town, our platform is available 24/7 in Hindi and English so guidance is never out of reach.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
  },
];

const team = [
  {
    name: "Pandit Rajesh Sharma",
    role: "Head of Vedic Astrology",
    exp: "22 Years Experience",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    specialty: "Kundli, Marriage, Career",
  },
  {
    name: "Jyotishi Sunita Devi",
    role: "Numerology & Tarot Expert",
    exp: "15 Years Experience",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    specialty: "Tarot, Numerology, Vastu",
  },
  {
    name: "Acharya Vinod Kumar",
    role: "KP & Lal Kitab Specialist",
    exp: "18 Years Experience",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    specialty: "KP System, Lal Kitab",
  },
  {
    name: "Pandit Meera Joshi",
    role: "Nakshatra & Gemstone Expert",
    exp: "12 Years Experience",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    specialty: "Gemstones, Nakshatra, Puja",
  },
];

const services = [
  {
    icon: "fa-comments",
    label: "Chat Consultation",
    desc: "Text-based sessions with expert astrologers",
  },
  {
    icon: "fa-phone",
    label: "Call Consultation",
    desc: "Live voice sessions for personal guidance",
  },
  {
    icon: "fa-video",
    label: "Video Consultation",
    desc: "Face-to-face sessions with top astrologers",
  },
  {
    icon: "fa-scroll",
    label: "Kundli Generation",
    desc: "Detailed personalized birth chart analysis",
  },
  {
    icon: "fa-heart",
    label: "Kundli Matching",
    desc: "Compatibility analysis for marriage",
  },
  {
    icon: "fa-ring",
    label: "Online Puja",
    desc: "Sacred rituals performed on your behalf",
  },
  {
    icon: "fa-gem",
    label: "Gemstone Shop",
    desc: "Certified gemstones for astrological remedies",
  },
  {
    icon: "fa-calculator",
    label: "Free Calculators",
    desc: "Numerology, love match & lucky numbers",
  },
];

export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar stats={stats} />
      <MissionSection />
      <ValuesSection values={values} />
      <StorySection />
      <ExpertSection team={team} />
      <ServicesSection services={services} />
      <CTABanner />
    </main>
  );
}
