import React from "react";
import { useLanguageStore } from "@/store/languageStore";
import { profileTranslations } from "@/lib/translations/profile";

interface SupportTabProps {
    supportSettings: {
        email?: string;
        whatsapp?: string;
        phone?: string;
    };
}

const SupportTab: React.FC<SupportTabProps> = ({ supportSettings }) => {
    const { lang } = useLanguageStore();
    const t = (profileTranslations[lang as keyof typeof profileTranslations] || profileTranslations.en).support;
    const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

    return (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-0 pt-4 px-4 mb-3">
                <h5 className="fw-bold mb-0" style={fontStyle}>
                    <span className="me-2 p-2 rounded-circle" style={{ backgroundColor: "#e3f2fd", color: "#1976d2" }}>
                        <i className="fa-solid fa-headset"></i>
                    </span>
                    {t.title}
                </h5>
                <p className="text-muted small mb-0 mt-2" style={fontStyle}>{t.subtitle}</p>
            </div>
            <div className="card-body p-4">
                {/* Quick Contact Cards */}
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <div className="card border-0 bg-light h-100 hover:shadow-md transition-all">
                            <div className="card-body text-center p-4">
                                <div className="mb-3">
                                    <i className="fa-solid fa-envelope fa-2x" style={{ color: "var(--primary)" }}></i>
                                </div>
                                <h6 className="fw-bold mb-2" style={fontStyle}>{t.emailSupport}</h6>
                                <p className="text-primary small mb-3 fw-bold">{supportSettings.email || 'support@astrologyinbharat.com'}</p>
                                <a href={`mailto:${supportSettings.email || 'support@astrologyinbharat.com'}`} className="btn btn-sm btn-outline-primary rounded-pill" style={fontStyle}>
                                    <i className="fa-solid fa-paper-plane me-2"></i>
                                    {t.sendEmail}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 bg-light h-100 hover:shadow-md transition-all">
                            <div className="card-body text-center p-4">
                                <div className="mb-3">
                                    <i className="fa-brands fa-whatsapp fa-2x" style={{ color: "#25D366" }}></i>
                                </div>
                                <h6 className="fw-bold mb-2" style={fontStyle}>{t.whatsapp}</h6>
                                <p className="text-success small mb-3 fw-bold">{supportSettings.whatsapp || '+91 9876543210'}</p>
                                <a href={`https://wa.me/${(supportSettings.whatsapp || '+919876543210').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-success rounded-pill" style={fontStyle}>
                                    <i className="fa-brands fa-whatsapp me-2"></i>
                                    {t.chatNow}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 bg-light h-100 hover:shadow-md transition-all">
                            <div className="card-body text-center p-4">
                                <div className="mb-3">
                                    <i className="fa-solid fa-phone fa-2x" style={{ color: "var(--primary)" }}></i>
                                </div>
                                <h6 className="fw-bold mb-2" style={fontStyle}>{t.phoneSupport}</h6>
                                <p className="text-primary small mb-3 fw-bold">{supportSettings.phone || '+91 9876543210'}</p>
                                <a href={`tel:${supportSettings.phone || '+919876543210'}`} className="btn btn-sm btn-outline-primary rounded-pill" style={fontStyle}>
                                    <i className="fa-solid fa-phone me-2"></i>
                                    {t.callNow}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Additional Resources */}
                <div className="mt-5 p-4 rounded-3" style={{ backgroundColor: "rgba(242, 94, 10, 0.05)" }}>
                    <h6 className="fw-bold mb-3" style={fontStyle}>
                        <i className="fa-solid fa-lightbulb me-2" style={{ color: "var(--primary)" }}></i>
                        {t.additionalResources}
                    </h6>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-2">
                            <i className="fa-solid fa-circle-check me-2 text-success"></i>
                            <a href="/terms" className="text-decoration-none" style={fontStyle}>{t.terms}</a>
                        </li>
                        <li className="mb-2">
                            <i className="fa-solid fa-circle-check me-2 text-success"></i>
                            <a href="/privacy" className="text-decoration-none" style={fontStyle}>{t.privacy}</a>
                        </li>
                        <li className="mb-2">
                            <i className="fa-solid fa-circle-check me-2 text-success"></i>
                            <a href="/refund-policy" className="text-decoration-none" style={fontStyle}>{t.refund}</a>
                        </li>
                        <li className="mb-0">
                            <i className="fa-solid fa-circle-check me-2 text-success"></i>
                            <a href="/about" className="text-decoration-none" style={fontStyle}>{t.about}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SupportTab;


