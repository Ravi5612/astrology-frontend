"use client";

import React from "react";

const StorySection: React.FC = () => {
  const milestones = [
    {
      year: "2022",
      event: "Platform founded with 20 hand-verified astrologers.",
    },
    {
      year: "2023",
      event:
        "Launched real-time chat & call consultations. Crossed 10,000 users.",
    },
    {
      year: "2024",
      event: "Added Kundli matching, gemstone shop & online puja services.",
    },
    {
      year: "2025",
      event: "Crossed 1 lakh happy users. Expanded to 500+ astrologers.",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <span
              className="text-uppercase fw-bold small"
              style={{ color: "#f97316", letterSpacing: "2px" }}
            >
              Our Story
            </span>
            <h2
              className="fw-bold mt-2 mb-4"
              style={{ fontSize: "2rem", color: "#1a0a00" }}
            >
              How It All Began
            </h2>
          </div>
        </div>
        <div className="row align-items-start g-5">
          <div className="col-lg-6">
            <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
              Astrology in Bharat was born from a simple frustration — finding a
              trustworthy astrologer in India was hard. Between fake gurus,
              overpriced pujas, and one-size-fits-all predictions, millions of
              people were left without genuine guidance.
            </p>
            <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
              Our founders, passionate about both technology and Indian
              spiritual traditions, decided to build a platform that would
              change this. A platform where every astrologer is verified, every
              consultation is personal, and every user feels heard and
              respected.
            </p>
            <p className="text-muted" style={{ lineHeight: 1.9 }}>
              Since our launch, we have helped over a lakh Indians find clarity
              on questions about marriage, career, health, finances, and more —
              through the time-tested lens of Vedic, KP, Lal Kitab, and
              Numerological astrology.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="row g-3">
              {milestones.map((item, i) => (
                <div key={i} className="col-12">
                  <div className="d-flex gap-3 align-items-start">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center fw-black flex-shrink-0"
                      style={{
                        width: 60,
                        height: 44,
                        background: "linear-gradient(135deg, #f97316, #ea580c)",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {item.year}
                    </div>
                    <div className="pt-1">
                      <p
                        className="mb-0 text-muted small"
                        style={{ lineHeight: 1.7 }}
                      >
                        {item.event}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
