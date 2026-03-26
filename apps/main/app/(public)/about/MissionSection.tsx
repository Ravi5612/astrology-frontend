"use client";

import React from "react";

const MissionSection: React.FC = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span
              className="text-uppercase fw-bold small"
              style={{ color: "#f97316", letterSpacing: "2px" }}
            >
              Our Mission
            </span>
            <h2
              className="fw-bold mt-2 mb-4"
              style={{ fontSize: "2.2rem", color: "#1a0a00" }}
            >
              Bridging Ancient Wisdom
              <br />
              with Modern Seekers
            </h2>
            <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
              Astrology in Bharat was founded with one simple mission — to make
              authentic Indian astrology accessible to everyone. For thousands
              of years, Vedic astrology has guided people through life&apos;s
              uncertainties. We&apos;re on a mission to bring that timeless
              wisdom to modern India through technology.
            </p>
            <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
              We partner only with deeply experienced, verified astrologers who
              uphold the integrity of this sacred science. Whether it&apos;s
              your career, marriage, health, or finances — our astrologers
              provide personalized guidance rooted in your unique birth chart.
            </p>
            <div className="d-flex gap-4 flex-wrap">
              {[
                { icon: "fa-check-circle", text: "Verified Experts Only" },
                { icon: "fa-check-circle", text: "100% Confidential" },
                { icon: "fa-check-circle", text: "Available 24/7" },
              ].map((item, i) => (
                <span
                  key={i}
                  className="d-flex align-items-center gap-2 text-muted small fw-semibold"
                >
                  <i
                    className={`fa-solid ${item.icon}`}
                    style={{ color: "#f97316" }}
                  />
                  {item.text}
                </span>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="rounded-4 p-4 p-md-5 h-100"
              style={{
                background: "linear-gradient(135deg, #1a0a00 0%, #301118 100%)",
                minHeight: "340px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="position-absolute rounded-circle"
                style={{
                  width: 200,
                  height: 200,
                  background: "rgba(249,115,22,0.1)",
                  top: -60,
                  right: -60,
                }}
              />
              <div className="position-relative">
                <i
                  className="fa-solid fa-quote-left fa-2x mb-4"
                  style={{ color: "rgba(249,115,22,0.4)" }}
                />
                <p
                  className="text-white mb-4"
                  style={{ fontSize: "1.1rem", lineHeight: 1.8 }}
                >
                  &ldquo;The stars incline, they do not compel. True astrology
                  empowers you with awareness, not fate — helping you navigate
                  life with wisdom and clarity.&rdquo;
                </p>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                    style={{
                      width: 50,
                      height: 50,
                      background: "rgba(249,115,22,0.3)",
                      fontSize: "1.2rem",
                    }}
                  >
                    🕉
                  </div>
                  <div>
                    <div className="text-white fw-bold">Astrology in Bharat</div>
                    <div
                      className="small"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Founded on Vedic Principles
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
