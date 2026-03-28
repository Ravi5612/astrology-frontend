"use client";
import React from "react";
import Link from "next/link";
import { PATHS, URLS } from "@repo/routes";
import { useLanguageStore } from "../../../apps/main/store/languageStore";
import { footerTranslations } from "../../../apps/main/lib/translations/footer";

const Footer: React.FC = () => {
  const { lang } = useLanguageStore();
  const t = footerTranslations[lang as keyof typeof footerTranslations] || footerTranslations.en;

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
                {t.aboutText}
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
                <h4 className="text-[18px] font-semibold text-[#ff6b00] mb-[15px] whitespace-nowrap">{t.freeCalculator}</h4>
                <ul className="flex flex-col gap-2.5 pl-0">
                  {[
                    { label: t.marriageAge, href: PATHS.MARRIAGE_AGE_CALCULATOR },
                    { label: t.dahejCalculator, href: PATHS.DAHEJ_CALCULATOR },
                    { label: t.loveCompatibility, href: PATHS.LOVE_COMPATIBILITY_CALCULATOR },
                    { label: t.luckyNumber, href: PATHS.LUCKY_NUMBER_CALCULATOR },
                    { label: t.lifePath, href: PATHS.LIFE_PATH_CALCULATOR },
                    { label: t.nakshatraFinder, href: PATHS.NAKSHATRA_FINDER },
                  ].map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group">
                        <i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Astrology Services */}
              <div className="flex-1 min-w-[160px]">
                <h4 className="text-[18px] font-semibold text-[#ff6b00] mb-[15px] whitespace-nowrap">{t.astrologyServices}</h4>
                <ul className="flex flex-col gap-2.5 pl-0">
                  <li><Link href={PATHS.ONLINE_PUJA} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.onlinePuja}</Link></li>
                  <li><a href="/our-astrologers" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.talkToAstrologer}</a></li>
                  <li><a href="#" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.videoConsultation}</a></li>
                  <li><Link href={PATHS.KUNDALI_MATCHING} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.kundliMatching}</Link></li>
                  <li><Link href={PATHS.KUNDALI_MATCHING} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.kundliPrediction}</Link></li>
                  <li><a href="/calculator/name-numerology" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.numerologyReport}</a></li>
                </ul>
              </div>

              {/* Important Links */}
              <div className="flex-1 min-w-[160px]">
                <h4 className="text-[18px] font-semibold text-[#ff6b00] mb-[15px] whitespace-nowrap">{t.importantLinks}</h4>
                <ul className="flex flex-col gap-2.5 pl-0">
                  <li><a href="#" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.astrologerLogin}</a></li>
                  <li><a href="#" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.astrologerRegistration}</a></li>
                  <li><a href="#" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.shubhMuhurat}</a></li>
                  <li><Link href={PATHS.BUY_PRODUCTS} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.shopProducts}</Link></li>
                  <li><Link href="/about" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.aboutUs}</Link></li>
                  <li><Link href="/contact" className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.contactUs}</Link></li>
                </ul>
              </div>

              {/* Helpful Info */}
              <div className="flex-1 min-w-[160px]">
                <h4 className="text-[18px] font-semibold text-[#ff6b00] mb-[15px] whitespace-nowrap">{t.helpfulInfo}</h4>
                <ul className="flex flex-col gap-2.5 pl-0">
                  <li><Link href={PATHS.REFUND_POLICY} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.refundPolicy}</Link></li>
                  <li><Link href={PATHS.PRIVACY_POLICY} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.privacyPolicy}</Link></li>
                  <li><Link href={PATHS.TERMS_AND_CONDITIONS} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.termsConditions}</Link></li>
                  <li><Link href={PATHS.COPYRIGHT} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.copyrightNotice}</Link></li>
                  <li><Link href={PATHS.HELP} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.helpSupport}</Link></li>
                  <li><Link href={PATHS.SESSION_HISTORY} className="text-[14px] text-[#f3f3f3] hover:text-[#ff6b00] transition-colors no-underline flex items-center gap-2 group"><i className="fa-solid fa-angle-right text-[#ff6b00] text-[10px] transform group-hover:translate-x-1 transition-transform" />{t.sessionHistory}</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-[40px] pt-[25px] border-t border-white/10 text-center">
            <p className="text-[13px] text-[#aaa] font-medium m-0">
              {t.copyright}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;



