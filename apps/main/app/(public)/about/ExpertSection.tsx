"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import { aboutTranslations } from "@/lib/translations/about";

const ExpertSection: React.FC = () => {
  const { lang } = useLanguageStore();
  const t = aboutTranslations[lang as keyof typeof aboutTranslations] || aboutTranslations.en;

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

  return (
    <section className="py-5" style={{ background: "#fafafa" }}>
      <div className="container py-4">
        <div className="text-center mb-5">
          <span
            className="text-uppercase fw-bold small"
            style={{ color: "#f97316", letterSpacing: "2px" }}
          >
            {t.expertTag}
          </span>
          <h2
            className="fw-bold mt-2"
            style={{ fontSize: "2rem", color: "#1a0a00" }}
          >
            {t.expertTitle}
          </h2>
          <p className="text-muted mx-auto mt-2" style={{ maxWidth: 500 }}>
            {t.expertDesc}
          </p>
        </div>
        <div className="row g-4 justify-content-center">
          {team.map((member, i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <div
                className="rounded-4 p-4 text-center bg-white border h-100"
                style={{ borderColor: "rgba(0,0,0,0.06) !important" }}
              >
                <div className="position-relative d-inline-block mb-3">
                  <div className="rounded-circle border overflow-hidden position-relative" style={{ width: 80, height: 80, borderColor: "#fed7aa", borderWidth: "3px" }}>
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div
                    className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: 22,
                      height: 22,
                      background: "#22c55e",
                      border: "2px solid white",
                    }}
                  >
                    <i
                      className="fa-solid fa-check"
                      style={{ color: "white", fontSize: "8px" }}
                    />
                  </div>
                </div>
                <h6 className="fw-bold mb-1" style={{ color: "#1a0a00" }}>
                  {member.name}
                </h6>
                <p className="small mb-1" style={{ color: "#f97316" }}>
                  {member.role}
                </p>
                <p className="text-muted small mb-2">{member.exp}</p>
                <span
                  className="badge rounded-pill px-3 py-1 small"
                  style={{
                    background: "rgba(249,115,22,0.1)",
                    color: "#ea580c",
                  }}
                >
                  {member.specialty}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link
            href="/our-astrologers"
            className="btn px-5 py-2 rounded-pill fw-bold"
            style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "white",
              border: "none",
            }}
          >
            {t.expertBtn} <i className="fa-solid fa-arrow-right ms-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;
