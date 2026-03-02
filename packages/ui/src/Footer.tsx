"use client";
import React from "react";
import Link from "next/link";
import { PATHS, URLS } from "@repo/routes";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-[#1d1212] pt-[70px] pb-[30px] border-t border-[#d1ab8b1c]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 text-center md:text-left items-start">

            {/* Logo & About Section */}
            <div className="lg:col-span-4 flex flex-col items-center md:items-start">
              <img
                src="/images/web-logo-white.png"
                alt="Astrology in Bharat Logo"
                className="mb-4 w-full max-w-[260px] object-contain"
              />
              <p className="text-[14px] leading-[1.7] text-[#dfdfdf] mb-6">
                Astrology in Bharat is India’s trusted astrology platform
                offering accurate guidance through verified astrologers using
                authentic Indian astrology systems.
              </p>

              <ul className="flex items-center gap-3">
                {[
                  { icon: "fa-facebook", href: "#" },
                  { icon: "fa-instagram", href: "#" },
                  { icon: "fa-youtube", href: "#" },
                  { icon: "fa-linkedin-in", href: "#" },
                  { icon: "fa-pinterest", href: "#" },
                ].map((social, idx) => (
                  <li key={idx}>
                    <a
                      href={social.href}
                      className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-white border-2 border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00] hover:text-white transition-all duration-300"
                    >
                      <i className={`fa-brands ${social.icon} text-sm`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links columns wrapper */}
            <div className="lg:col-span-8 flex flex-wrap justify-between gap-10 md:gap-8">
              {/* Free Calculator */}
              <div className="flex-1 min-w-[160px]">
                <h4 className="text-[18px] font-semibold text-[#ff6b00] mb-[15px] whitespace-nowrap">Free Calculator</h4>
                <ul className="flex flex-col gap-2.5">
                  {[
                    { label: "Marriage Age", href: PATHS.MARRIAGE_AGE_CALCULATOR },
                    { label: "Dahej Calculator", href: PATHS.DAHEJ_CALCULATOR },
                    { label: "Love Compatibility", href: PATHS.LOVE_COMPATIBILITY_CALCULATOR },
                    { label: "Lucky Number", href: PATHS.LUCKY_NUMBER_CALCULATOR },
                    { label: "Life Path", href: PATHS.LIFE_PATH_CALCULATOR },
                    { label: "Nakshatra Finder", href: PATHS.NAKSHATRA_FINDER },
                  ].map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Astrology Services */}
              <div className="flex-1 min-w-[160px]">
                <h4 className="text-[18px] font-semibold text-[#ff6b00] mb-[15px] whitespace-nowrap">Astrology Services</h4>
                <ul className="flex flex-col gap-2.5">
                  <li><Link href={PATHS.ONLINE_PUJA} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Online Puja</Link></li>
                  <li><a href="/our-astrologers" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Talk to Astrologer</a></li>
                  <li><a href="#" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Video Consultation</a></li>
                  <li><Link href={PATHS.KUNDALI_MATCHING} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Kundli Matching</Link></li>
                  <li><Link href={PATHS.KUNDALI_MATCHING} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Kundli Prediction</Link></li>
                  <li><a href="/calculator/name-numerology" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Numerology Report</a></li>
                </ul>
              </div>

              {/* Important Links */}
              <div className="flex-1 min-w-[160px]">
                <h4 className="text-[18px] font-semibold text-[#ff6b00] mb-[15px] whitespace-nowrap">Important Links</h4>
                <ul className="flex flex-col gap-2.5">
                  <li><a href="#" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Astrologer Login</a></li>
                  <li><a href="#" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Astrologer Registration</a></li>
                  <li><a href="#" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Shubh Muhurat 2026</a></li>
                  <li><Link href={PATHS.BUY_PRODUCTS} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Shop Our Products</Link></li>
                  <li><a href="#" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">About Us</a></li>
                  <li><a href="#" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Contact Us</a></li>
                </ul>
              </div>

              {/* Helpful Info */}
              <div className="flex-1 min-w-[160px]">
                <h4 className="text-[18px] font-semibold text-[#ff6b00] mb-[15px] whitespace-nowrap">Helpful Info</h4>
                <ul className="flex flex-col gap-2.5">
                  <li><Link href={PATHS.REFUND_POLICY} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Refund Policy</Link></li>
                  <li><Link href={PATHS.PRIVACY_POLICY} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Privacy Policy</Link></li>
                  <li><Link href={PATHS.TERMS_AND_CONDITIONS} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Terms & Conditions</Link></li>
                  <li><Link href={PATHS.COPYRIGHT} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Copyright Notice</Link></li>
                  <li><Link href={PATHS.HELP} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Help & Support</Link></li>
                  <li><Link href={PATHS.SESSION_HISTORY} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline">Seassion</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-[40px] pt-[25px] border-t border-white/10 text-center">
            <p className="text-[13px] text-[#aaa] font-medium m-0">
              © 2026 Astrology in Bharat (Powered by Astrology in Bharat
              Services). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;



