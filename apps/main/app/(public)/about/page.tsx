import { Metadata } from "next";
import Link from "next/link";
import React from "react";

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

export default function AboutPage() {
  return (
    <main>
      {/* ── Hero Section ── */}
      <section
        className="position-relative overflow-hidden py-5"
        style={{
          background: "linear-gradient(135deg, #1a0a00 0%, #301118 50%, #1a0a00 100%)",
          minHeight: "420px",
        }}
      >
        {/* Decorative circles */}
        <div
          className="position-absolute rounded-circle"
          style={{
            width: 400,
            height: 400,
            background: "rgba(249,115,22,0.07)",
            top: -100,
            right: -80,
            pointerEvents: "none",
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: 250,
            height: 250,
            background: "rgba(249,115,22,0.05)",
            bottom: -60,
            left: -60,
            pointerEvents: "none",
          }}
        />

        <div className="container position-relative py-5 text-center text-white">
          <span
            className="badge px-4 py-2 rounded-pill mb-4 d-inline-block fw-semibold"
            style={{ background: "rgba(249,115,22,0.2)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.3)", fontSize: "13px" }}
          >
            <i className="fa-solid fa-om me-2" />
            India&apos;s Trusted Astrology Platform
          </span>
          <h1 className="display-4 fw-bold mb-4" style={{ letterSpacing: "-0.5px" }}>
            About{" "}
            <span style={{ color: "#fb923c" }}>Astrology in Bharat</span>
          </h1>
          <p
            className="mx-auto mb-5 text-white/80"
            style={{ maxWidth: 640, fontSize: "1.1rem", lineHeight: 1.8 }}
          >
            We bring the ancient wisdom of Indian astrology to your fingertips —
            connecting you with verified, experienced astrologers for life&apos;s
            most meaningful questions.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              href="/our-astrologers"
              className="btn px-5 py-3 fw-bold rounded-pill"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                color: "white",
                border: "none",
                boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
              }}
            >
              <i className="fa-solid fa-user-astronaut me-2" />
              Consult an Astrologer
            </Link>
            <Link
              href="/contact"
              className="btn px-5 py-3 fw-bold rounded-pill"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <i className="fa-solid fa-envelope me-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background: "#fff7f0", borderBottom: "1px solid #ffe8d6" }}>
        <div className="container py-4">
          <div className="row g-3 text-center">
            {stats.map((s, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="py-3">
                  <div
                    className="fw-black mb-1"
                    style={{ fontSize: "2rem", color: "#f97316", lineHeight: 1 }}
                  >
                    {s.value}
                  </div>
                  <div className="text-muted small fw-semibold">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Section ── */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-uppercase fw-bold small" style={{ color: "#f97316", letterSpacing: "2px" }}>
                Our Mission
              </span>
              <h2 className="fw-bold mt-2 mb-4" style={{ fontSize: "2.2rem", color: "#1a0a00" }}>
                Bridging Ancient Wisdom<br />with Modern Seekers
              </h2>
              <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
                Astrology in Bharat was founded with one simple mission — to make authentic
                Indian astrology accessible to everyone. For thousands of years, Vedic
                astrology has guided people through life&apos;s uncertainties. We&apos;re on
                a mission to bring that timeless wisdom to modern India through technology.
              </p>
              <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
                We partner only with deeply experienced, verified astrologers who uphold the
                integrity of this sacred science. Whether it&apos;s your career, marriage,
                health, or finances — our astrologers provide personalized guidance rooted in
                your unique birth chart.
              </p>
              <div className="d-flex gap-4 flex-wrap">
                {[
                  { icon: "fa-check-circle", text: "Verified Experts Only" },
                  { icon: "fa-check-circle", text: "100% Confidential" },
                  { icon: "fa-check-circle", text: "Available 24/7" },
                ].map((item, i) => (
                  <span key={i} className="d-flex align-items-center gap-2 text-muted small fw-semibold">
                    <i className={`fa-solid ${item.icon}`} style={{ color: "#f97316" }} />
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
                  style={{ width: 200, height: 200, background: "rgba(249,115,22,0.1)", top: -60, right: -60 }}
                />
                <div className="position-relative">
                  <i className="fa-solid fa-quote-left fa-2x mb-4" style={{ color: "rgba(249,115,22,0.4)" }} />
                  <p className="text-white mb-4" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                    &ldquo;The stars incline, they do not compel. True astrology empowers you
                    with awareness, not fate — helping you navigate life with wisdom and clarity.&rdquo;
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                      style={{ width: 50, height: 50, background: "rgba(249,115,22,0.3)", fontSize: "1.2rem" }}
                    >
                      🕉
                    </div>
                    <div>
                      <div className="text-white fw-bold">Astrology in Bharat</div>
                      <div className="small" style={{ color: "rgba(255,255,255,0.5)" }}>Founded on Vedic Principles</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="py-5" style={{ background: "#fafafa" }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-uppercase fw-bold small" style={{ color: "#f97316", letterSpacing: "2px" }}>
              Our Values
            </span>
            <h2 className="fw-bold mt-2" style={{ fontSize: "2rem", color: "#1a0a00" }}>
              What We Stand For
            </h2>
          </div>
          <div className="row g-4">
            {values.map((v, i) => (
              <div key={i} className="col-sm-6 col-lg-3">
                <div
                  className="rounded-4 p-4 h-100 border"
                  style={{
                    background: "white",
                    borderColor: "rgba(0,0,0,0.06) !important",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                    style={{ width: 52, height: 52, background: v.bg }}
                  >
                    <i className={`${v.icon} fa-lg`} style={{ color: v.color }} />
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: "#1a0a00" }}>{v.title}</h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="text-uppercase fw-bold small" style={{ color: "#f97316", letterSpacing: "2px" }}>
                Our Story
              </span>
              <h2 className="fw-bold mt-2 mb-4" style={{ fontSize: "2rem", color: "#1a0a00" }}>
                How It All Began
              </h2>
            </div>
          </div>
          <div className="row align-items-start g-5">
            <div className="col-lg-6">
              <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
                Astrology in Bharat was born from a simple frustration — finding a trustworthy
                astrologer in India was hard. Between fake gurus, overpriced pujas, and
                one-size-fits-all predictions, millions of people were left without genuine
                guidance.
              </p>
              <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
                Our founders, passionate about both technology and Indian spiritual traditions,
                decided to build a platform that would change this. A platform where every
                astrologer is verified, every consultation is personal, and every user feels
                heard and respected.
              </p>
              <p className="text-muted" style={{ lineHeight: 1.9 }}>
                Since our launch, we have helped over a lakh Indians find clarity on
                questions about marriage, career, health, finances, and more — through the
                time-tested lens of Vedic, KP, Lal Kitab, and Numerological astrology.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                {[
                  { year: "2022", event: "Platform founded with 20 hand-verified astrologers." },
                  { year: "2023", event: "Launched real-time chat & call consultations. Crossed 10,000 users." },
                  { year: "2024", event: "Added Kundli matching, gemstone shop & online puja services." },
                  { year: "2025", event: "Crossed 1 lakh happy users. Expanded to 500+ astrologers." },
                ].map((item, i) => (
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
                        <p className="mb-0 text-muted small" style={{ lineHeight: 1.7 }}>{item.event}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Astrologers ── */}
      <section className="py-5" style={{ background: "#fafafa" }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-uppercase fw-bold small" style={{ color: "#f97316", letterSpacing: "2px" }}>
              Meet Our Experts
            </span>
            <h2 className="fw-bold mt-2" style={{ fontSize: "2rem", color: "#1a0a00" }}>
              Trusted Astrologers
            </h2>
            <p className="text-muted mx-auto mt-2" style={{ maxWidth: 500 }}>
              Each astrologer on our platform goes through rigorous verification to ensure
              authentic and accurate guidance.
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
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="rounded-circle border"
                      style={{ width: 80, height: 80, objectFit: "cover", borderColor: "#fed7aa !important", borderWidth: "3px !important" }}
                    />
                    <div
                      className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: 22, height: 22, background: "#22c55e", border: "2px solid white" }}
                    >
                      <i className="fa-solid fa-check" style={{ color: "white", fontSize: "8px" }} />
                    </div>
                  </div>
                  <h6 className="fw-bold mb-1" style={{ color: "#1a0a00" }}>{member.name}</h6>
                  <p className="small mb-1" style={{ color: "#f97316" }}>{member.role}</p>
                  <p className="text-muted small mb-2">{member.exp}</p>
                  <span
                    className="badge rounded-pill px-3 py-1 small"
                    style={{ background: "rgba(249,115,22,0.1)", color: "#ea580c" }}
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
              View All Astrologers <i className="fa-solid fa-arrow-right ms-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Overview ── */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-uppercase fw-bold small" style={{ color: "#f97316", letterSpacing: "2px" }}>
              What We Offer
            </span>
            <h2 className="fw-bold mt-2" style={{ fontSize: "2rem", color: "#1a0a00" }}>
              Our Astrology Services
            </h2>
          </div>
          <div className="row g-3">
            {[
              { icon: "fa-comments", label: "Chat Consultation", desc: "Text-based sessions with expert astrologers" },
              { icon: "fa-phone", label: "Call Consultation", desc: "Live voice sessions for personal guidance" },
              { icon: "fa-video", label: "Video Consultation", desc: "Face-to-face sessions with top astrologers" },
              { icon: "fa-scroll", label: "Kundli Generation", desc: "Detailed personalized birth chart analysis" },
              { icon: "fa-heart", label: "Kundli Matching", desc: "Compatibility analysis for marriage" },
              { icon: "fa-ring", label: "Online Puja", desc: "Sacred rituals performed on your behalf" },
              { icon: "fa-gem", label: "Gemstone Shop", desc: "Certified gemstones for astrological remedies" },
              { icon: "fa-calculator", label: "Free Calculators", desc: "Numerology, love match & lucky numbers" },
            ].map((svc, i) => (
              <div key={i} className="col-6 col-md-3">
                <div
                  className="rounded-3 p-3 text-center border h-100"
                  style={{ background: "#fafafa" }}
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 mb-2"
                    style={{ width: 44, height: 44, background: "rgba(249,115,22,0.1)" }}
                  >
                    <i className={`fa-solid ${svc.icon}`} style={{ color: "#f97316" }} />
                  </div>
                  <h6 className="fw-bold mb-1 small" style={{ color: "#1a0a00" }}>{svc.label}</h6>
                  <p className="text-muted mb-0" style={{ fontSize: "11px", lineHeight: 1.5 }}>{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="py-5 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #1a0a00 0%, #301118 50%, #1a0a00 100%)",
        }}
      >
        <div className="container py-4">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
            style={{ width: 72, height: 72, background: "rgba(249,115,22,0.15)", fontSize: "2rem" }}
          >
            🌟
          </div>
          <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
            Start Your Cosmic Journey Today
          </h2>
          <p className="mb-4 mx-auto" style={{ maxWidth: 500, color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
            Connect with a verified astrologer right now and get personalized guidance
            for life&apos;s most important questions.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              href="/our-astrologers"
              className="btn px-5 py-3 fw-bold rounded-pill"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                color: "white",
                border: "none",
                boxShadow: "0 8px 24px rgba(249,115,22,0.4)",
              }}
            >
              <i className="fa-solid fa-star me-2" />
              Talk to an Astrologer
            </Link>
            <Link
              href="/calculator"
              className="btn px-5 py-3 fw-bold rounded-pill"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <i className="fa-solid fa-calculator me-2" />
              Free Calculators
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
